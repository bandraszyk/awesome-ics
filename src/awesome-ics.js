import { Block } from "./block";
import { Property } from "./property";
import { PropertyParameter } from "./property-parameter";

import { Value, MultipleValue, Binary, Boolean, CalendarUserAddress, Date, DateTime, Duration,
         Float, Geo, Integer, PeriodOfTime, RecurrenceRule, Text, Time, URI, UTCOffset } from "./property-value";

//-- Definition of calendar
export class Calendar extends Block {
    constructor(content) {
        super(content);
    }
}

export const Elements = {
    Block               : Block,
    Property            : Property,
    PropertyParameter   : PropertyParameter,
    PropertyValue       : {
        Value               : Value,
        MultipleValue       : MultipleValue,
        Binary              : Binary,
        Boolean             : Boolean,
        CalendarUserAddress : CalendarUserAddress,
        Date                : Date,
        DateTime            : DateTime,
        Duration            : Duration,
        Float               : Float,
        Geo                 : Geo,
        Integer             : Integer,
        PeriodOfTime        : PeriodOfTime,
        RecurrenceRule      : RecurrenceRule,
        Text                : Text,
        Time                : Time,
        URI                 : URI,
        UTCOffset           : UTCOffset
    }
};