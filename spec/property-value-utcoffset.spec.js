var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value UTCOffset", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.UTCOffset(content);

        //-- Assert
        expect(property.original).toBeUndefined();
        expect(property.value).toBeNull();
    });

    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "+0200";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.UTCOffset();

        //-- Act
        var propertyValueSetResult = propertyValue.setValueFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "+0200";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.UTCOffset(content);

        //-- Assert
        expect(property.original).toEqual(content);
    });

    it("should be zero when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.UTCOffset(content);

        //-- Assert
        expect(propertyValue.value.utcOffset()).toEqual(0);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "+0200";

        //-- property
        var property = new AwesomeICS.Elements.PropertyValue.UTCOffset(content);

        //-- Assert
        expect(property.toString()).toEqual(content);
    });

    it("should allow negative zones", function() {
        //-- Arrange
        var content = "-0200";

        //-- property
        var property = new AwesomeICS.Elements.PropertyValue.UTCOffset(content);

        //-- Assert
        expect(property.toString()).toEqual(content);
    });

    it("should contains momentjs value", function() {
        //-- Arrange
        var content = "-0200";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.UTCOffset(content);

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