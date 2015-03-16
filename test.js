var Awesome = {};

Awesome.Defaults = {
    format      :  {
        newLine     : "\n",
        separator   : ":"
    },
    regex       : {
        sectionBegin        : /^BEGIN:/i,
        sectionEnd          : /^END:/i,
        removeWhitespaces   : function(text) {
            return Awesome.Defaults.regex.removePattern(text, /\s/g);
        },
        removePattern       : function(text, regexp) {
            return text.replace(regexp, "");
        }
    }
};

Awesome.Calendar = function(options) {
    var options = options || Awesome.Defaults;
    var self    = this;
    self.root    = new Awesome.Element("VCALENDAR");

    self.toString = function() {
        return self.root.toString();
    };

    self.format = function() {
        return self.root.format();
    };

    self.load = function(content) {
        self.root.load(content);
        return self;
    }
};

Awesome.Element = function(type, options) {
    var options     = options || Awesome.Defaults;
    var self        = this;
    self.type       = type;
    self.properties = [];
    self.children   = [];

    self.toString = function() {
        return JSON.stringify(self, null, 4);
    };

    self.format = function() {
        return self.type;
    };

    self.load = function(content) {
        if (!content) { return; }

        //-- Split content to lines and filter out empty ones
        var lines = content
            .split(options.format.newLine)
            .filter(function(line) { return !!line; });

        //-- Initialize temporary variables
        var child = new Awesome.ElementTemporaryChild(options);

        //-- Iterate the lines to read properties
        lines.forEach(function(line, index) {
            //-- Normalize the line
            var line = options.regex.removeWhitespaces(line);

            //-- BEGIN element identified
            if (options.regex.sectionBegin.test(line)) {
                //-- Extract type
                var type = options.regex.removePattern(line, options.regex.sectionBegin);

                //-- First element in collection should not be processed
                if (type === self.type && index === 0) { return; }

                //-- Create direct child
                if (type !== self.type && !child.element) { child.element = new Awesome.Element(type, options); }
            }

            //-- Add current line to child content
            if (child.element) { child.content.push(line); }

            //-- END element identified
            if (options.regex.sectionEnd.test(line)) {
                //-- Extract type
                var type = options.regex.removePattern(line, options.regex.sectionEnd);

                // Last element in collection should not be processed
                if (type === self.type && index === lines.length - 1) { return; }

                //-- Process direct child
                if (type !== self.type && child.element && child.element.type === type) {
                    self.children.push(child.finalize());
                    child = new Awesome.ElementTemporaryChild(options);
                    return;
                }
            }

            if (child.element) { return; }

            //-- Extract properties
            self.properties.push(new Awesome.Property(options).load(line));
        });

        return self;
    };
};

Awesome.ElementTemporaryChild = function(options) {
    var options     = options || Awesome.Defaults;
    var self        = this;
    self.element    = null;
    self.content    = [];

    self.finalize = function() {
        return self.element && self.element.load(self.content.join(options.format.newLine));
    };
};

Awesome.Property = function(options) {
    var self = this;

    self.toString = function() {
        return JSON.stringify(self, null, 4);
    };

    self.load  = function(content) {
        if (!content) { return; }

        var propertyValues = content.split(options.format.separator);

        self.name = propertyValues[0];
        self.value = propertyValues.slice(1).join("");

        return self;
    };
};

//-- TODO: Remove test data
var file =
"BEGIN:VCALENDAR\n \
VERSION:2.0 \n \
PRODID:-//hacksw/handcal//NONSGML v1.0//EN \n \
BEGIN:VEVENT \n \
DTSTART:19970714T170000Z \n \
DTEND:19970715T035959Z \n \
SUMMARY:Bastille Day Party \n \
END:VEVENT\n \
END:VCALENDAR\n";

var calendar = new Awesome.Calendar(null).load(file);

console.log(calendar.toString());
console.log(calendar.format());

module.exports = {
    Calendar    : Awesome.Calendar,
    Element     : Awesome.Element,
    Property    : Awesome.Property,
    Defaults    : Awesome.Defaults
};