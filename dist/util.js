"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.trim = trim;
exports.removePattern = removePattern;
exports.mapToString = mapToString;
exports.mapToJSON = mapToJSON;
exports.setError = setError;
exports.mergeElements = mergeElements;
exports.splitSafe = splitSafe;
exports.splitSafeLines = splitSafeLines;

var _constants = require("./constants");

function trim(text) {
    var trimmedBeginning = removePattern(text, /^\s+/g);
    return removePattern(trimmedBeginning, /\s+$/g);
}

function removePattern(text, regexp) {
    return text.replace(regexp, "");
}

function mapToString(entry) {
    return entry.toString();
}

function mapToJSON(entry) {
    return entry.toJSON();
}

function setError(object, message) {
    object.error = message;
}

function mergeElements(array, conditionOkCallback) {
    for (var i = 0; i < array.length;) {

        var element = array[i];
        var elementNext = array[i + 1];

        if (i == array.length - 1 || conditionOkCallback && conditionOkCallback(element, elementNext)) {
            i++;
            continue;
        }

        array.splice(i, 2, [element, elementNext].join(""));
    }

    return array.filter(function (entry) {
        return entry;
    });
}

function splitSafe(text, separator) {
    return mergeElements(text.split(separator), function (phrase) {
        // If current line do not contain even number of double quotation marks then lines should be treated as one
        var matchQuotationMarks = phrase.match(/"/g);
        return !matchQuotationMarks || matchQuotationMarks.length % 2 === 0;
    });
}

function splitSafeLines(text) {
    return mergeElements(text.split(_constants.format.newLine), function (line, nextLine) {
        // If next line starts with whitespace both lines should be treated as one
        return nextLine[0] !== " ";
    });
}
