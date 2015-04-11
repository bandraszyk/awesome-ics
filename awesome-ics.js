//     awesomeIcs.js 1.0.0
//     http://bandraszyk.github.io/awesome-ics/
//     (c) 2015 Bandro
//     Awesome Rating may be freely distributed under the MIT license.
var Awesome = {};

//Definition of an object that contains Constants values used within module
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
        blockBegin          : /^BEGIN:/i,
        blockEnd            : /^END:/i,
        separator           : /.+:.+/i
    }
};

// Definition of an object that contains useful function used within module
Awesome.Util = {
    trim   : function(text) {
        var trimmedBeginning =  Awesome.Util.removePattern(text, /^\s+/g);
        return Awesome.Util.removePattern(trimmedBeginning, /\s+$/g);
    },
    removePattern       : function(text, regexp) {
        return text.replace(regexp, "");
    },
    mapToString         : function(entry) {
        return entry.toString();
    },
    mapToJSON           : function(entry) {
        return entry.toJSON();
    },
    setError            : function(object, message) {
        object.error = message;
    },
    splitSafe           : function(text, separator) {
        var baseSplit = text.split(separator);

        // Text within quotation marks should not be split
        for (var i = 0; i < baseSplit.length;) {
            var phrase = baseSplit[i];
            var matchQuotationMarks = phrase.match(/"/g);

            if (!matchQuotationMarks || (matchQuotationMarks.length % 2 === 0)) {
                i++;
            }
            else if (i == baseSplit.length - 1) {
                baseSplit = baseSplit.slice(-1);
            }
            else {
                var joinWithNext = [ baseSplit[i], baseSplit[i+1]].join("");
                baseSplit.splice(i, 2, joinWithNext);
            }
        }

        return baseSplit.filter(function(entry) { return entry; });
    }
};

// Definition of Main Calendar object that process the ICS formatted data
Awesome.Calendar = function() {
    // Initialize basic variable
    var self = this;
    var root = new Awesome.Block();

    // Loads calendar's structure from string. Returns current instance.
    self.loadFromText = function(content) {
        root.loadFromText(content);
        return self;
    };

    // Converts current object to ICS format
    self.toString = function() {
        return root && root.toString() || "";
    };

    // Converts current object to pure JSON
    self.toJSON = function() {
        return root.toJSON() || {};
    };
};

// Definition of single block element that starts with BEGIN:<type> and ends with END:<type>
Awesome.Block = function() {
    // Initialize basic variable and object properties
    var self        = this;
    self.children   = [];
    self.prop       = [];

    // Internal methods that process single content block
    var processBlockContent = function(lines) {
        if (lines.length === 0) {
            Awesome.Util.setError(self, "Cannot load Awesome.Block, it should end with /^END:/i statement.");
            return 0;
        }

        //-- A variable that stores information about the index of next line that should be processed
        var processedIndex = -1;
        var blockEnded = false;

        lines.forEach(function(line, index) {

            line = Awesome.Util.trim(line);

            //-- Omit the lines that should not be processed
            if (blockEnded || processedIndex > index) { return; }

            //-- If BEGIN of block then create a children and process rest of content there
            if (Awesome.Constants.regex.blockBegin.test(line)) {
                var block = new Awesome.Block();
                var blockContent = lines.slice(index).join(Awesome.Constants.format.newLine);
                processedIndex = block.loadFromText(blockContent) + index;
                self.children.push(block);
                return;
            }

            if (processedIndex < index) { processedIndex = index; }

            //-- IF END of block then do not process rest of lines
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
        var lines = content.split(Awesome.Constants.format.newLine);
        var firstLine = Awesome.Util.trim(lines[0] || "");

        if (!Awesome.Constants.regex.blockBegin.test(firstLine)) {
            Awesome.Util.setError(self, "Cannot load Awesome.Block, last line should start with /^BEGIN:/i in first line.");
            return 0;
        }

        self.type = Awesome.Util.removePattern(firstLine, Awesome.Constants.regex.blockBegin);

        var linesToProcess = lines.slice(1);
        return processBlockContent(linesToProcess) + 1;
    };

    // Converts current object to ICS format
    self.toString = function() {
        if (self.ERROR) { return self.error; }

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

    // Converts current object to pure JSON
    self.toJSON = function() {
        if (self.error) { return { error: self.error }; }

        return {
            type    : self.type,
            prop    : self.prop.map(Awesome.Util.mapToJSON),
            children: self.children.map(Awesome.Util.mapToJSON)
        };
    };
};

// Definition of single property that is stored as <name>:<value>
Awesome.Property = function() {
    // Initialize basic variable and object properties
    var self = this;
    self.name = null;
    self.value = null;
    self.params = [];
    self.valueType = null;  // TODO: 3.3 Property Value Type

    // Loads property's name and value from string. Returns current instance.
    self.loadFromText = function(content) {
        self.name   = Awesome.Util.splitSafe(content, Awesome.Constants.format.separatorProp)[0];
        self.value  = Awesome.Util.trim(content.slice(self.name.length + 1));

        if (self.name.indexOf(Awesome.Constants.format.separatorParam) !== -1) {
            var params = Awesome.Util.splitSafe(self.name, Awesome.Constants.format.separatorParam);
            self.name = params[0];
            self.params = params.slice(1).map(function(param) { return new Awesome.PropertyParameter().loadFromText(param); });
        }

        return self;
    };

    // Converts current object to ICS format
    self.toString = function() {
        var name = self.name;

        if (self.params.length) {
            var parameters = self.params.map(Awesome.Util.mapToString).join(Awesome.Constants.format.separatorParam);
            name = [ name, parameters ].join(Awesome.Constants.format.separatorParam);
        }

        return name + Awesome.Constants.format.separatorProp + self.value;
    };

    // Converts current object to pure JSON
    self.toJSON = function() {
        return {
            name    : self.name,
            value   : self.value,
            params  : self.params.map(Awesome.Util.mapToJSON)
        };
    };
};

Awesome.PropertyParameter = function() {
    // Initialize basic variable and object properties
    var self = this;
    self.name = null;
    self.value = null;

    // Loads property's name and value from string. Returns current instance.
    self.loadFromText = function(content) {
        self.name   = Awesome.Util.splitSafe(content, Awesome.Constants.format.separatorParam)[0];
        self.value  = Awesome.Util.trim(content.slice(self.name.length + 1));

        return self;
    };

    // Converts current object to ICS format
    self.toString = function() {
        return self.name + Awesome.Constants.format.separatorValue + self.value;
    };

    // Converts current object to pure JSON
    self.toJSON = function() {
        return {
            name    : self.name,
            value   : self.value
        };
    };
};

// TODO: 3.2 Property Parameters mapping
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

// TODO: 3.3 Property Value Type
Awesome.Property.ValueType = {};
Awesome.Property.ValueType.Binary = function() { };
Awesome.Property.ValueType.Boolean = function() { };
Awesome.Property.ValueType.CalendarUserAddress = function() { };
Awesome.Property.ValueType.Date = function() { };
Awesome.Property.ValueType.DateTime = function() { };
Awesome.Property.ValueType.Duration = function() { };
Awesome.Property.ValueType.Float = function() { };
Awesome.Property.ValueType.Integer = function() { };
Awesome.Property.ValueType.PeriodOfTime = function() { };
Awesome.Property.ValueType.RecurrenceRule = function() { };
Awesome.Property.ValueType.Text = function() { };               // 75 characters per line.
Awesome.Property.ValueType.Time = function() { };
Awesome.Property.ValueType.URI = function() { };
Awesome.Property.ValueType.UTCOffcet = function() { };

module.exports = Awesome;