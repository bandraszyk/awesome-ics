"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _block = require("./block");

var _property = require("./property");

var _propertyParameter = require("./property-parameter");

var _propertyValue = require("./property-value");

var Calendar = (function (_Block) {
    _inherits(Calendar, _Block);

    function Calendar() {
        _classCallCheck(this, Calendar);

        _get(Object.getPrototypeOf(Calendar.prototype), "constructor", this).call(this);
        this.type = "CALENDAR";
    }

    return Calendar;
})(_block.Block);

exports.Calendar = Calendar;
var Elements = {
    Block: _block.Block,
    Property: _property.Property,
    PropertyParameter: _propertyParameter.PropertyParameter,
    PropertyValue: {
        Value: _propertyValue.PropertyValue,
        MultipleValue: _propertyValue.PropertyMultipleValue,
        Binary: _propertyValue.Binary,
        Boolean: _propertyValue.Boolean,
        CalendarUserAddress: _propertyValue.CalendarUserAddress,
        Date: _propertyValue.Date,
        DateTime: _propertyValue.DateTime,
        Duration: _propertyValue.Duration,
        Float: _propertyValue.Float,
        Geo: _propertyValue.Geo,
        Integer: _propertyValue.Integer,
        PeriodOfTime: _propertyValue.PeriodOfTime,
        RecurrenceRule: _propertyValue.RecurrenceRule,
        Text: _propertyValue.Text,
        Time: _propertyValue.Time,
        URI: _propertyValue.URI,
        UTCOffset: _propertyValue.UTCOffset
    }
};
exports.Elements = Elements;
