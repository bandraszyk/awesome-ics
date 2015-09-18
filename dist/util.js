"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removePattern = removePattern;
exports.trim = trim;
exports.mapToString = mapToString;
exports.mapToJSON = mapToJSON;
exports.splitSafe = splitSafe;
exports.splitSafeLines = splitSafeLines;
exports.isEmptyString = isEmptyString;

function removePattern(text, regexp) {
    return text.replace(regexp, "");
}

function trim(text) {
    var trimmedBeginning = removePattern(text, /^\s+/g);
    return removePattern(trimmedBeginning, /\s+$/g);
}

function mapToString(object) {
    return object && object.toString() || "";
}

function mapToJSON(object) {
    return object && object.toJSON() || null;
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
        parts[currentLineIndex] = "" + line + separator + parts[currentLineIndex + 1];
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
            lines[currentLineIndex - 1] = "" + lines[currentLineIndex - 1] + line.slice(1);
            lines.splice(currentLineIndex, 1);
            continue;
        }

        currentLineIndex++;
    }

    return lines.filter(function (line) {
        return line;
    });
}

function isEmptyString(text) {
    return text === undefined || text === null || text.trim() === "";
}
