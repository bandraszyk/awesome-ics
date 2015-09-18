//     Awesome ICS v0.1.0
//     http://bandraszyk.github.io/awesome-ico/
//     (c) 2015 Bandro
//     Awesome ICS may be freely distributed under the MIT license.

import { mapToJSON, mapToString, splitSafe, isEmptyString } from "./util";
import moment from "moment";

// ### Class: PropertyValue
// > Basic class for every property value used within the module. Defines API for every child class.
export class PropertyValue {
    // Initializes the instance with default values
    constructor() {
        this.clear();
    }
    // Clears the `PropertyValue` by setting default values
    clear() {
        this.value = null;
        return this;
    }
    // Converts `PropertyValue` to string
    toString() {
        return this.value && this.value.toString();
    }
    // Converts `PropertyValue` to JSON
    toJSON() {
        return this.value;
    }
    // Sets the value of `PropertyValue`
    setValue(value) {
        this.value = value;
        return this;
    }
    // Converts `PropertyValue` from string, e.g.: 'PropertyValue'
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        return this.setValue(string);
    }
}

// ### Class: PropertyMultipleValue
// > Defines a class that allow to have a value as an array of `PropertyValue` objects.
export class PropertyMultipleValue {
    constructor(mapping) {
        if (!mapping || typeof mapping !== "function" || !(new mapping() instanceof PropertyValue)) {
            throw new Error("[PropertyMultipleValue] [constructor()] The mapping must be an instance of `PropertyValue`");
        }

        this.mapping = mapping;
        this.clear();
    }
    clear() {
        this.value = [];
        return this;
    }
    toString() {
        return this.value.map(mapToString).join(PropertyMultipleValue.__format.separator);
    }
    toJSON() {
        return this.value.map(mapToJSON);
    }
    setValue(value) {
        if (!Array.isArray(value)) {
            throw new Error("[PropertyMultipleValue] [setValue()] The value must be an array");
        }

        this.value = value;
        return this;
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        this.value = splitSafe(string, PropertyMultipleValue.__format.separator)
            .map(function(singleContent) { return new this.mapping().convertFromString(singleContent); }, this);

        return this;
    }
}

// ### Static Members for: PropertyMultipleValue
PropertyMultipleValue.__format = {
    separator: ","
};


// ### Class: Binary
// > __TODO: Implement behaviour, remember to write tests__
export class Binary extends PropertyValue {}

// ### Class: Boolean
// > Requires `boolean` as value
export class Boolean extends PropertyValue {
    toString() {
        if (typeof this.value === "undefined" || this.value === null) { return ""; }

        return this.value.toString().toUpperCase();
    }
    setValue(value) {
        if (typeof value !== "boolean" && !(value instanceof Boolean)) {
            throw new Error("[Boolean] [setValue()] The value must be an instance of `Boolean`");
        }

        return super.setValue(value);
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return super.clear(); }

        try {
            this.value = JSON.parse(string.toLowerCase());
        }
        catch(error) {
            return this.clear();
        }

        return this;
    }
}

// ### Class: CalendarUserAddress
// > __TODO: Implement behaviour, remember to write tests__
export class CalendarUserAddress extends PropertyValue {}

// ### Class: Date
// > Requires `Moment` (from moment.js library) as value
export class Date extends PropertyValue {
    toString() {
        return this.value && this.value.format(Date.__format.date);
    }
    toJSON() {
        return this.value && this.value.format(Date.__format.date) || null;
    }
    setValue(value) {
        if (!moment.isMoment(value)) {
            throw new Error("[Date] [setValue()] The value must be an instance of `Moment`");
        }

        return super.setValue(value);
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return super.clear(); }

        this.value = moment.utc(string, Date.__format.date);

        return this;
    }
}

Date.__format = {
    date: "YYYYMMDD"
};

