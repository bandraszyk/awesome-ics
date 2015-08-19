import { format } from "./constants";

class Value {
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

class Binary extends Value {
    constructor(content) {
        super(content);
    }
}

class Boolean extends Value {
    constructor(content) {
        super(content);
    }
}

class CalendarUserAddress extends Value {
    constructor(content) {
        super(content);
    }
}

class Date extends Value {
    constructor(content) {
        super(content);
    }
}

export class DateTime extends Value {
    constructor(content) {
        super(content);
    }
}

class Duration extends Value {
    constructor(content) {
        super(content);
    }
}

export class Float extends Value {
    constructor(content) {
        super(content);
    }
}

// TWO floats separated by ,
class Geo extends Value {
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

class Integer extends Value {
    constructor(content) {
        super(content);
    }
}

class PeriodOfTime extends Value {
    constructor(content) {
        super(content);
    }
}

class RecurrenceRule extends Value {
    constructor(content) {
        super(content);
    }
}

class Text extends Value {
    constructor(content) {
        super(content);
    }
} // 75 characters per line.

class Time extends Value {
    constructor(content) {
        super(content);
    }
}

class URI extends Value {
    constructor(content) {
        super(content);
    }
}

class UTCOffset extends Value {
    constructor(content) {
        super(content);
    }
}

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

export function getValue(propertyName, propertyParameters, propertyValue) {
    var mapping = valueMapping[propertyName] || valueMapping["DEFAULT"];

    if (Array.isArray(mapping)) {
        // TODO: map with the use of params
        mapping = mapping[0];
    }

    return new mapping(propertyValue);
}