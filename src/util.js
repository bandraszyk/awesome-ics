//     Awesome ICS v0.1.0
//     http://bandraszyk.github.io/awesome-ico/
//     (c) 2015 Bandro
//     Awesome ICS may be freely distributed under the MIT license.

// ### Function: removePattern
// > Removes all characters that match the specified regular expression
export function removePattern(text, regexp) {
    return text.replace(regexp, "");
}

// ### Function: trim
// > Removes empty spaces form beginning and ending of specified text
export function trim(text) {
    let trimmedBeginning = removePattern(text, /^\s+/g);
    return removePattern(trimmedBeginning, /\s+$/g);
}

// ### Function: mapToString
// > Calls `toSting` method on specified object ensuring that it exists
export function mapToString(object) {
    return object && object.toString() || "";
}

// ### Function: mapToJSON
// > Calls `toJSON` method on specified object ensuring that it exists
export function mapToJSON(object) {
    return object && object.toJSON() || null;
}

// ### Function: splitSafe
// > Splits the specified text with the use of separator taking into consideration quotation marks
export function splitSafe(text, separator) {
    let parts = text.split(separator);

    if (parts.length === 1) { return parts; }

    for (let currentLineIndex = 0; currentLineIndex < parts.length - 1; currentLineIndex++) {
        let line = parts[currentLineIndex];
        let matchQuotationMarks = line.match(/"/g);
        let shouldBeContinued = !matchQuotationMarks || (matchQuotationMarks.length % 2 === 0);

        if (shouldBeContinued) { continue; }

        // Merge with previous line and remove from array current element
        parts[currentLineIndex] = `${line}${separator}${parts[currentLineIndex + 1]}`;
        parts.splice(currentLineIndex + 1, 1);
    }

    return parts;
}

// ### Function: splitSafeLines
// > Splits the specified for lines taking into consideration multi line text that start with empty space
export function splitSafeLines(text, format) {
    let lines = text.split(format && format.newLine || "\n");

    for (let currentLineIndex = 1; currentLineIndex < lines.length;) {
        let line = lines[currentLineIndex];
        let isContinuation = line[0] === (format && format.multiLineBegin || " ");

        if (isContinuation) {
            // Merge with previous line and remove from array current element
            lines[currentLineIndex - 1] = `${lines[currentLineIndex - 1]}${line.slice(1)}`;
            lines.splice(currentLineIndex, 1);
            continue;
        }

        currentLineIndex++;
    }

    return lines.filter(function(line) { return line; });
}

// ### Function: isEmptyString
// > Checks if specified text is an empty string
export function isEmptyString(text) {
    return text === undefined || text === null || text.trim() === "";
}