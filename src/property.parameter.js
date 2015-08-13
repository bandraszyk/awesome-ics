Awesome.PropertyParameter = function() {
    // Initialize basic variable and object properties
    var self = this;
    self.name = null;
    self.value = null;

    // Loads property's name and value from string. Returns current instance.
    self.loadFromText = function(content) {
        self.name   = Awesome.Util.splitSafe(content, Awesome.Constants.format.separatorValue)[0];
        self.value = Awesome.Util.trim(content.slice(self.name.length + 1));

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