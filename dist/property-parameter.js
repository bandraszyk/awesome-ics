"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _constants = require("./constants");

var _util = require("./util");

var propertyTypes = ["ALTREP", "CN", "CUTYPE", "DELEGATED-FROM", "DELEGATED-TO", "DIR", "ENCODING", "FMTTYPE", "FBTYPE", "LANGUAGE", "MEMBER", "PARTSTAT", "RANGE", "RELATED", "RELTYPE", "ROLE", "RSVP", "SENT-BY", "TZID", "VALUE"];

var PropertyParameter = (function () {
    function PropertyParameter(content) {
        _classCallCheck(this, PropertyParameter);

        this.original = content;
        this.name = (0, _util.splitSafe)(content, _constants.format.separatorValue)[0];
        this.value = content.slice(this.name.length + 1);
    }

    _createClass(PropertyParameter, [{
        key: "toString",
        value: function toString() {
            return [this.name, this.value].join(_constants.format.separatorValue);
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                name: this.name,
                value: this.value
            };
        }
    }]);

    return PropertyParameter;
})();

exports.PropertyParameter = PropertyParameter;
