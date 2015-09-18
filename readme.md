[Awesome ICS v0.1.0](http://bandraszyk.github.io/awesome-ics/)
==============


The library is designed for developers who want to support iCalendar functionality directly in their nodejs code.

###Code

The code is written in ES6 and then transformed to ES5 with the use of [Babel](https://babeljs.io/).

The object were designed according to [rfc5545](http://tools.ietf.org/html/rfc5545) standard specification.

###Tests

The library is covered by 181 jasmine specs splited in 15 suites. Tests are using destination files in ES5.

Usage
-----------------

Installation:

```
npm install --safe awesome-ics
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

First basic method allows to return calendar as string that could be saved to a file and share with others, e.g. by email.

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

Second basic method allows to return calendar as JSON that could give better overview about the structure.

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

After sharing the file could be simply added to calendar:

![alt Awesome ICS Event in Calendar](http://bandraszyk.github.io/awesome-ics/event.png)

### Read Calendar form file

```
var AwesomeICS  = require("awesome-ics");
var fs          = require("fs");

var icsFile  = fs.readFileSync("./ics/my-file.ics", "utf8").trim();
var calendar = new AwesomeICS.Calendar().convertFromString(icsFile);

```

As in prevoius example there is a possibility to convert to string of JSON object.

Details
-----------------



For more specific details please see Annotated source section.

Annotated source
-----------------
[src/awesome-ics.js](http://bandraszyk.github.io/awesome-rating/docs/awesome-ics.html)
[src/block.js](http://bandraszyk.github.io/awesome-rating/docs/block.html)
[src/property.js](http://bandraszyk.github.io/awesome-rating/docs/property.html)
[src/property-parameter.js](http://bandraszyk.github.io/awesome-rating/docs/property-parameter.html)
[src/property-value.js](http://bandraszyk.github.io/awesome-rating/docs/property-value.html)
[src/util.js](http://bandraszyk.github.io/awesome-rating/docs/util.html)