// ### Class: Date
// > Requires `Date` as value of date and `Time` as value of Time
export class DateTime extends PropertyValue {
    constructor(content) {
        super(content);
    }
    clear() {
        this.value = { date: null, time: null };
        return this;
    }
    toString() {
        if (!this.value || !this.value.date || !this.value.time) { return ""; }

        return `${this.value.date.toString()}${DateTime.__format.separator}${this.value.time.toString()}`;
    }
    toJSON() {
        return {
            date: this.value && this.value.date && this.value.date.toJSON() || null,
            time: this.value && this.value.time && this.value.time.toJSON() || null
        }
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        let parts = string.split(DateTime.__format.separator);

        this.value = {
            date: new Date().convertFromString(parts[0]),
            time: new Time().convertFromString(parts[1])
        };

        return this;
    }
    setValue(value) {
        if (typeof value !== "object") {
            throw new Error("[DateTime] [setValue()] The value must be an instance of `Object`");
        }

        super.setValue(value);

        if (value.date) { this.setDate(value.date); }
        if (value.time) { this.setTime(value.time); }

        return this;
    }
    setDate(date) {
        if (!(date instanceof Date)) {
            throw new Error("[DateTime] [setDate()] The date must be an instance of `Date`");
        }

        this.value.date = date;
        return this;
    }
    setTime(time) {
        if (!(time instanceof Time)) {
            throw new Error("[DateTime] [setTime()] The time must be an instance of `Time`");
        }

        this.value.time = time;
        return this;
    }
    setDateValue(date) {
        this.value.date = new Date().setValue(date);
        return this;
    }
    setTimeValue(time) {
        if (!this.value.time) { this.value.time = new Time(); }
        this.value.time.setTime(time);
        return this;
    }
    setIsFixedValue(isFixed) {
        if (!this.value.time) { this.value.time = new Time(); }
        this.value.time.setIsFixed(isFixed);
        return this;
    }
}

DateTime.__format = {
    separator: "T"
};

// > __TODO: Implement behaviour, remember to write tests__
export class Duration extends PropertyValue {}

// ### Class: Float
// > Requires `number` as value
export class Float extends PropertyValue {
    setValue(value) {
        if (typeof value !== "number" && !(value instanceof Number)) {
            throw new Error("[Float] [setValue()] The value must be an instance of `Number`");
        }

        return super.setValue(value);
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return super.clear(); }

        this.value = parseFloat(string);
        return this;
    }
}

// ### Class: Geo
// > Requires `Float` as longitude and latitude
export class Geo extends PropertyValue {
    clear() {
        this.value = { latitude: null, longitude: null };
        return this;
    }
    toString() {
        if (!this.value || !this.value.latitude || !this.value.latitude) { return ""; }

        return `${this.value.latitude.toString()}${Geo.__format.separator}${this.value.longitude.toString()}`;
    }
    toJSON() {
        return this.value && {
            latitude    : this.value && this.value.latitude && this.value.latitude.toJSON() || null,
            longitude   : this.value && this.value.longitude && this.value.longitude.toJSON() || null
        }
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        let coordinates = string.split(Geo.__format.separator);

        this.value = {
            latitude    : new Float().convertFromString(coordinates[0]),
            longitude   : new Float().convertFromString(coordinates[1])
        };

        return this;
    }
    setValue(value) {
        if (typeof value !== "object") {
            throw new Error("[Geo] [setValue()] The value must be an instance of `Object`");
        }

        super.setValue(value);

        if (value.latitude) { this.setLatitude(value.latitude); }
        if (value.longitude) { this.setLatitude(value.longitude); }

        return this;
    }
    setLatitude(latitude) {
        if (!(latitude instanceof Float)) {
            throw new Error("[Geo] [setLatitude()] The latitude must be an instance of `Float`");
        }

        this.value.latitude = latitude;
        return this;
    }
    setLongitude(longitude) {
        if (!(longitude instanceof Float)) {
            throw new Error("[Geo] [setLongitude()] The longitude must be an instance of `Float`");
        }

        this.value.longitude = longitude;
        return this;
    }
    setLatitudeValue(latitude) {
        this.value.latitude = new Float().setValue(latitude);
        return this;
    }
    setLongitudeValue(longitude) {
        this.value.longitude = new Float().setValue(longitude);
        return this;
    }
}

Geo.__format = {
    separator: ";"
};

