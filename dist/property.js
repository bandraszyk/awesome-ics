"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _util = require("./util");

var _constants = require("./constants");

var _propertyParameter = require("./property-parameter");

var _propertyValue = require("./property-value");

var Property = (function () {
    function Property(content) {
        _classCallCheck(this, Property);

        this.original = content;
        this.parameters = [];
        this.name = (0, _util.splitSafe)(content, _constants.format.separatorProp)[0];
        this.value = (0, _util.trim)(content.slice(this.name.length + 1));

        var parameters = (0, _util.splitSafe)(this.name, _constants.format.separatorParam);

        if (this.name.indexOf(_constants.format.separatorParam) !== -1) {
            this.name = parameters[0];
            this.parameters = parameters.slice(1).map(function (paramContent) {
                return new _propertyParameter.PropertyParameter(paramContent);
            });
        }

        this.value = (0, _propertyValue.getValue)(this.name, this.parameters, this.value);
    }

    _createClass(Property, [{
        key: "toString",
        value: function toString() {
            var name = this.name;

            if (this.parameters.length) {
                var parameters = this.parameters.map(_util.mapToString).join(_constants.format.separatorParam);
                name = [name, parameters].join(_constants.format.separatorParam);
            }

            return name + _constants.format.separatorProp + this.value;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                name: this.name,
                value: this.value,
                params: this.parameters.map(_util.mapToJSON)
            };
        }
    }]);

    return Property;
})();

exports.Property = Property;
