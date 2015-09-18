//     Awesome ICS v0.1.0
//     http://bandraszyk.github.io/awesome-ico/
//     (c) 2015 Bandro
//     Awesome ICS may be freely distributed under the MIT license.

import { Property } from "./property";
import { mapToJSON, mapToString, splitSafeLines, trim, removePattern, isEmptyString } from "./util";

// ### Class: Block
// > Basic element for building iCalendar objects. It contains type, child blocks and properties.
export class Block {
    // Initializes the instance with default values
    constructor() {
        this.clear();
    }
    // Clears the `Block` by setting default values
    clear() {
        this.properties = [];
        this.blocks     = [];
        this.type       = null;
        return this;
    }
    // Converts `Block` to string
    toString() {
        let properties  = "";
        let blocks      = "";

        if (this.properties.length) { properties = `${this.properties.map(mapToString).join(Block.__format.newLine)}${Block.__format.newLine}`; }
        if (this.blocks.length) { blocks = `${this.blocks.map(mapToString).join(Block.__format.newLine)}${Block.__format.newLine}`; }

        return `${Block.__format.blockBegin}${this.type}${Block.__format.newLine}${properties}${blocks}${Block.__format.blockEnd}${this.type}`;
    }
    // Converts `Block` to JSON object
    toJSON() {
        return {
            type        : this.type,
            properties  : this.properties.map(mapToJSON),
            blocks      : this.blocks.map(mapToJSON)
        }
    }
    // Converts `Block` from string, e.g.: 'BEGIN:BlockType\nEND:BlockType'
    convertFromString(string) {
        // - Get rid of invalid characters
        string = Block.__format.prepareString(string);

        if (isEmptyString(string)) { return this.clear(); }

        // - Read the content
        let lines = splitSafeLines(string, Block.__format);
        let blockBegin = trim(lines.shift() || "");
        let blockEnd = trim(lines.pop() || "");

        // - Validate block start
        if (!Block.__format.regexBlockBegin.test(blockBegin)) {
            throw new Error("[Block] [convertFromString()] Cannot load Block element, first line should match /^BEGIN:/i.");
        }

        // - Validate block end
        if (!Block.__format.regexBlockEnd.test(blockEnd)) {
            throw new Error("[Block] [convertFromString()] Cannot load Block elements, last line should match /^END:/i.");
        }

        // - Validate the type
        if (removePattern(blockBegin, Block.__format.regexBlockBegin) !== removePattern(blockEnd, Block.__format.regexBlockEnd)) {
            throw new Error("[Block] [convertFromString()] Cannot load Block elements, block doesn't have the end.");
        }

        // - Set the type
        this.type = removePattern(blockBegin, Block.__format.regexBlockBegin);

        let block           = [];
        let blockCounter    = 0;

        // - Process the lines
        lines.forEach(line => {
            // - Increase the block counter for block begin
            if (Block.__format.regexBlockBegin.test(line)) { blockCounter++; }

            // - Decrease the block counter for block end
            if (Block.__format.regexBlockEnd.test(line)) { blockCounter--; }

            // - Process as new child block
            if (blockCounter === 0 && block.length > 0) {
                block.push(line);
                this.blocks.push(new Block().convertFromString(block.join(Block.__format.newLine)));
                block = [];
                return;
            }

            // - Process child blocks' content
            if (blockCounter > 0) { return block.push(line); }

            // - Add as property
            this.properties.push(new Property().convertFromString(line));
        });

        return this;
    }
    // Sets `Block`'s type that must be a string
    setType(type) {
        if (typeof type !== "string" && !(type instanceof String)) {
            throw new Error("[Block] [setType()] The type must be an instance of `String`");
        }

        this.type = type;
        return this;
    }
    // Adds child block to `Block`. The child block must be an instance of `Block`
    addBlock(block) {
        if (!(block instanceof Block)) {
            throw new Error("[Block] [addBlock()] The block must be an instance of `Block`");
        }

        this.blocks.push(block);
        return this;
    }
    // Adds property  to `Block`. The property must be an instance of `Property`
    addProperty(property) {
        if (!(property instanceof Property)) {
            throw new Error("[Block] [addProperty()] The property must be an instance of `Property`");
        }

        this.properties.push(property);
        return this;
    }
}

// ### Static members for: Block
Block.__format = {
    regexBlockBegin : /^BEGIN:/i,
    regexBlockEnd   : /^END:/i,
    blockBegin      : "BEGIN:",
    blockEnd        : "END:",
    newLine         : "\n",
    multiLineBegin  : " ",
    prepareString   : function(string) {
        return string && string.replace(/\r/g, "").trim();
    }
};