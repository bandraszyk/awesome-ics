[Awesome ICS v0.1.2](http://bandraszyk.github.io/awesome-ics/)
==============


The library is designed for developers who want to support iCalendar functionality directly in their nodejs code. The code is written in ES6 and then transformed to ES5 with the use of [Babel](https://babeljs.io/). The objects were designed according to [rfc5545](http://tools.ietf.org/html/rfc5545) standard specification.

The library is covered by 181 jasmine specs splitted in 15 suites. Tests are using destination files written in ES5.

Usage
-----------------

Installation:

```
npm install --save awesome-ics
```

### Create Calendar

```
var AwesomeICS  = require("awesome-ics");
var moment      = require("moment");

var summary     = new AwesomeICS.PropertyValue.Text().setValue("Christmas Eve");
var description = new AwesomeICS.PropertyValue.Text().setValue("Please, remember about Christmas Eve");
var dateStart   = new AwesomeICS.PropertyValue.DateTime().setDateValue(moment("2015-12-24"))
                    .setTimeValue(moment("18:00", "HH:mm"))
                    .setIsFixedValue(true);
var dateEnd     = new AwesomeICS.PropertyValue.DateTime().setDateValue(moment("2015-12-26"))
                    .setTimeValue(moment("23:59", "HH:mm"))
                    .setIsFixedValue(true);


var calendar = new AwesomeICS.Calendar()
    .addBlock(
        new AwesomeICS.Block()
            .setType("VEVENT")
            .addProperty(new AwesomeICS.Property().setName("DESCRIPTION").setValue(description))
            .addProperty(new AwesomeICS.Property().setName("DTSTART").setValue(dateStart))
            .addProperty(new AwesomeICS.Property().setName("DTEND").setValue(dateEnd))
            .addProperty(new AwesomeICS.Property().setName("SUMMARY").setValue(summary)));
```

First basic method allows to return calendar as string that could be saved to a file and shared with people, e.g. by email.

```
calandar.toString();
/*
BEGIN:VCALENDAR
BEGIN:VEVENT
DESCRIPTION:Please, remember about Christmas Eve
DTSTART:20151224T180000
DTEND:20151226T235900
SUMMARY:Christmas Eve
END:VEVENT
END:VCALENDAR
*/
```

Second basic method allows to return calendar as JSON that gives better overview about the structure.

```
calandar.toJSON();
/*
{
    "type": "VCALENDAR",
    "properties": [],
    "blocks": [
        {
            "type": "VEVENT",
            "properties": [
                {
                    "name": "DESCRIPTION",
                    "parameters": [],
                    "value": "Please, remember about Christmas Eve"
                },
                {
                    "name": "DTSTART",
                    "parameters": [],
                    "value": {
                        "date": "20151224",
                        "time": {
                            "isFixed": true,
                            "time": "180000"
                        }
                    }
                },
                {
                    "name": "DTEND",
                    "parameters": [],
                    "value": {
                        "date": "20151226",
                        "time": {
                            "isFixed": true,
                            "time": "235900"
                        }
                    }
                },
                {
                    "name": "SUMMARY",
                    "parameters": [],
                    "value": "Christmas Eve"
                }
            ],
            "blocks": []
        }
    ]
}
*/
```

The final file (saved in string format) could be simply added to calendar:

![alt Awesome ICS Event in Calendar](http://bandraszyk.github.io/awesome-ics/event.png)

### Read Calendar form file

```
var AwesomeICS  = require("awesome-ics");
var fs          = require("fs");

var icsFile  = fs.readFileSync("./ics/my-file.ics", "utf8").trim();
var calendar = new AwesomeICS.Calendar().convertFromString(icsFile);
```

As in previous example there is a possibility to convert such object to string or JSON.

Details
-----------------

### Library Content

```
var AwesomeICS  = require("awesome-ics");
/*
AwesomeICS.Calendar
AwesomeICS.Block
AwesomeICS.Property
AwesomeICS.PropertyParameter
AwesomeICS.PropertyValue.Value
AwesomeICS.PropertyValue.MultipleValue
AwesomeICS.PropertyValue.Binary
AwesomeICS.PropertyValue.Boolean
AwesomeICS.PropertyValue.CalendarUserAddress
AwesomeICS.PropertyValue.Date
AwesomeICS.PropertyValue.DateTime
AwesomeICS.PropertyValue.Duration
AwesomeICS.PropertyValue.Float
AwesomeICS.PropertyValue.Geo
AwesomeICS.PropertyValue.Integer
AwesomeICS.PropertyValue.PeriodOfTime
AwesomeICS.PropertyValue.RecurrenceRule
AwesomeICS.PropertyValue.Text
AwesomeICS.PropertyValue.Time
AwesomeICS.PropertyValue.URI
AwesomeICS.PropertyValue.UTCOffset
*/
```

### Calendar

Calendar is a basic object that you should start from. Behind the scene it's just a `Block` object with `type` set to `VCALENDAR`.

### Block

This element is used to define structure of calendar, can be treated as basic container. The `Block`'s interface is as follows:

```
Block
--- properties [Array of Property]
--- blocks [Array of Block]
--- type [string]
--- clear() [method]
--- toString() [method]
--- toJSON() [method]
--- convertFromString(string) [method]
--- addBlock(block) [method]
--- addProperty(property) [method]
--- setType(type) [method]
```

### Property

This element needs to be attached to `Block`. It defines single attribute with `name` and `value`. The `Property`'s interface is as follows:

```
Property
--- parameters [Array of PropertyParameter]
--- blocks [Array of Block]
--- name [string]
--- value [PropertyValue or PropertyMultipleValue]
--- clear() [method]
--- toString() [method]
--- toJSON() [method]
--- convertFromString(string) [method]
--- addParameter(parameter) [method]
--- setName(property) [method]
--- setValue(value) [method]

```

### PropertyParameter

This element needs to be attached to `Property` as one of `parameters`. It defines special options for `Parameter` like encoding, value type, etc. The `PropertyParameter`'s interface is as follows:

```
PropertyParameter
--- name [string]
--- value [object]
--- clear() [method]
--- toString() [method]
--- toJSON() [method]
--- convertFromString(string) [method]
--- setName(name) [method]
--- setValue(value) [method]
```

### PropertyValue

This  element needs to be attached to `Property` as `value`. The `PropertyValue`'s interface is as follows:

```
PropertyValue
--- value [string]
--- clear() [method]
--- toString() [method]
--- toJSON() [method]
--- convertFromString(string) [method]
--- setValue(value) [method]
--- ... other methods depend on particular type
```

The library includes the following specific `PropertyValues` types implementation: `Binary`, `Boolean`, `CalendarUserAddress`, `Date`, `DateTime`, `Duration`, `PropertyValue.Float`, `Geo`, `PropertyValue.Integer`, `PeriodOfTime`, `RecurrenceRule`, `Text`, `Time`, `URI`, `UTCOffset`.

### PropertyMultipleValue

This  element needs to be attached to `Property` as `value`. It contains an array of `PropertyValue`s as value so more than one value of given type can be specified as `Property`'s value.  The `PropertyMultipleValue`'s interface is as follows:

```
PropertyMultipleValue
--- value [string]
--- clear() [method]
--- toString() [method]
--- toJSON() [method]
--- convertFromString(string) [method]
--- setValue(value) [method]
```

Only several types support multiple values: `Date`, `DateTime`, `Duration`, `Float`, `Integer`, `PeriodOfTime`, `Time`

### Other

Every method returns __current instance__ of the object so operations can be __chained__, except of `toString` and `toJSON` that return `string` and `JSON` accordingly. It's recommended to use implemented methods instead or operating directly on class's members because they contain type validation.

For more specific details please see __Annotated source__ section, especially for `src/property-value` that contains description of every single `PropertyValue` child class.

Annotated source
-----------------

- [src/awesome-ics.js](http://bandraszyk.github.io/awesome-rating/docs/awesome-ics.html)
- [src/block.js](http://bandraszyk.github.io/awesome-rating/docs/block.html)
- [src/property.js](http://bandraszyk.github.io/awesome-rating/docs/property.html)
- [src/property-parameter.js](http://bandraszyk.github.io/awesome-rating/docs/property-parameter.html)
- [src/property-value.js](http://bandraszyk.github.io/awesome-rating/docs/property-value.html)
- [src/util.js](http://bandraszyk.github.io/awesome-rating/docs/util.html)

