"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.trim = trim;
exports.removePattern = removePattern;
exports.mapToString = mapToString;
exports.mapToJSON = mapToJSON;
exports.setError = setError;
exports.splitSafe = splitSafe;
exports.splitSafeLines = splitSafeLines;

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

function splitSafe(text, separator) {
    var parts = text.split(separator);

    if (parts.length === 1) {
        return parts;
    }

    for (var currentLineIndex = 0; currentLineIndex < parts.length - 1; currentLineIndex++) {
        var line = parts[currentLineIndex];
        var matchQuotationMarks = line.match(/"/g);
        var shouldBeContinued = !matchQuotationMarks || matchQuotationMarks.length % 2 === 0;

        if (shouldBeContinued) {
            continue;
        }

        //-- Merge with previous line and remove from array current element
        parts[currentLineIndex] = [line, parts[currentLineIndex + 1]].join(separator);
        parts.splice(currentLineIndex + 1, 1);
    }

    return parts;
}

function splitSafeLines(text, format) {
    var lines = text.split(format && format.newLine || "\n");

    for (var currentLineIndex = 1; currentLineIndex < lines.length;) {
        var line = lines[currentLineIndex];
        var isContinuation = line[0] === (format && format.multiLineBegin || " ");

        if (isContinuation) {
            //-- Merge with previous line and remove from array current element
            lines[currentLineIndex - 1] = [lines[currentLineIndex - 1], line.slice(1)].join("");
            lines.splice(currentLineIndex, 1);
            continue;
        }

        currentLineIndex++;
    }

    return lines.filter(function (line) {
        return line;
    });
}
