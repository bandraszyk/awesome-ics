"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.getValue = getValue;

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _constants = require("./constants");

var Value = (function () {
    function Value(content) {
        _classCallCheck(this, Value);

        this.original = content;
        this.value = content;
    }

    _createClass(Value, [{
        key: "toString",
        value: function toString() {
            return this.value.toString();
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.value;
        }
    }]);

    return Value;
})();

var Binary = (function (_Value) {
    _inherits(Binary, _Value);

    function Binary(content) {
        _classCallCheck(this, Binary);

        _get(Object.getPrototypeOf(Binary.prototype), "constructor", this).call(this, content);
    }

    return Binary;
})(Value);

var Boolean = (function (_Value2) {
    _inherits(Boolean, _Value2);

    function Boolean(content) {
        _classCallCheck(this, Boolean);

        _get(Object.getPrototypeOf(Boolean.prototype), "constructor", this).call(this, content);
    }

    return Boolean;
})(Value);

var CalendarUserAddress = (function (_Value3) {
    _inherits(CalendarUserAddress, _Value3);

    function CalendarUserAddress(content) {
        _classCallCheck(this, CalendarUserAddress);

        _get(Object.getPrototypeOf(CalendarUserAddress.prototype), "constructor", this).call(this, content);
    }

    return CalendarUserAddress;
})(Value);

var Date = (function (_Value4) {
    _inherits(Date, _Value4);

    function Date(content) {
        _classCallCheck(this, Date);

        _get(Object.getPrototypeOf(Date.prototype), "constructor", this).call(this, content);
    }

    return Date;
})(Value);

var DateTime = (function (_Value5) {
    _inherits(DateTime, _Value5);

    function DateTime(content) {
        _classCallCheck(this, DateTime);

        _get(Object.getPrototypeOf(DateTime.prototype), "constructor", this).call(this, content);
    }

    return DateTime;
})(Value);

exports.DateTime = DateTime;

var Duration = (function (_Value6) {
    _inherits(Duration, _Value6);

    function Duration(content) {
        _classCallCheck(this, Duration);

        _get(Object.getPrototypeOf(Duration.prototype), "constructor", this).call(this, content);
    }

    return Duration;
})(Value);

var Float = (function (_Value7) {
    _inherits(Float, _Value7);

    function Float(content) {
        _classCallCheck(this, Float);

        _get(Object.getPrototypeOf(Float.prototype), "constructor", this).call(this, content);
    }

    // TWO floats separated by ,
    return Float;
})(Value);

exports.Float = Float;

var Geo = (function (_Value8) {
    _inherits(Geo, _Value8);

    function Geo(content) {
        _classCallCheck(this, Geo);

        _get(Object.getPrototypeOf(Geo.prototype), "constructor", this).call(this, content);

        var coordinates = content.split(_constants.format.separatorGeo);

        this.value = {
            latitude: parseFloat(coordinates[0]),
            longitude: parseFloat(coordinates[1])
        };
    }

    _createClass(Geo, [{
        key: "toString",
        value: function toString() {
            return this.value.latitude.toString() + _constants.format.separatorGeo + this.value.longitude.toString();
        }
    }]);

    return Geo;
})(Value);

var Integer = (function (_Value9) {
    _inherits(Integer, _Value9);

    function Integer(content) {
        _classCallCheck(this, Integer);

        _get(Object.getPrototypeOf(Integer.prototype), "constructor", this).call(this, content);
    }

    return Integer;
})(Value);

var PeriodOfTime = (function (_Value10) {
    _inherits(PeriodOfTime, _Value10);

    function PeriodOfTime(content) {
        _classCallCheck(this, PeriodOfTime);

        _get(Object.getPrototypeOf(PeriodOfTime.prototype), "constructor", this).call(this, content);
    }

    return PeriodOfTime;
})(Value);

var RecurrenceRule = (function (_Value11) {
    _inherits(RecurrenceRule, _Value11);

    function RecurrenceRule(content) {
        _classCallCheck(this, RecurrenceRule);

        _get(Object.getPrototypeOf(RecurrenceRule.prototype), "constructor", this).call(this, content);
    }

    return RecurrenceRule;
})(Value);

var Text = (function (_Value12) {
    _inherits(Text, _Value12);

    function Text(content) {
        _classCallCheck(this, Text);

        _get(Object.getPrototypeOf(Text.prototype), "constructor", this).call(this, content);
    }

    // 75 characters per line.

    return Text;
})(Value);

var Time = (function (_Value13) {
    _inherits(Time, _Value13);

    function Time(content) {
        _classCallCheck(this, Time);

        _get(Object.getPrototypeOf(Time.prototype), "constructor", this).call(this, content);
    }

    return Time;
})(Value);

var URI = (function (_Value14) {
    _inherits(URI, _Value14);

    function URI(content) {
        _classCallCheck(this, URI);

        _get(Object.getPrototypeOf(URI.prototype), "constructor", this).call(this, content);
    }

    return URI;
})(Value);

var UTCOffset = (function (_Value15) {
    _inherits(UTCOffset, _Value15);

    function UTCOffset(content) {
        _classCallCheck(this, UTCOffset);

        _get(Object.getPrototypeOf(UTCOffset.prototype), "constructor", this).call(this, content);
    }

    return UTCOffset;
})(Value);

var valueMapping = {
    "CALSCALE": Text,
    "METHOD": Text,
    "PRODID": Text,
    "VERSION": Text,
    "ATTACH": [URI, Binary],
    "CATEGORIES": Text,
    "CLASS": Text,
    "COMMENT": Text,
    "DESCRIPTION": Text,
    "GEO": Geo,
    "LOCATION": Text,
    "PERCENT-COMPLETE": Integer,
    "PRIORITY": Integer,
    "RESOURCES": Text,
    "STATUS": Text,
    "SUMMARY": Text,
    "COMPLETED": DateTime,
    "DTEND": [DateTime, Date],
    "DUE": [DateTime, Date],
    "DTSTART": [DateTime, Date],
    "DURATION": Duration,
    "FREEBUSY": PeriodOfTime,
    "TRANSP": Text,
    "TZID": Text,
    "TZNAME": Text,
    "TZOFFSETFROM": UTCOffset,
    "TZOFFSETTO": UTCOffset,
    "TZURL": URI,
    "ATTENDEE": CalendarUserAddress,
    "CONTACT": Text,
    "ORGANIZER": CalendarUserAddress,
    "RECURRENCE-ID": [DateTime, Date],
    "RELATED-TO": Text,
    "URL": URI,
    "UID": Text,
    "EXDATE": [DateTime, Date],
    "RDATE": [DateTime, Date, PeriodOfTime],
    "RRULE": RecurrenceRule,
    "ACTION": Text,
    "REPEAT": Integer,
    "TRIGGER": [Duration, DateTime],
    "CREATED": DateTime,
    "DTSTAMP": DateTime,
    "LAST-MODIFIED": DateTime,
    "SEQUENCE": Integer,
    "REQUEST-STATUS": Text,
    "DEFAULT": Text
};

function getValue(propertyName, propertyParameters, propertyValue) {
    var mapping = valueMapping[propertyName] || valueMapping["DEFAULT"];

    if (Array.isArray(mapping)) {
        // TODO: map with the use of params
        mapping = mapping[0];
    }

    return new mapping(propertyValue);
}
