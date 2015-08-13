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
