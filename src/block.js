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

    // Converts current object to ICS format
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