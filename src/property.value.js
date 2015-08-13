// TODO: 3.3 Property Value Type
Awesome.Property.ValueType = {};
Awesome.Property.ValueType.Binary = function() {
    var self = this;
    self.value = null;

    self.loadFromText = function(content) {
        self.value = content;
        return self;
    };

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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

    // Converts current object to ICS format
    self.toString = function() {
        return self.value;
    };

    // Converts current object to pure JSON
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
            // TODO: map with the use of params
            return mapping[0];
        }

        return mapping;
    }
};