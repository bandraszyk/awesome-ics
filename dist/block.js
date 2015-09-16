"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _property = require("./property");

var _util = require("./util");

var Block = (function () {
    function Block() {
        _classCallCheck(this, Block);

        this.clear();
    }

    _createClass(Block, [{
        key: "clear",
        value: function clear() {
            this.properties = [];
            this.blocks = [];
            this.type = null;
            return this;
        }
    }, {
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
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            var _this = this;
            string = Block.__format.prepareString(string);

            if ((0, _util.isEmptyString)(string)) {
                return this.clear();
            }
            var lines = (0, _util.splitSafeLines)(string, Block.__format);
            var blockBegin = (0, _util.trim)(lines.shift() || "");
            var blockEnd = (0, _util.trim)(lines.pop() || "");
            if (!Block.__format.regexBlockBegin.test(blockBegin)) {
                throw new Error("[Block] [convertFromString()] Cannot load Block element, first line should match /^BEGIN:/i.");
            }
            if (!Block.__format.regexBlockEnd.test(blockEnd)) {
                throw new Error("[Block] [convertFromString()] Cannot load Block elements, last line should match /^END:/i.");
            }
            if ((0, _util.removePattern)(blockBegin, Block.__format.regexBlockBegin) !== (0, _util.removePattern)(blockEnd, Block.__format.regexBlockEnd)) {
                throw new Error("[Block] [convertFromString()] Cannot load Block elements, block doesn't have the end.");
            }
            this.type = (0, _util.removePattern)(blockBegin, Block.__format.regexBlockBegin);

            var block = [];
            var blockCounter = 0;
            lines.forEach(function (line) {
                if (Block.__format.regexBlockBegin.test(line)) {
                    blockCounter++;
                }
                if (Block.__format.regexBlockEnd.test(line)) {
                    blockCounter--;
                }
                if (blockCounter === 0 && block.length > 0) {
                    block.push(line);
                    _this.blocks.push(new Block().convertFromString(block.join(Block.__format.newLine)));
                    block = [];
                    return;
                }
                if (blockCounter > 0) {
                    return block.push(line);
                }
                _this.properties.push(new _property.Property().convertFromString(line));
            });

            return this;
        }
    }, {
        key: "setType",
        value: function setType(type) {
            this.type = type;
            return this;
        }
    }, {
        key: "addBlock",
        value: function addBlock(block) {
            if (!(block instanceof Block)) {
                throw new Error("[Block] [addBlock()] The block should be an instance of `Block`");
            }

            this.blocks.push(block);
            return this;
        }
    }, {
        key: "addProperty",
        value: function addProperty(property) {
            if (!(property instanceof _property.Property)) {
                throw new Error("[Block] [addProperty()] The property should be an instance of `Block`");
            }

            this.properties.push(property);
            return this;
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
    multiLineBegin: " ",
    prepareString: function prepareString(string) {
        return string && string.replace(/\r/g, "").trim();
    }
};
