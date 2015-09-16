import { Block as BlockType } from "./block";
import { Property as PropertyType } from "./property";
import { PropertyParameter as PropertyParameterType } from "./property-parameter";

import { PropertyValue as PropertyValueType, PropertyMultipleValue, Binary, Boolean, CalendarUserAddress, Date, DateTime, Duration,
         Float, Geo, Integer, PeriodOfTime, RecurrenceRule, Text, Time, URI, UTCOffset } from "./property-value";

//-- Definition of calendar
export class Calendar extends BlockType {
    constructor() {
        super();
        this.type = "CALENDAR";
    }
}

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