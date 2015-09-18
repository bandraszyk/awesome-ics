
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _util = require("./util");
var propertyTypes = ["ALTREP", "CN", "CUTYPE", "DELEGATED-FROM", "DELEGATED-TO", "DIR", "ENCODING", "FMTTYPE", "FBTYPE", "LANGUAGE", "MEMBER", "PARTSTAT", "RANGE", "RELATED", "RELTYPE", "ROLE", "RSVP", "SENT-BY", "TZID", "VALUE"];

var PropertyParameter = (function () {

    function PropertyParameter() {
        _classCallCheck(this, PropertyParameter);

        this.clear();
    }

    _createClass(PropertyParameter, [{
        key: "clear",
        value: function clear() {
            this.name = null;
            this.value = null;

            return this;
        }
    }, {
        key: "toString",
        value: function toString() {
            return "" + this.name + PropertyParameter.__format.separator + this.value;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                name: this.name,
                value: this.value
            };
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return this.clear();
            }

            this.name = (0, _util.splitSafe)(string, PropertyParameter.__format.separator)[0];
            this.value = string.slice(this.name.length + 1);

            return this;
        }
    }, {
        key: "setName",
        value: function setName(name) {
            if (typeof name !== "string" && !(name instanceof String)) {
                throw new Error("[PropertyParameter] [setName()] The name must be an instance of `String`");
            }

            this.name = name;
            return this;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            if (typeof value !== "string" && !(value instanceof String)) {
                throw new Error("[PropertyParameter] [setName()] The value must be an instance of `String`");
            }

            this.value = value;
            return this;
        }
    }]);

    return PropertyParameter;
})();

exports.PropertyParameter = PropertyParameter;
PropertyParameter.__format = {
    separator: "="
};
