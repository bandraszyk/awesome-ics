var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util")
var fs			= require("fs");

describe("Calendar", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should read BASIC file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic.ics", "utf8").trim();

        //-- Act
        var calendar = new AwesomeICS.Calendar(icsFile);

        //-- Assert
        expect(JSON.stringify(calendar.toString())).noDiffBetween(JSON.stringify(calendar.original));
    });

    it("should read BASIC REAL file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-real.ics", 'utf8').trim();

        //-- Act
        var calendar = new AwesomeICS.Calendar(icsFile);

        //-- Assert
        expect(JSON.stringify(calendar.toString())).noDiffBetween(JSON.stringify(calendar.original));
    });

    it("should read BASIC LONG DESCRIPTION file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-long-description.ics", 'utf8');

        //-- Act
        var calendar = new AwesomeICS.Calendar(icsFile);

        //-- Assert
        expect(JSON.stringify(calendar.toString())).noDiffBetween(JSON.stringify(calendar.original));
    });

    it("should read BASIC MULTIPLE PROPERTY file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-multiple-property.ics", 'utf8');

        //-- Act
        var calendar = new AwesomeICS.Calendar(icsFile);

        //-- Assert
        expect(JSON.stringify(calendar.toString())).noDiffBetween(JSON.stringify(calendar.original));
    });

    it ("should read BASIC GEOCOORDINATES file and return as string in same format", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/basic-geocoordinates.ics", "utf8");

        //-- Act
        var calendar = new AwesomeICS.Calendar(icsFile);

        //-- Assert
        expect(JSON.stringify(calendar.toString())).noDiffBetween(JSON.stringify(calendar.original));
    });
});