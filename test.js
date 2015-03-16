var Awesome = {};

Awesome.Util = {
    format      :  {
        newLine     : "\n",
        separator   : ":"
    },
    regex       : {
        sectionBegin        : /^BEGIN:/i,
        sectionEnd          : /^END:/i,
        removeWhitespaces   : function(text) {
            return Awesome.Util.regex.removePattern(text, /\s/g);
        },
        removePattern       : function(text, regexp) {
            return text.replace(regexp, "");
        }
    }
};

Awesome.Element = function(elementType, content) {
    var self = this;
    self.element = { "type" : elementType, properties: [], children: [] }

    self.toString = function() {
        return JSON.stringify(self, null, 4);
    };

    self.load = function(content) {
        //-- Split content to lines and filter out empty ones
        var lines = content
            .split(Awesome.Util.format.newLine)
            .filter(function(line) { return !!line; });

        //-- Initialize temporary variables
        var createEmptyChild = function() {
            return {
                object     : null,
                content     : [],
                getElement  : function() { return this.object && this.object.load(this.content.join(Awesome.Util.format.newLine)); }
            }
        };
        var child = createEmptyChild();

        //-- Iterate the lines to read properties
        lines.forEach(function(line, index) {
            //-- Normalize the line
            var line = Awesome.Util.regex.removeWhitespaces(line);

            //-- BEGIN element identified
            if (Awesome.Util.regex.sectionBegin.test(line)) {
                //-- Extract type
                var type = Awesome.Util.regex.removePattern(line, Awesome.Util.regex.sectionBegin);

                //-- First element in collection should not be processed
                if (type === self.element.type && index === 0) { return; }

                //-- Create direct child
                if (type !== self.element.type && !child.object) { child.object = new Awesome.Element(type); }
            }

            //-- Add current line to child content
            if (child.object) { child.content.push(line); }

            //-- END element identified
            if (Awesome.Util.regex.sectionEnd.test(line)) {
                //-- Extract type
                var type = Awesome.Util.regex.removePattern(line, Awesome.Util.regex.sectionEnd);

                // Last element in collection should not be processed
                if (type === self.element.type && index === lines.length - 1) { return; }

                //-- Process direct child
                if (type !== self.element.type && child.object && child.object.element.type === type) {
                    self.element.children.push(child.getElement());
                    child = createEmptyChild();
                    return;
                }
            }

            if (child.object) { return; }

            //-- Extract properties
            self.element.properties.push(line);
        });

        return self;
    };

    if (content) { self.load(content); }
};

Awesome.Calendar = function(content) {
    var self    = this;
    var root    = new Awesome.Element("VCALENDAR", content);

    self.toString = function() {
        return root.toString();
    };

    self.format = function() {
        return root.format();
    }
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

var calendar = new Awesome.Calendar(file);

console.log(calendar.toString());

module.exports = Awesome.Calendar;