// ### Class: Integer
// > Requires `number` as value
export class Integer extends PropertyValue {
    setValue(value) {
        if (typeof value !== "number" && !(value instanceof Number)) {
            throw new Error("[Integer] [setValue()] The value must be an instance of `Number`");
        }

        return super.setValue(value);
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return super.clear(); }

        this.value = parseInt(string);
        return this;
    }
}

// ### Class: PeriodOfTime
// > __TODO: Implement behaviour, remember to write tests__
export class PeriodOfTime extends PropertyValue {}

// ### Class: RecurrenceRule
// > __TODO: Implement behaviour, remember to write tests__
export class RecurrenceRule extends PropertyValue {}

// ### Class: Text
// > Requires `string` as value
export class Text extends PropertyValue {
    setValue(value) {
        if (typeof value !== "string" && !(value instanceof String)) {
            throw new Error("[Integer] [setValue()] The value must be an instance of `Number`");
        }

        return super.setValue(value);
    }
}

// ### Class: Time
// > Requires `Moment` (from moment.js library) as value of time and `boolean` as value of isFixed.
// > `isFixed` set to `true` means that time is same regardless of time-zone
export class Time extends PropertyValue {
    clear() {
        this.value = { time: null, isFixed: null };
        return this;
    }
    toString() {
        if (!this.value || !this.value.time) { return ""; }

        return `${this.value.time.format(Time.__format.time)}${!this.value.isFixed ? Time.__format.timeUTC : ""}`;
    }
    toJSON() {
        if (!this.value) { return { isFixed: null, time: null }; }

        return {
            isFixed : this.value.isFixed,
            time    : this.value.time && this.value.time.format(Time.__format.time) || null
        }
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        this.value = {
            time    : moment(string.slice(0, 6), Time.__format.time),
            isFixed : string.slice(-1) !== Time.__format.timeUTC
        };

        return this;
    }
    setValue(value) {
        if (typeof value !== 'object') {
            throw new Error("[Time] [setValue()] The value must be an instance of `Object`");
        }

        // - __TODO: object should be cloned to not modify passed one__
        super.setValue(value);

        if (value.time) { this.setTime(value.time); }
        if (value.isFixed) { this.setIsFixed(value.isFixed); }

        return this;
    }
    setTime(time) {
        if (!moment.isMoment(time)) {
            throw new Error("[Time] [setTime()] The time must be an instance of `Moment`");
        }

        this.value.time = time;
        return this;
    }
    setIsFixed(isFixed) {
        if (typeof isFixed !== "boolean" && !(isFixed instanceof Boolean)) {
            throw new Error("[Time] [setIsFixed()] The isFixed must be an instance of `Boolean`");
        }

        this.value.isFixed = isFixed;
        return this;
    }
}

Time.__format = {
    time    : "HHmmSS",
    timeUTC : "Z"
};

// ### Class: URI
// > __TODO: Implement behaviour, remember to write tests__
export class URI extends PropertyValue {}

// ### Class: UTCOffset
// > Requires `Moment` (from moment.js value) as value
export class UTCOffset extends PropertyValue {
    toString() {
        return this.value && this.value.format(UTCOffset.__format.offset);
    }
    toJSON() {
        return this.value && this.value.format(UTCOffset.__format.date) || null;
    }
    setValue(value) {
        if (!moment.isMoment(value)) {
            throw new Error("[Date] [setValue()] The value must be an instance of `Moment`");
        }

        return super.setValue(value);
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return super.clear(); }

        this.value = moment().utcOffset(string);
        return this;
    }
}

UTCOffset.__format = {
    offset: "ZZ"
};

// ### Static members for: PropertyValues
// > Defines `PropertyValue` that can be used as mapping for `PropertyMultipleValue`.
Date.isMultiple         = true;
DateTime.isMultiple     = true;
Duration.isMultiple     = true;
Float.isMultiple        = true;
Integer.isMultiple      = true;
PeriodOfTime.isMultiple = true;
Time.isMultiple         = true;
Text.isMultiple         = false;

