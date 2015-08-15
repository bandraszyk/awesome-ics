//-- Definition of single block element that starts with BEGIN:<type> and ends with END:<type>

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _property = require("./property");

var _constants = require("./constants");

var _util = require("./util");

var Block = (function () {
    function Block(content) {
        var _this = this;

        _classCallCheck(this, Block);

        this.original = content;
        this.properties = [];
        this.blocks = [];
        this.type = "BLOCK";

        //-- Read the content
        var lines = (0, _util.splitSafeLines)(content);
        var blockBegin = (0, _util.trim)(lines.shift() || "");
        var blockEnd = (0, _util.trim)(lines.pop() || "");

        //-- Validate block start
        if (!_constants.regex.blockBegin.test(blockBegin)) {
            return (0, _util.setError)(this, "Cannot load Block element, first line should match /^BEGIN:/i.");
        }

        //-- Validate block end
        if (!_constants.regex.blockEnd.test(blockEnd)) {
            return (0, _util.setError)(this, "Cannot load Block elements, last line should match /^END:/i.");
        }

        //-- Validate the name
        if ((0, _util.removePattern)(blockBegin, _constants.regex.blockBegin) !== (0, _util.removePattern)(blockEnd, _constants.regex.blockEnd)) {
            return (0, _util.setError)(this, "Cannot load Block elements, block doesn't have and end.");
        }

        //-- Set the name
        this.type = (0, _util.removePattern)(blockBegin, _constants.regex.blockBegin);

        var block = [];
        var blockCounter = 0;

        //-- Process the lines
        lines.forEach(function (line) {
            //-- Increase the block counter for block begin
            if (_constants.regex.blockBegin.test(line)) {
                blockCounter++;
            }

            //-- Decrease the block counter for block end
            if (_constants.regex.blockEnd.test(line)) {
                blockCounter--;block.push(line);
            }

            //-- Process as new child block
            if (blockCounter === 0 && block.length > 0) {
                _this.blocks.push(new Block(block.join(_constants.format.newLine)));
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
                return "";
            }

            var properties = "";
            var blocks = "";

            if (this.properties.length) {
                properties = this.properties.map(_util.mapToString).join(_constants.format.newLine) + _constants.format.newLine;
            }
            if (this.blocks.length) {
                blocks = this.blocks.map(_util.mapToString).join(_constants.format.newLine) + _constants.format.newLine;
            }

            return "" + _constants.format.blockBegin + this.type + _constants.format.newLine + properties + blocks + _constants.format.blockEnd + this.type;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            if (this.error) {
                return { error: this.error };
            }

            return {
                type: this.type,
                prop: this.properties.map(_util.mapToJSON),
                blocks: this.blocks.map(_util.mapToJSON)
            };
        }
    }]);

    return Block;
})();

exports.Block = Block;
