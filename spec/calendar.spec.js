var AwesomeICS	= require("../dist/awesome-ics");
var fs			= require("fs");
var moment      = require("moment");
var diff        = require("diff");

describe("Calendar", function() {
    it("should have type 'CALENDAR'", function() {
        //-- Arrange & Act
        var calendar = new AwesomeICS.Calendar();

        //-- Assert
        expect(calendar.type).toEqual("VCALENDAR");
    });

    it("should be a block element", function() {
        //-- Arrange & Act
        var calendar = new AwesomeICS.Calendar();

        //-- Assert
        expect(calendar instanceof AwesomeICS.Block).toBeTruthy();
    });

    it("should read BASIC file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic.ics", "utf8").trim();
        var calendar = new AwesomeICS.Calendar();

        //-- Act
        var calendarConverted = calendar.convertFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Block.__format.prepareString(icsFile));
        expect(calendarConverted).toBe(calendar);
    });

    it("should read BASIC REAL file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-real.ics", 'utf8').trim();
        var calendar = new AwesomeICS.Calendar();

        //-- Act
        var calendarConverted = calendar.convertFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Block.__format.prepareString(icsFile));
        expect(calendarConverted).toBe(calendar);
    });

    it("should read BASIC LONG DESCRIPTION file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-long-description.ics", 'utf8');
        var calendar = new AwesomeICS.Calendar();

        //-- Act
        var calendarConverted = calendar.convertFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Block.__format.prepareString(icsFile));
        expect(calendarConverted).toBe(calendar);
    });

    it("should read BASIC MULTIPLE PROPERTY file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-multiple-property.ics", 'utf8');
        var calendar = new AwesomeICS.Calendar();

        //-- Act
        var calendarConverted = calendar.convertFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Block.__format.prepareString(icsFile));
        expect(calendarConverted).toBe(calendar);
    });

    it ("should read BASIC GEOCOORDINATES file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-geocoordinates.ics", 'utf8');
        var calendar = new AwesomeICS.Calendar();

        //-- Act
        var calendarConverted = calendar.convertFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Block.__format.prepareString(icsFile));
        expect(calendarConverted).toBe(calendar);
    });

    it ("should allow to create basic VCALENDAR with VEVENT and DTSTART", function() {
        //-- Arrange & Act
        var dateStart   = new AwesomeICS.PropertyValue.DateTime().setDateValue(moment("2015-12-24"))
            .setTimeValue(moment("18:00", "HH:mm"))
            .setIsFixedValue(true);
        var dateEnd     = new AwesomeICS.PropertyValue.DateTime().setDateValue(moment("2015-12-26"))
            .setTimeValue(moment("23:59", "HH:mm"))
            .setIsFixedValue(true);
        var summary     = new AwesomeICS.PropertyValue.Text().setValue("Christmas Eve");
        var description = new AwesomeICS.PropertyValue.Text().setValue("Please, remember about Christmas Eve");

        var calendar = new AwesomeICS.Calendar()
            .addBlock(
                new AwesomeICS.Block()
                    .setType("VEVENT")
                    .addProperty(new AwesomeICS.Property().setName("DESCRIPTION").setValue(description))
                    .addProperty(new AwesomeICS.Property().setName("DTSTART").setValue(dateStart))
                    .addProperty(new AwesomeICS.Property().setName("DTEND").setValue(dateEnd))
                    .addProperty(new AwesomeICS.Property().setName("SUMMARY").setValue(summary)));


        //-- Assert
        var expectedString = "BEGIN:VCALENDAR\nBEGIN:VEVENT\nDESCRIPTION:Please, remember about Christmas Eve\nDTSTART:20151224T180000\nDTEND:20151226T235900\nSUMMARY:Christmas Eve\nEND:VEVENT\nEND:VCALENDAR";
        var expectedJSON = {
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
            };

        var jsonDiff = diff.diffJson(calendar.toJSON(), expectedJSON);

        expect(calendar.toString()).toEqual(expectedString);
        expect(jsonDiff.length).toEqual(1);
        expect(jsonDiff[0].removed).toBeUndefined();
        expect(jsonDiff[0].added).toBeUndefined();
    });
});