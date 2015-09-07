"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.getValue = getValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _util = require("./util");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var PropertyValue = (function () {
    function PropertyValue(content) {
        _classCallCheck(this, PropertyValue);

        this.original = content;
        this.value = content;
    }

    _createClass(PropertyValue, [{
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

    return PropertyValue;
})();

exports.PropertyValue = PropertyValue;

var PropertyMultipleValue = (function () {
    function PropertyMultipleValue(content, mapping) {
        var _splitSafe$map, _splitSafe$map2;

        _classCallCheck(this, PropertyMultipleValue);

        this.values = (_splitSafe$map = (0, _util.splitSafe)(content, PropertyMultipleValue.__format.separator).map(function (singleContent) {
            return new mapping(singleContent);
        }), _splitSafe$map2 = _toArray(_splitSafe$map), _splitSafe$map);
    }

    _createClass(PropertyMultipleValue, [{
        key: "toString",
        value: function toString() {
            return this.values.map(_util.mapToString).join(PropertyMultipleValue.__format.separator);
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.values.map(_util.mapToJSON);
        }
    }]);

    return PropertyMultipleValue;
})();

exports.PropertyMultipleValue = PropertyMultipleValue;

PropertyMultipleValue.__format = {
    separator: ","
};

var Binary = (function (_PropertyValue) {
    _inherits(Binary, _PropertyValue);

    function Binary(content) {
        _classCallCheck(this, Binary);

        _get(Object.getPrototypeOf(Binary.prototype), "constructor", this).call(this, content);
        // TODO: Implement behaviour
    }

    return Binary;
})(PropertyValue);

exports.Binary = Binary;

var Boolean = (function (_PropertyValue2) {
    _inherits(Boolean, _PropertyValue2);

    function Boolean(content) {
        _classCallCheck(this, Boolean);

        _get(Object.getPrototypeOf(Boolean.prototype), "constructor", this).call(this, content);
        this.value = JSON.parse(content.toLowerCase());
    }

    _createClass(Boolean, [{
        key: "toString",
        value: function toString() {
            return this.value.toString().toUpperCase();
        }
    }]);

    return Boolean;
})(PropertyValue);

exports.Boolean = Boolean;

var CalendarUserAddress = (function (_PropertyValue3) {
    _inherits(CalendarUserAddress, _PropertyValue3);

    function CalendarUserAddress(content) {
        _classCallCheck(this, CalendarUserAddress);

        _get(Object.getPrototypeOf(CalendarUserAddress.prototype), "constructor", this).call(this, content);
        // TODO: Implement behaviour
    }

    return CalendarUserAddress;
})(PropertyValue);

exports.CalendarUserAddress = CalendarUserAddress;

var Date = (function (_PropertyValue4) {
    _inherits(Date, _PropertyValue4);

    function Date(content) {
        _classCallCheck(this, Date);

        _get(Object.getPrototypeOf(Date.prototype), "constructor", this).call(this, content);
        this.value = _moment2["default"].utc(content, Date.__format.date);
    }

    _createClass(Date, [{
        key: "toString",
        value: function toString() {
            return this.value.format(Date.__format.date);
        }
    }]);

    return Date;
})(PropertyValue);

exports.Date = Date;

Date.__format = {
    date: "YYYYMMDD"
};

var DateTime = (function (_PropertyValue5) {
    _inherits(DateTime, _PropertyValue5);

    function DateTime(content) {
        _classCallCheck(this, DateTime);

        _get(Object.getPrototypeOf(DateTime.prototype), "constructor", this).call(this, content);
        var parts = content.split(DateTime.__format.separator);

        this.value = {
            date: new Date(parts[0]),
            time: new Time(parts[1])
        };
    }

    _createClass(DateTime, [{
        key: "toString",
        value: function toString() {
            return this.value.date.toString() + DateTime.__format.separator + this.value.time.toString();
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                date: this.value.date.toJSON(),
                time: this.value.time.toJSON()
            };
        }
    }]);

    return DateTime;
})(PropertyValue);

exports.DateTime = DateTime;

DateTime.__format = {
    separator: "T"
};

var Duration = (function (_PropertyValue6) {
    _inherits(Duration, _PropertyValue6);

    function Duration(content) {
        _classCallCheck(this, Duration);

        _get(Object.getPrototypeOf(Duration.prototype), "constructor", this).call(this, content);
        // TODO: Implement behaviour
    }

    return Duration;
})(PropertyValue);

exports.Duration = Duration;

var Float = (function (_PropertyValue7) {
    _inherits(Float, _PropertyValue7);

    function Float(content) {
        _classCallCheck(this, Float);

        _get(Object.getPrototypeOf(Float.prototype), "constructor", this).call(this, content);
        this.value = parseFloat(content);
    }

    return Float;
})(PropertyValue);

exports.Float = Float;

var Geo = (function (_PropertyValue8) {
    _inherits(Geo, _PropertyValue8);

    function Geo(content) {
        _classCallCheck(this, Geo);

        _get(Object.getPrototypeOf(Geo.prototype), "constructor", this).call(this, content);

        var coordinates = content.split(Geo.__format.separator);

        this.value = {
            latitude: new Float(coordinates[0]),
            longitude: new Float(coordinates[1])
        };
    }

    _createClass(Geo, [{
        key: "toString",
        value: function toString() {
            return this.value.latitude.toString() + Geo.__format.separator + this.value.longitude.toString();
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                latitude: this.value.latitude.toJSON(),
                longitude: this.value.longitude.toJSON()
            };
        }
    }]);

    return Geo;
})(PropertyValue);

exports.Geo = Geo;

