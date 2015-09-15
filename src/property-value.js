import { mapToJSON, mapToString, splitSafe } from "./util";
import moment from "moment";

export class PropertyValue {
    constructor(content) {
        this.original = content;
        this.value = this.emptyValue();

        if (content) { this.setValueFromString(content); }
    }
    emptyValue() {
        return null;
    }
    toString() {
        return this.value && this.value.toString();
    }
    toJSON() {
        return this.value;
    }
    setValue(value) {
        this.value = value || null;
        return this;
    }
    setValueFromString(string) {
        return this.setValue(string);
    }
}

export class PropertyMultipleValue {
    constructor(content, mapping) {
        this.original = content;
        this.value = this.emptyValue();

        if (content) { this.setValueFromString(content, mapping); }
    }
    emptyValue() {
        return [];
    }
    toString() {
        return this.value.map(mapToString).join(PropertyMultipleValue.__format.separator);
    }
    toJSON() {
        return this.value.map(mapToJSON);
    }
    setValue(value) {
        this.value = values || [];
        return this;
    }
    setValueFromString(string, mapping) {
        this.value = splitSafe(string, PropertyMultipleValue.__format.separator).map(function(singleContent) { return new mapping(singleContent); });
        return this;
    }
}

PropertyMultipleValue.__format = {
    separator: ","
};

export class Binary extends PropertyValue {
    // TODO: Implement behaviour, remember to write tests
}

export class Boolean extends PropertyValue {
    toString() {
        return this.value && this.value.toString().toUpperCase();
    }
    setValueFromString(string) {
        try {
            this.value = JSON.parse(string.toLowerCase());
        }
        catch(error) {
            this.value = this.emptyValue();
        }

        return this;
    }
}

export class CalendarUserAddress extends PropertyValue {
    // TODO: Implement behaviour, remember to write tests
}

export class Date extends PropertyValue {
    toString() {
        return this.value && this.value.format(Date.__format.date);
    }
    setValueFromString(string) {
        this.value = moment.utc(string, Date.__format.date);
        return this;
    }
}

Date.__format = {
    date: "YYYYMMDD"
};

export class DateTime extends PropertyValue {
    constructor(content) {
        super(content);
    }
    emptyValue() {
        return { date: null, time: null };
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
    setValueFromString(string) {
        let parts = string.split(DateTime.__format.separator);

        this.value = {
            date: new Date(parts[0]),
            time: new Time(parts[1])
        };

        return this;
    }
}

DateTime.__format = {
    separator: "T"
};

export class Duration extends PropertyValue {
    // TODO: Implement behaviour, remember to write tests
}

export class Float extends PropertyValue {
    setValueFromString(string) {
        this.value = parseFloat(string);
        return this;
    }
}

export class Geo extends PropertyValue {
    emptyValue() {
        return { latitude: null, longitude: null };
    }
    toString() {
        if (!this.value || !this.value.latitude || !this.value.latitude) { return ""; }

        return `${this.value.latitude}${Geo.__format.separator}${this.value.longitude}`;
    }
    toJSON() {
        return this.value && {
            latitude    : this.value && this.value.latitude && this.value.latitude.toJSON() || null,
            longitude   : this.value && this.value.longitude && this.value.longitude.toJSON() || null
        }
    }
    setValueFromString(string) {
        let coordinates = string.split(Geo.__format.separator);

        this.value = {
            latitude    : new Float(coordinates[0]),
            longitude   : new Float(coordinates[1])
        };

        return this;
    }
}

Geo.__format = {
    separator: ";"
};

export class Integer extends PropertyValue {
    setValueFromString(string) {
        this.value = parseInt(string);
        return this;
    }
}

export class PeriodOfTime extends PropertyValue {
    // TODO: Implement behaviour, remember to write tests
}

export class RecurrenceRule extends PropertyValue {
    // TODO: Implement behaviour, remember to write tests
}

export class Text extends PropertyValue {}

export class Time extends PropertyValue {
    emptyValue() {
        return { time: null, isFixed: null };
    }
    toString() {
        if (!this.value || !this.value.time) { return ""; }

        return this.value.time.format(Time.__format.time) + (!this.value.isFixed && Time.__format.timeUTC || "");
    }
    setValueFromString(string) {
        this.value = {
            time    : moment(string.slice(0, 6), Time.__format.time),
            isFixed : string.slice(-1) !== Time.__format.timeUTC
        };

        return this;
    }
}

Time.__format = {
    time    : "HHmmSS",
    timeUTC : "Z"
};

export class URI extends PropertyValue {
    // TODO: Implement behaviour, remember to write tests
}

export class UTCOffset extends PropertyValue {
    toString() {
        return this.value && this.value.format(UTCOffset.__format.offset);
    }
    setValueFromString(string) {
        this.value = moment().utcOffset(string);
        return this;
    }
}

UTCOffset.__format = {
    offset: "ZZ"
};

//-- Define multiple values
Date.isMultiple         = true;
DateTime.isMultiple     = true;
Duration.isMultiple     = true;
Float.isMultiple        = true;
Integer.isMultiple      = true;
PeriodOfTime.isMultiple = true;
Time.isMultiple         = true;
Text.isMultiple         = false;

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

const valueMultipleMapping = {
    "DATE"              : PropertyMultipleValue,
    "DATE-TIME"         : PropertyMultipleValue,
    "DURATION"          : PropertyMultipleValue,
    "FLOAT"             : PropertyMultipleValue,
    "INTEGER"           : PropertyMultipleValue,
    "PERIOD"            : PropertyMultipleValue,
    "TIME"              : PropertyMultipleValue,
    "TEXT"              : Text
};

const valueParameterMapping = {
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

function getValueParameter(propertyParameters) {
    if (!propertyParameters) { return; }

    for (let i = 0; i < propertyParameters.length; i++) {
        if (propertyParameters[i].name === "VALUE") {
            return propertyParameters[i];
        }
    }
}

export function getValue(propertyName, propertyValue, propertyParameters) {
    let mapping = valueParameterMapping[(getValueParameter(propertyParameters) || {}).value]
        || valueMapping[propertyName]
        || valueMapping["DEFAULT"];
    let containsMultipleSeparator = propertyValue && splitSafe(propertyValue, (PropertyMultipleValue.__format.separator)).length > 1;

    mapping = Array.isArray(mapping) ? mapping[0] : mapping;

    if (mapping.isMultiple === true && containsMultipleSeparator) {
        return new PropertyMultipleValue(propertyValue, mapping);
    }

    return new mapping(propertyValue);
}