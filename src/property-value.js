import { format } from "./constants";
import { mapToJSON, mapToString, splitSafe } from "./util";
import moment from "moment";

export class Value {
    constructor(content) {
        this.original   = content;
        this.value      = content;
    }
    toString() {
        return this.value.toString();
    }
    toJSON() {
        return this.value;
    }
}

export class MultipleValue {
    constructor(content, mapping) {
        this.values = [] = splitSafe(content, format.separatorMulti).map(function(singleContent) { return new mapping(singleContent); });
    }
    toString() {
        return this.values.map(mapToString).join(format.separatorMulti);
    }
    toJSON() {
        return this.values;
    }
}

export class Binary extends Value {
    constructor(content) {
        super(content);
    }
}

export class Boolean extends Value {
    constructor(content) {
        super(content);
    }
}

export class CalendarUserAddress extends Value {
    constructor(content) {
        super(content);
    }
}

export class Date extends Value {
    constructor(content) {
        super(content);
        this.value = moment.utc(content, format.values.date);
    }
    toString() {
        return this.value.format(format.values.date);
    }
}

export class DateTime extends Value {
    constructor(content) {
        super(content);
    }
}

export class Duration extends Value {
    constructor(content) {
        super(content);
    }
}

export class Float extends Value {
    constructor(content) {
        super(content);
    }
}

export class Geo extends Value {
    constructor(content) {
        super(content);

        let coordinates = content.split(format.separatorGeo);

        this.value = {
            latitude    : parseFloat(coordinates[0]),
            longitude   : parseFloat(coordinates[1])
        };
    }
    toString() {
        return this.value.latitude.toString() + format.separatorGeo + this.value.longitude.toString();
    }
}

export class Integer extends Value {
    constructor(content) {
        super(content);
    }
}

export class PeriodOfTime extends Value {
    constructor(content) {
        super(content);
    }
}

export class RecurrenceRule extends Value {
    constructor(content) {
        super(content);
    }
}

export class Text extends Value {
    constructor(content) {
        super(content);
    }
}

export class Time extends Value {
    constructor(content) {
        super(content);
    }
}

export class URI extends Value {
    constructor(content) {
        super(content);
    }
}

export class UTCOffset extends Value {
    constructor(content) {
        super(content);
    }
}

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
    "DATE"              : MultipleValue,
    "DATE-TIME"         : MultipleValue,
    "DURATION"          : MultipleValue,
    "FLOAT"             : MultipleValue,
    "INTEGER"           : MultipleValue,
    "PERIOD"            : MultipleValue,
    "TIME"              : MultipleValue,
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
    let containsMultipleSeparator = propertyValue && splitSafe(propertyValue, (format.separatorMulti)).length > 1;

    mapping = Array.isArray(mapping) ? mapping[0] : mapping;

    if (mapping.isMultiple === true && containsMultipleSeparator) {
        return new MultipleValue(propertyValue, mapping);
    }

    return new mapping(propertyValue);
}