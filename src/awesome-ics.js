//     Awesome ICS v0.1.0
//     http://bandraszyk.github.io/awesome-ico/
//     (c) 2015 Bandro
//     Awesome ICS may be freely distributed under the MIT license.

import { Block as BlockType } from "./block";
import { Property as PropertyType } from "./property";
import { PropertyParameter as PropertyParameterType } from "./property-parameter";
import { PropertyValue as PropertyValueType, PropertyMultipleValue, Binary, Boolean, CalendarUserAddress, Date, DateTime, Duration,
         Float, Geo, Integer, PeriodOfTime, RecurrenceRule, Text, Time, URI, UTCOffset } from "./property-value";

// ### Class: Calendar
// > The `Calendar` class should be used as basic block for building iCalendar objects
export class Calendar extends BlockType {
    constructor() {
        super();
        this.type = "VCALENDAR";
    }
}

// ### Expose types
// > All types are visible outside so they can be used to compose Calendar object
export const Block = BlockType;
export const Property = PropertyType;
export const PropertyParameter = PropertyParameterType;
export const PropertyValue = {
    Value               : PropertyValueType,
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
};