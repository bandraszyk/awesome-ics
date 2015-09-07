import { Property } from "./property";
import { mapToJSON, mapToString, splitSafeLines, setError, trim, removePattern } from "./util";

export class Block {
    constructor(content) {
        this.original   = content;
        this.properties = [];
        this.blocks     = [];
        this.type       = "BLOCK";

        if (!this.original) { return; }

        //-- Read the content
        let lines = splitSafeLines(content, Block.__format);
        let blockBegin = trim(lines.shift() || "");
        let blockEnd = trim(lines.pop() || "");

        //-- Validate block start
        if (!Block.__format.regexBlockBegin.test(blockBegin)) { return setError(this, "Cannot load Block element, first line should match /^BEGIN:/i."); }

        //-- Validate block end
        if (!Block.__format.regexBlockEnd.test(blockEnd)) { return setError(this, "Cannot load Block elements, last line should match /^END:/i."); }

        //-- Validate the name
        if (removePattern(blockBegin, Block.__format.regexBlockBegin) !== removePattern(blockEnd, Block.__format.regexBlockEnd)) {
            return setError(this, "Cannot load Block elements, block doesn't have and end.");
        }

        //-- Set the name
        this.type = removePattern(blockBegin, Block.__format.regexBlockBegin);

        let block           = [];
        let blockCounter    = 0;

        //-- Process the lines
        lines.forEach(line => {
            //-- Increase the block counter for block begin
            if (Block.__format.regexBlockBegin.test(line)) { blockCounter++; }

            //-- Decrease the block counter for block end
            if (Block.__format.regexBlockEnd.test(line)) { blockCounter--; }

            //-- Process as new child block
            if (blockCounter === 0 && block.length > 0) {
                block.push(line);
                this.blocks.push(new Block(block.join(Block.__format.newLine)));
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
        if (this.error) { return this.error; }

        let properties  = "";
        let blocks    = "";

        if (this.properties.length) { properties = this.properties.map(mapToString).join(Block.__format.newLine) + Block.__format.newLine; }
        if (this.blocks.length) { blocks = this.blocks.map(mapToString).join(Block.__format.newLine) + Block.__format.newLine; }

        return `${Block.__format.blockBegin}${this.type}${Block.__format.newLine}${properties}${blocks}${Block.__format.blockEnd}${this.type}`;
    }
    toJSON() {
        if (this.error) { return { error: this.error }; }

        return {
            type        : this.type,
            properties  : this.properties.map(mapToJSON),
            blocks      : this.blocks.map(mapToJSON)
        }
    }
}

Block.__format = {
    regexBlockBegin : /^BEGIN:/i,
    regexBlockEnd   : /^END:/i,
    blockBegin      : "BEGIN:",
    blockEnd        : "END:",
    newLine         : "\n",
    multiLineBegin  : " "
}