var Awesome = {};
Awesome.Constants = {
    format      :  {
        newLine         : "\n",
        blockBegin      : "BEGIN:",
        blockEnd        : "END:",
        separatorProp   : ":",
        separatorParam  : ";",
        separatorValue  : "=",
        whitespace      : " "
    },
    regex       : {
        blockBegin      : /^BEGIN:/i,
        blockEnd        : /^END:/i,
        separator       : /.+:.+/i
    }
};
Awesome.Util = {
    trim: function(text) {
        var trimmedBeginning = Awesome.Util.removePattern(text, /^\s+/g);
        return Awesome.Util.removePattern(trimmedBeginning, /\s+$/g);
    },
    removePattern: function(text, regexp) {
        return text.replace(regexp, "");
    },
    mapToString: function(entry) {
        return entry.toString();
    },
    mapToJSON: function(entry) {
        return entry.toJSON();
    },
    setError: function(object, message) {
        object.error = message;
    },
    mergeElements: function(array, conditionOkCallback) {
        for (var i = 0; i < array.length;) {

            var element = array[i];
            var elementNext = array[i + 1];

            if (i == array.length - 1 || (conditionOkCallback && conditionOkCallback(element, elementNext))) {
                i++;
                continue;
            }

            array.splice(i, 2, [ element, elementNext ].join(""));
        }

        return array.filter(function(entry) { return entry; });
    },
    splitSafe: function(text, separator) {
        return Awesome.Util.mergeElements(text.split(separator),
            function(phrase) {
                var matchQuotationMarks = phrase.match(/"/g);
                return !matchQuotationMarks || (matchQuotationMarks.length % 2 === 0);
            });
    },
    splitSafeLines: function(text) {
        return Awesome.Util.mergeElements(text.split(Awesome.Constants.format.newLine),
            function(line, nextLine) {
                return nextLine[0] !== " ";
            });
    }
};
Awesome.Calendar = function() {
    var self = this;
    var root = new Awesome.Block();
    self.loadFromText = function(content) {
        root.loadFromText(content);
        return self;
    };
    self.toString = function() {
        return root && root.toString() || "";
    };
    self.toJSON = function() {
        return root.toJSON() || {};
    };
};
Awesome.Block = function() {
    var self        = this;
    self.children   = [];
    self.prop       = [];
    var processBlockContent = function(lines) {
        if (lines.length === 0) {
            Awesome.Util.setError(self, "Cannot load Awesome.Block, it should end with /^END:/i statement.");
            return 0;
        }
        var processedIndex = -1;
        var blockEnded = false;

        lines.forEach(function(line, index) {
            line = Awesome.Util.trim(line);
            if (blockEnded || processedIndex > index) { return; }
            if (Awesome.Constants.regex.blockBegin.test(line)) {
                var block = new Awesome.Block();
                var blockContent = lines.slice(index).join(Awesome.Constants.format.newLine);
                processedIndex = block.loadFromText(blockContent) + index;
                self.children.push(block);
                return;
            }

            if (processedIndex < index) { processedIndex = index; }
            if (Awesome.Constants.regex.blockEnd.test(line)) {
                var type = Awesome.Util.removePattern(line, Awesome.Constants.regex.blockEnd);
                blockEnded = true;

                if (type !== self.type) {
                    Awesome.Util.setError(self, "Type of Awesome.Block BEGIN does not match END. Expected: " + self.type + " Actual: " + type);
                }

                return;
            }

            self.prop.push(new Awesome.Property().loadFromText(line));
        });

        return processedIndex + 1;
    };

    self.loadFromText = function(content) {
        var lines = Awesome.Util.splitSafeLines(content);
        var firstLine = Awesome.Util.trim(lines[0] || "");

        if (!Awesome.Constants.regex.blockBegin.test(firstLine)) {
            Awesome.Util.setError(self, "Cannot load Awesome.Block, last line should start with /^BEGIN:/i in first line.");
            return 0;
        }

        self.type = Awesome.Util.removePattern(firstLine, Awesome.Constants.regex.blockBegin);

        var linesToProcess = lines.slice(1);
        return processBlockContent(linesToProcess) + 1;
    };
    self.toString = function() {
        if (self.error) { return self.error; }

        var prop = "";

        if (self.prop.length) {
            prop = self.prop.map(Awesome.Util.mapToString).join(Awesome.Constants.format.newLine) + Awesome.Constants.format.newLine;
        }

        var children = "";

        if (self.children.length) {
            children = self.children.map(Awesome.Util.mapToString).join(Awesome.Constants.format.newLine) + Awesome.Constants.format.newLine;
        }

        return Awesome.Constants.format.blockBegin + self.type + Awesome.Constants.format.newLine +
            prop + children + Awesome.Constants.format.blockEnd + self.type;
    };
    self.toJSON = function() {
        if (self.error) { return { error: self.error }; }

        return {
            type    : self.type,
            prop    : self.prop.map(Awesome.Util.mapToJSON),
            children: self.children.map(Awesome.Util.mapToJSON)
        };
    };
};
Awesome.Property = function() {
    var self = this;
    self.name = null;
    self.value = null;
    self.params = [];
    self.valueType = null;  // TODO: 3.3 Property Value Type
    self.loadFromText = function(content) {
        self.name   = Awesome.Util.splitSafe(content, Awesome.Constants.format.separatorProp)[0];
        var value = Awesome.Util.trim(content.slice(self.name.length + 1));

        if (self.name.indexOf(Awesome.Constants.format.separatorParam) !== -1) {
            var params = Awesome.Util.splitSafe(self.name, Awesome.Constants.format.separatorParam);
            self.name = params[0];
            self.params = params.slice(1).map(function(param) { return new Awesome.PropertyParameter().loadFromText(param); });
        }

        var mapping =  Awesome.Property.ValueType.Mappings.get(self.name, self.params);
        self.value = new mapping().loadFromText(value);

        return self;
    };
    self.toString = function() {
        var name = self.name;

        if (self.params.length) {
            var parameters = self.params.map(Awesome.Util.mapToString).join(Awesome.Constants.format.separatorParam);
            name = [ name, parameters ].join(Awesome.Constants.format.separatorParam);
        }

        return name + Awesome.Constants.format.separatorProp + self.value;
    };
    self.toJSON = function() {
        return {
            name    : self.name,
            value   : self.value,
            params  : self.params.map(Awesome.Util.mapToJSON)
        };
    };
};

Awesome.PropertyParameter = function() {
    var self = this;
    self.name = null;
    self.value = null;
    self.loadFromText = function(content) {
        self.name   = Awesome.Util.splitSafe(content, Awesome.Constants.format.separatorValue)[0];
        self.value = Awesome.Util.trim(content.slice(self.name.length + 1));

        return self;
    };
    self.toString = function() {
        return self.name + Awesome.Constants.format.separatorValue + self.value;
    };
    self.toJSON = function() {
        return {
            name    : self.name,
            value   : self.value
        };
    };
};
Awesome.Property.Params = [
    "ALTREP",
    "CN",
    "CUTYPE",
    "DELEGATED-FROM",
    "DELEGATED-TO",
    "DIR",
    "ENCODING",
    "FMTTYPE",
    "FBTYPE",
    "LANGUAGE",
    "MEMBER",
    "PARTSTAT",
    "RANGE",
    "RELATED",
    "RELTYPE",
    "ROLE",
    "RSVP",
    "SENT-BY",
    "TZID",
    "VALUE"
];
Awesome.Property.ValueType = {};
Awesome.Property.ValueType.Binary = function() {
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.Boolean = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.CalendarUserAddress = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.Date = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.DateTime = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.Duration = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.Float = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.Geo = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
}; // TWO floats separated by ,

Awesome.Property.ValueType.Integer = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.PeriodOfTime = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.RecurrenceRule = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.Text = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
}; // 75 characters per line.

