import { Block } from "./block";
import { Property } from "./property";
import { PropertyParameter } from "./property-parameter";

import { PropertyValue, PropertyMultipleValue, Binary, Boolean, CalendarUserAddress, Date, DateTime, Duration,
         Float, Geo, Integer, PeriodOfTime, RecurrenceRule, Text, Time, URI, UTCOffset } from "./property-value";

//-- Definition of calendar
export class Calendar extends Block { }

export const Elements = {
    Block               : Block,
    Property            : Property,
    PropertyParameter   : PropertyParameter,
    PropertyValue       : {
        Value               : PropertyValue,
        MultipleValue       : PropertyMultipleValue,
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