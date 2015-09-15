var AwesomeICS	= require("../dist/awesome-ics");
var fs			= require("fs");

describe("Calendar", function() {
    it("should read BASIC file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic.ics", "utf8").trim();

        //-- Act
        var calendar = new AwesomeICS.Calendar().setValueFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toBeTruthy(AwesomeICS.Elements.Block.__format.prepareString(icsFile));
    });

    it("should read BASIC REAL file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-real.ics", 'utf8').trim();

        //-- Act
        var calendar = new AwesomeICS.Calendar().setValueFromString(icsFile);


        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Elements.Block.__format.prepareString(icsFile));
    });

    it("should read BASIC LONG DESCRIPTION file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-long-description.ics", 'utf8');

        //-- Act
        var calendar = new AwesomeICS.Calendar().setValueFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Elements.Block.__format.prepareString(icsFile));
    });

    it("should read BASIC MULTIPLE PROPERTY file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-multiple-property.ics", 'utf8');

        //-- Act
        var calendar = new AwesomeICS.Calendar().setValueFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Elements.Block.__format.prepareString(icsFile));
    });

    it ("should read BASIC GEOCOORDINATES file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-geocoordinates.ics", "utf8");

        //-- Act
        var calendar = new AwesomeICS.Calendar().setValueFromString(icsFile);

        //-- Assert
        expect(calendar.toString()).toEqual(AwesomeICS.Elements.Block.__format.prepareString(icsFile));
    });
});