import { mapToJSON, mapToString, splitSafe } from "./util";
import moment from "moment";

export class PropertyValue {
    constructor(content) {
        this.original   = content;
        this.value      = content || null;
    }
    toString() {
        return this.value && this.value.toString();
    }
    toJSON() {
        return this.value;
    }
}

export class PropertyMultipleValue {
    constructor(content, mapping) {
        this.original = content;
        this.values = [];

        if (!content) { return; }

        this.values = splitSafe(content, PropertyMultipleValue.__format.separator).map(function(singleContent) { return new mapping(singleContent); });
    }
    toString() {
        return this.values.map(mapToString).join(PropertyMultipleValue.__format.separator);
    }
    toJSON() {
        return this.values.map(mapToJSON);
    }
}

PropertyMultipleValue.__format = {
    separator: ","
};

export class Binary extends PropertyValue {
    constructor(content) {
        super(content);
        // TODO: Implement behaviour, remember to write tests
    }
}

export class Boolean extends PropertyValue {
    constructor(content) {
        super(content);

        if (!content) { return; }

        try {
            this.value = JSON.parse(content.toLowerCase());
        }
        catch(error) {
            this.value = null;
        }
    }
    toString() {
        return this.value && this.value.toString().toUpperCase();
    }
}

export class CalendarUserAddress extends PropertyValue {
    constructor(content) {
        super(content);
        // TODO: Implement behaviour, remember to write tests
    }
}

export class Date extends PropertyValue {
    constructor(content) {
        super(content);

        if (!content) { return; }

        this.value = moment.utc(content, Date.__format.date);
    }
    toString() {
        return this.value && this.value.format(Date.__format.date);
    }
}

Date.__format = {
    date: "YYYYMMDD"
};

export class DateTime extends PropertyValue {
    constructor(content) {
        super(content);
        this.value = { date: null, time: null };

        if (!content) { return; }

        let parts = content.split(DateTime.__format.separator);

        this.value = {
            date: new Date(parts[0]),
            time: new Time(parts[1])
        };
    }
    toString() {
        return this.value.date.toString() + DateTime.__format.separator + this.value.time.toString();
    }
    toJSON() {
        return {
            date: this.value.date.toJSON(),
            time: this.value.time.toJSON()
        }
    }
}

DateTime.__format = {
    separator: "T"
};

export class Duration extends PropertyValue {
    constructor(content) {
        super(content);
        // TODO: Implement behaviour, remember to write tests
    }
}

export class Float extends PropertyValue {
    constructor(content) {
        super(content);

        if (!content) { return; }

        this.value = parseFloat(content);
    }
}

export class Geo extends PropertyValue {
    constructor(content) {
        super(content);
        this.value = { latitude: null, longitude: null };

        if (!content) { return; }

        let coordinates = content.split(Geo.__format.separator);

        this.value = {
            latitude    : new Float(coordinates[0]),
            longitude   : new Float(coordinates[1])
        };
    }
    toString() {
        if (!this.value || !this.value.latitude || !this.value.latitude) { return ""; }

        return `${this.value.latitude}${Geo.__format.separator}${this.value.longitude}`;
    }
    toJSON() {
        return this.value && {
            latitude    : this.value.latitude && this.value.latitude.toJSON(),
            longitude   : this.value.longitude && this.value.longitude.toJSON()
        }
    }
}

Geo.__format = {
    separator: ";"
};

export class Integer extends PropertyValue {
    constructor(content) {
        super(content);

        if (!content) { return; }

        this.value = parseInt(content);
    }
}

export class PeriodOfTime extends PropertyValue {
    constructor(content) {
        super(content);
        // TODO: Implement behaviour, remember to write tests
    }
}

export class RecurrenceRule extends PropertyValue {
    constructor(content) {
        super(content);
        // TODO: Implement behaviour, remember to write tests
    }
}

export class Text extends PropertyValue {
    constructor(content) {
        super(content);
    }
}

export class Time extends PropertyValue {
    constructor(content) {
        super(content);

        this.value = { time: null, isFixed: null };

        if (!content) { return; }

        this.value = {
            time    : moment(content.slice(0, 6), Time.__format.time),
            isFixed : content.slice(-1) !== Time.__format.timeUTC
        };
    }
    toString() {
        return this.value.time.format(Time.__format.time) + (!this.value.isFixed && Time.__format.timeUTC || "");
    }
}

Time.__format = {
    time    : "HHmmSS",
    timeUTC : "Z"
};

export class URI extends PropertyValue {
    constructor(content) {
        super(content);
        // TODO: Implement behaviour, remember to write tests
    }
}

export class UTCOffset extends PropertyValue {
    constructor(content) {
        super(content);

        if (!content) { return; }

        this.value = moment().utcOffset(content);
    }
    toString() {
        return this.value && this.value.format(UTCOffset.__format.offset);
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