Awesome.Property.ValueType.Time = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.URI = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.UTCOffset = function() { 
    var self = this;
    self.value = null;

    self.loadFromText = function(content) { 
        self.value = content;
        return self;
    };
    self.toString = function() {
        return self.value;
    };
    self.toJSON = function() {
        return self.value;
    };
};

Awesome.Property.ValueType.Mappings = {
    "CALSCALE"          : Awesome.Property.ValueType.Text,
    "METHOD"            : Awesome.Property.ValueType.Text,
    "PRODID"            : Awesome.Property.ValueType.Text,
    "VERSION"           : Awesome.Property.ValueType.Text,
    "ATTACH"            : [ Awesome.Property.ValueType.URI, Awesome.Property.ValueType.Binary ],
    "CATEGORIES"        : Awesome.Property.ValueType.Text,
    "CLASS"             : Awesome.Property.ValueType.Text,
    "COMMENT"           : Awesome.Property.ValueType.Text,
    "DESCRIPTION"       : Awesome.Property.ValueType.Text,
    "GEO"               : Awesome.Property.ValueType.Geo,
    "LOCATION"          : Awesome.Property.ValueType.Text,
    "PERCENT-COMPLETE"  : Awesome.Property.ValueType.Integer,
    "PRIORITY"          : Awesome.Property.ValueType.Integer,
    "RESOURCES"         : Awesome.Property.ValueType.Text,
    "STATUS"            : Awesome.Property.ValueType.Text,
    "SUMMARY"           : Awesome.Property.ValueType.Text,
    "COMPLETED"         : Awesome.Property.ValueType.DateTime,
    "DTEND"             : [ Awesome.Property.ValueType.DateTime, Awesome.Property.ValueType.Date ],
    "DUE"               : [ Awesome.Property.ValueType.DateTime, Awesome.Property.ValueType.Date ],
    "DTSTART"           : [ Awesome.Property.ValueType.DateTime, Awesome.Property.ValueType.Date ],
    "DURATION"          : Awesome.Property.ValueType.Duration,
    "FREEBUSY"          : Awesome.Property.ValueType.PeriodOfTime,
    "TRANSP"            : Awesome.Property.ValueType.Text,
    "TZID"              : Awesome.Property.ValueType.Text,
    "TZNAME"            : Awesome.Property.ValueType.Text,
    "TZOFFSETFROM"      : Awesome.Property.ValueType.UTCOffset,
    "TZOFFSETTO"        : Awesome.Property.ValueType.UTCOffset,
    "TZURL"             : Awesome.Property.ValueType.URI,
    "ATTENDEE"          : Awesome.Property.ValueType.CalendarUserAddress,
    "CONTACT"           : Awesome.Property.ValueType.Text,
    "ORGANIZER"         : Awesome.Property.ValueType.CalendarUserAddress,
    "RECURRENCE-ID"     : [ Awesome.Property.ValueType.DateTime, Awesome.Property.ValueType.Date ],
    "RELATED-TO"        : Awesome.Property.ValueType.Text,
    "URL"               : Awesome.Property.ValueType.URI,
    "UID"               : Awesome.Property.ValueType.Text,
    "EXDATE"            : [ Awesome.Property.ValueType.DateTime, Awesome.Property.ValueType.Date ],
    "RDATE"             : [ Awesome.Property.ValueType.DateTime, Awesome.Property.ValueType.Date, Awesome.Property.ValueType.PeriodOfTime ],
    "RRULE"             : Awesome.Property.ValueType.RecurrenceRule,
    "ACTION"            : Awesome.Property.ValueType.Text,
    "REPEAT"            : Awesome.Property.ValueType.Integer,
    "TRIGGER"           : [ Awesome.Property.ValueType.Duration, Awesome.Property.ValueType.DateTime ],
    "CREATED"           : Awesome.Property.ValueType.DateTime,
    "DTSTAMP"           : Awesome.Property.ValueType.DateTime,
    "LAST-MODIFIED"     : Awesome.Property.ValueType.DateTime,
    "SEQUENCE"          : Awesome.Property.ValueType.Integer,
    "REQUEST-STATUS"    : Awesome.Property.ValueType.Text,
    "DEFAULT"           : Awesome.Property.ValueType.Text,
    get                 : function(name, params) {
        var mapping = Awesome.Property.ValueType.Mappings[name] || Awesome.Property.ValueType.Mappings["DEFAULT"];

        if (Array.isArray(mapping)) {
            return mapping[0];
        }

        return mapping;
    }
};

module.exports = Awesome;