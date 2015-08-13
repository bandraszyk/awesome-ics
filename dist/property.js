"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Property = (function () {
    function Property(content) {
        _classCallCheck(this, Property);

        this.original = content;
    }

    _createClass(Property, [{
        key: "toString",
        value: function toString() {
            return this.original;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return { original: this.original };
        }
    }]);

    return Property;
})();

exports.Property = Property;
