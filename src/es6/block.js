//-- Definition of single block element that starts with BEGIN:<type> and ends with END:<type>

import { Property } from "./property";
import { format, regex } from "./constants";
import { mapToJSON, mapToString, splitSafeLines, setError, trim, removePattern } from "./util";

export class Block {
    constructor(content) {
        this.original   = content;
        this.properties = [];
        this.blocks     = [];
        this.type       = "BLOCK";

        //-- Read the content
        var lines = splitSafeLines(content);
        var blockBegin = trim(lines.shift() || "");
        var blockEnd = trim(lines.pop() || "");

        //-- Validate block start
        if (!regex.blockBegin.test(blockBegin)) { return setError(this, "Cannot load Block element, first line should match /^BEGIN:/i."); }

        //-- Validate block end
        if (!regex.blockEnd.test(blockEnd)) { return setError(this, "Cannot load Block elements, last line should match /^END:/i."); }

        //-- Validate the name
        if (removePattern(blockBegin, regex.blockBegin) !== removePattern(blockEnd, regex.blockEnd)) {
            return setError(this, "Cannot load Block elements, block doesn't have and end.");
        }

        //-- Set the name
        this.type = removePattern(blockBegin, regex.blockBegin);

        let block           = [];
        let blockCounter    = 0;

        //-- Process the lines
        lines.forEach(line => {
            //-- Increase the block counter for block begin
            if (regex.blockBegin.test(line)) { blockCounter++; }

            //-- Decrease the block counter for block end
            if (regex.blockEnd.test(line)) { blockCounter--; block.push(line); }

            //-- Process as new child block
            if (blockCounter === 0 && block.length > 0) {
                this.blocks.push(new Block(block.join(format.newLine)));
                block = [];
                return;
            }

            //-- Process child blocks' content
            if (blockCounter > 0) { return block.push(line); }

            //-- Add as property
            this.properties.push(new Property(line));
        });
    }
    toString() {
        if (this.error) {return ""; }

        let properties  = "";
        let blocks    = "";

        if (this.properties.length) { properties = this.properties.map(mapToString).join(format.newLine) + format.newLine; }
        if (this.blocks.length) { blocks = this.blocks.map(mapToString).join(format.newLine) + format.newLine; }

        return `${format.blockBegin}${this.type}${format.newLine}${properties}${blocks}${format.blockEnd}${this.type}`;
    }
    toJSON() {
        if (this.error) { return { error: this.error }; }

        return {
            type    : this.type,
            prop    : this.properties.map(mapToJSON),
            blocks  : this.blocks.map(mapToJSON)
        }
    }
}