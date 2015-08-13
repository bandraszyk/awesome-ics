// Definition of an object that contains useful function used within module
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
                // If current line do not contain even number of double quotation marks then lines should be treated as one
                var matchQuotationMarks = phrase.match(/"/g);
                return !matchQuotationMarks || (matchQuotationMarks.length % 2 === 0);
            });
    },
    splitSafeLines: function(text) {
        return Awesome.Util.mergeElements(text.split(Awesome.Constants.format.newLine),
            function(line, nextLine) {
                // If next line starts with whitespace both lines should be treated as one
                return nextLine[0] !== " ";
            });
    }
};