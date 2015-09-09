var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");
var moment      = require("moment");

describe("Property Value Date", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Date(content);

        //-- Assert
        expect(property.original).toBeUndefined();
        expect(property.value).toBeNull();
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date(content);

        //-- Assert
        expect(propertyValue.original).toEqual(content);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });

    it("should be invalid when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toEqual(false);
    });

    it("should equal valid date when properly formatted", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toEqual(true);
    });

    it("should contains momentjs value", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toBeTruthy();
    });

    it("should equal same date as passed", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date(content);

        //-- Assert
        expect(propertyValue.value.format("YYYY-MM-DD")).toEqual("2015-09-01");
    });
});