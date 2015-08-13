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