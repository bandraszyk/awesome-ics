"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _property = require("./property");

var _util = require("./util");

var Block = (function () {
    function Block(content) {
        var _this = this;

        _classCallCheck(this, Block);

        //-- Get rid of invalid characters
        content = content && content.replace(/\r/g, "").trim();

        this.original = content;
        this.properties = [];
        this.blocks = [];
        this.type = "";

        if (!this.original) {
            return;
        }

        //-- Read the content
        var lines = (0, _util.splitSafeLines)(content, Block.__format);
        var blockBegin = (0, _util.trim)(lines.shift() || "");
        var blockEnd = (0, _util.trim)(lines.pop() || "");

        //-- Validate block start
        if (!Block.__format.regexBlockBegin.test(blockBegin)) {
            return (0, _util.setError)(this, "Cannot load Block element, first line should match /^BEGIN:/i.");
        }

        //-- Validate block end
        if (!Block.__format.regexBlockEnd.test(blockEnd)) {
            return (0, _util.setError)(this, "Cannot load Block elements, last line should match /^END:/i.");
        }

        //-- Validate the name
        if ((0, _util.removePattern)(blockBegin, Block.__format.regexBlockBegin) !== (0, _util.removePattern)(blockEnd, Block.__format.regexBlockEnd)) {
            return (0, _util.setError)(this, "Cannot load Block elements, block doesn't have and end.");
        }

        //-- Set the name
        this.type = (0, _util.removePattern)(blockBegin, Block.__format.regexBlockBegin);

        var block = [];
        var blockCounter = 0;

        //-- Process the lines
        lines.forEach(function (line) {
            //-- Increase the block counter for block begin
            if (Block.__format.regexBlockBegin.test(line)) {
                blockCounter++;
            }

            //-- Decrease the block counter for block end
            if (Block.__format.regexBlockEnd.test(line)) {
                blockCounter--;
            }

            //-- Process as new child block
            if (blockCounter === 0 && block.length > 0) {
                block.push(line);
                _this.blocks.push(new Block(block.join(Block.__format.newLine)));
                block = [];
                return;
            }

            //-- Process child blocks' content
            if (blockCounter > 0) {
                return block.push(line);
            }

            //-- Add as property
            _this.properties.push(new _property.Property(line));
        });
    }

    _createClass(Block, [{
        key: "toString",
        value: function toString() {
            if (this.error) {
                return this.error;
            }

            var properties = "";
            var blocks = "";

            if (this.properties.length) {
                properties = this.properties.map(_util.mapToString).join(Block.__format.newLine) + Block.__format.newLine;
            }
            if (this.blocks.length) {
                blocks = this.blocks.map(_util.mapToString).join(Block.__format.newLine) + Block.__format.newLine;
            }

            return "" + Block.__format.blockBegin + this.type + Block.__format.newLine + properties + blocks + Block.__format.blockEnd + this.type;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            if (this.error) {
                return { error: this.error };
            }

            return {
                type: this.type,
                properties: this.properties.map(_util.mapToJSON),
                blocks: this.blocks.map(_util.mapToJSON)
            };
        }
    }]);

    return Block;
})();

exports.Block = Block;

Block.__format = {
    regexBlockBegin: /^BEGIN:/i,
    regexBlockEnd: /^END:/i,
    blockBegin: "BEGIN:",
    blockEnd: "END:",
    newLine: "\n",
    multiLineBegin: " "
};
