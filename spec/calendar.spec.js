var AwesomeICS	= require("../dist/awesome-ics");
var fs			= require("fs");

describe("Calendar", function() {
    it("should have type 'CALENDAR'", function() {
        //-- Arrange & Act
        var calendar = new AwesomeICS.Calendar();

        //-- Assert
        expect(calendar.type).toEqual("CALENDAR");
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
});