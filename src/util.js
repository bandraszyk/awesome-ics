export function trim(text) {
    let trimmedBeginning = removePattern(text, /^\s+/g);
    return removePattern(trimmedBeginning, /\s+$/g);
}

export function removePattern(text, regexp) {
    return text.replace(regexp, "");
}

export function mapToString(entry) {
    return entry && entry.toString() || "";
}

export function mapToJSON(entry) {
    return entry && entry.toJSON() || null;
}

export function splitSafe(text, separator) {
    let parts = text.split(separator);

    if (parts.length === 1) { return parts; }

    for (let currentLineIndex = 0; currentLineIndex < parts.length - 1; currentLineIndex++) {
        let line = parts[currentLineIndex];
        let matchQuotationMarks = line.match(/"/g);
        let shouldBeContinued = !matchQuotationMarks || (matchQuotationMarks.length % 2 === 0);

        if (shouldBeContinued) { continue; }

        //-- Merge with previous line and remove from array current element
        parts[currentLineIndex] = [ line, parts[currentLineIndex + 1] ].join(separator);
        parts.splice(currentLineIndex + 1, 1);
    }

    return parts;
}

export function splitSafeLines(text, format) {
    let lines = text.split(format && format.newLine || "\n");

    for (let currentLineIndex = 1; currentLineIndex < lines.length;) {
        let line = lines[currentLineIndex];
        let isContinuation = line[0] === (format && format.multiLineBegin || " ");

        if (isContinuation) {
            //-- Merge with previous line and remove from array current element
            lines[currentLineIndex - 1] = [ lines[currentLineIndex - 1], line.slice(1) ].join("");
            lines.splice(currentLineIndex, 1);
            continue;
        }

        currentLineIndex++;
    }

    return lines.filter(function(line) { return line; });
}

export function isEmptyString(string) {
    return string === undefined || string === null || string.trim() === "";
}