// ### Define: Value Mapping
// > Defines mapping from value of `Property`'s name to `PropertyValue` class
const valueMapping = {
    "CALSCALE"          : Text,
    "METHOD"            : Text,
    "PRODID"            : Text,
    "VERSION"           : Text,
    "ATTACH"            : [ URI, Binary ],
    "CATEGORIES"        : Text,
    "CLASS"             : Text,
    "COMMENT"           : Text,
    "DESCRIPTION"       : Text,
    "GEO"               : Geo,
    "LOCATION"          : Text,
    "PERCENT-COMPLETE"  : Integer,
    "PRIORITY"          : Integer,
    "RESOURCES"         : Text,
    "STATUS"            : Text,
    "SUMMARY"           : Text,
    "COMPLETED"         : DateTime,
    "DTEND"             : [ DateTime, Date ],
    "DUE"               : [ DateTime, Date ],
    "DTSTART"           : [ DateTime, Date ],
    "DURATION"          : Duration,
    "FREEBUSY"          : PeriodOfTime,
    "TRANSP"            : Text,
    "TZID"              : Text,
    "TZNAME"            : Text,
    "TZOFFSETFROM"      : UTCOffset,
    "TZOFFSETTO"        : UTCOffset,
    "TZURL"             : URI,
    "ATTENDEE"          : CalendarUserAddress,
    "CONTACT"           : Text,
    "ORGANIZER"         : CalendarUserAddress,
    "RECURRENCE-ID"     : [ DateTime, Date ],
    "RELATED-TO"        : Text,
    "URL"               : URI,
    "UID"               : Text,
    "EXDATE"            : [ DateTime, Date ],
    "RDATE"             : [ DateTime, Date, PeriodOfTime ],
    "RRULE"             : RecurrenceRule,
    "ACTION"            : Text,
    "REPEAT"            : Integer,
    "TRIGGER"           : [ Duration, DateTime ],
    "CREATED"           : DateTime,
    "DTSTAMP"           : DateTime,
    "LAST-MODIFIED"     : DateTime,
    "SEQUENCE"          : Integer,
    "REQUEST-STATUS"    : Text,
    "DEFAULT"           : Text
};

// ### Define: Property Parameter Mapping
// > Defines mapping from value of `PropertyParameter` named `VALUE` to `PropertyValue` class
const valuePropertyParameterMapping = {
    "BINARY"            : Binary,
    "BOOLEAN"           : Boolean,
    "CAL-ADDRESS"       : URI,
    "DATE"              : Date,
    "DATE-TIME"         : DateTime,
    "DURATION"          : Duration,
    "FLOAT"             : Float,
    "INTEGER"           : Integer,
    "PERIOD"            : PeriodOfTime,
    "RECUR"             : RecurrenceRule,
    "TEXT"              : Text,
    "TIME"              : Time,
    "URI"               : URI,
    "UTC-OFFSET"        : UTCOffset
};

// ### Function: getValueParameter
// > Tries to find the name of `PropertyParameter` named `VALUE` that contains information about the type of `Property`.
function getValueParameter(propertyParameters) {
    if (!propertyParameters || !propertyParameters.length) { return; }

    for (let i = 0; i < propertyParameters.length; i++) {
        if (propertyParameters[i].name === "VALUE") {
            return propertyParameters[i];
        }
    }
}

// ### Function: getValue
// > Returns an instance of `PropertyValue` or `PropertyMultipleValue` depending on specified parameters.
// > The particular type of object is specified by `PropertyParameter` named 'VALUE' or will be mapped from `propertyName`.
export function getValue(propertyName, propertyValue, propertyParameters) {
    let mapping = valuePropertyParameterMapping[(getValueParameter(propertyParameters) || {}).value]
        || valueMapping[propertyName]
        || valueMapping["DEFAULT"];
    let containsMultipleSeparator = propertyValue && splitSafe(propertyValue, (PropertyMultipleValue.__format.separator)).length > 1;

    mapping = Array.isArray(mapping) ? mapping[0] : mapping;

    if (mapping.isMultiple === true && containsMultipleSeparator) {
        return new PropertyMultipleValue(mapping).convertFromString(propertyValue);
    }

    return new mapping().convertFromString(propertyValue);
}