Geo.__format = {
    separator: ";"
};

var Integer = (function (_PropertyValue9) {
    _inherits(Integer, _PropertyValue9);

    function Integer(content) {
        _classCallCheck(this, Integer);

        _get(Object.getPrototypeOf(Integer.prototype), "constructor", this).call(this, content);
        this.value = parseInt(content);
    }

    return Integer;
})(PropertyValue);

exports.Integer = Integer;

var PeriodOfTime = (function (_PropertyValue10) {
    _inherits(PeriodOfTime, _PropertyValue10);

    function PeriodOfTime(content) {
        _classCallCheck(this, PeriodOfTime);

        _get(Object.getPrototypeOf(PeriodOfTime.prototype), "constructor", this).call(this, content);
    }

    return PeriodOfTime;
})(PropertyValue);

exports.PeriodOfTime = PeriodOfTime;

var RecurrenceRule = (function (_PropertyValue11) {
    _inherits(RecurrenceRule, _PropertyValue11);

    function RecurrenceRule(content) {
        _classCallCheck(this, RecurrenceRule);

        _get(Object.getPrototypeOf(RecurrenceRule.prototype), "constructor", this).call(this, content);
        // TODO: Implement behaviour
    }

    return RecurrenceRule;
})(PropertyValue);

exports.RecurrenceRule = RecurrenceRule;

var Text = (function (_PropertyValue12) {
    _inherits(Text, _PropertyValue12);

    function Text(content) {
        _classCallCheck(this, Text);

        _get(Object.getPrototypeOf(Text.prototype), "constructor", this).call(this, content);
    }

    return Text;
})(PropertyValue);

exports.Text = Text;

var Time = (function (_PropertyValue13) {
    _inherits(Time, _PropertyValue13);

    function Time(content) {
        _classCallCheck(this, Time);

        _get(Object.getPrototypeOf(Time.prototype), "constructor", this).call(this, content);
        this.value = {
            time: (0, _moment2["default"])(content.slice(0, 6), Time.__format.time),
            isFixed: content.slice(-1) !== Time.__format.timeUTC
        };
    }

    _createClass(Time, [{
        key: "toString",
        value: function toString() {
            return this.value.time.format(Time.__format.time) + (!this.value.isFixed && Time.__format.timeUTC || "");
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                isFixed: this.value.isFixed,
                time: this.value.time
            };
        }
    }]);

    return Time;
})(PropertyValue);

exports.Time = Time;

Time.__format = {
    time: "HHmmSS",
    timeUTC: "Z"
};

var URI = (function (_PropertyValue14) {
    _inherits(URI, _PropertyValue14);

    function URI(content) {
        _classCallCheck(this, URI);

        _get(Object.getPrototypeOf(URI.prototype), "constructor", this).call(this, content);
    }

    return URI;
})(PropertyValue);

exports.URI = URI;

var UTCOffset = (function (_PropertyValue15) {
    _inherits(UTCOffset, _PropertyValue15);

    function UTCOffset(content) {
        _classCallCheck(this, UTCOffset);

        _get(Object.getPrototypeOf(UTCOffset.prototype), "constructor", this).call(this, content);
        this.value = (0, _moment2["default"])().utcOffset(content);
    }

    _createClass(UTCOffset, [{
        key: "toString",
        value: function toString() {
            return this.value.format(UTCOffset.__format.offset);
        }
    }]);

    return UTCOffset;
})(PropertyValue);

exports.UTCOffset = UTCOffset;

UTCOffset.__format = {
    offset: "ZZ"
};

//-- Define multiple values
Date.isMultiple = true;
DateTime.isMultiple = true;
Duration.isMultiple = true;
Float.isMultiple = true;
Integer.isMultiple = true;
PeriodOfTime.isMultiple = true;
Time.isMultiple = true;
Text.isMultiple = false;

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

var valueMultipleMapping = {
    "DATE": PropertyMultipleValue,
    "DATE-TIME": PropertyMultipleValue,
    "DURATION": PropertyMultipleValue,
    "FLOAT": PropertyMultipleValue,
    "INTEGER": PropertyMultipleValue,
    "PERIOD": PropertyMultipleValue,
    "TIME": PropertyMultipleValue,
    "TEXT": Text
};

var valueParameterMapping = {
    "BINARY": Binary,
    "BOOLEAN": Boolean,
    "CAL-ADDRESS": URI,
    "DATE": Date,
    "DATE-TIME": DateTime,
    "DURATION": Duration,
    "FLOAT": Float,
    "INTEGER": Integer,
    "PERIOD": PeriodOfTime,
    "RECUR": RecurrenceRule,
    "TEXT": Text,
    "TIME": Time,
    "URI": URI,
    "UTC-OFFSET": UTCOffset
};

function getValueParameter(propertyParameters) {
    if (!propertyParameters) {
        return;
    }

    for (var i = 0; i < propertyParameters.length; i++) {
        if (propertyParameters[i].name === "VALUE") {
            return propertyParameters[i];
        }
    }
}

function getValue(propertyName, propertyValue, propertyParameters) {
    var mapping = valueParameterMapping[(getValueParameter(propertyParameters) || {}).value] || valueMapping[propertyName] || valueMapping["DEFAULT"];
    var containsMultipleSeparator = propertyValue && (0, _util.splitSafe)(propertyValue, PropertyMultipleValue.__format.separator).length > 1;

    mapping = Array.isArray(mapping) ? mapping[0] : mapping;

    if (mapping.isMultiple === true && containsMultipleSeparator) {
        return new PropertyMultipleValue(propertyValue, mapping);
    }

    return new mapping(propertyValue);
}
