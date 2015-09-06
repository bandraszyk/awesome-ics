var diff = require("diff");

//-- Define custom matchers
var customMatchers = {
    noDiffBetween: function (util, customEqualityTesters) { return {
        compare: function (actual, expected) {
            if (typeof expected === "undefined") { expected = ""; }

            var result = { message: "", pass: true };

            //-- Match
            result.pass = (actual === expected);

            //-- Message
            if (!result.pass) {
                //-- Get differences
                var differences = diff.diffLines(JSON.parse(actual), JSON.parse(expected));

                //-- Prepare message
                for (var i = 0; i < differences.length; i++) {
                    result.message += differences[i].added ? "+++" : differences[i].removed ? "---" : "";
                    result.message += differences[i].value;
                }
            }

            return result;
        }
    }}
};

module.exports = {
    applyCustomMatcher: function(jasmine) {
        jasmine.addMatchers(customMatchers);
    }
};