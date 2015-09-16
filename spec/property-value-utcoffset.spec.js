var AwesomeICS	= require("../dist/awesome-ics");
var moment      = require("moment");

describe("Property Value UTCOffset", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "+0200";
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be empty", function() {
        //-- Arrange & Act
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset();

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should be zero when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.utcOffset()).toEqual(0);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "+0200";
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow negative zones", function() {
        //-- Arrange
        var content = "-0200";
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contains `Moment` value", function() {
        //-- Arrange
        var content = "-0200";
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toBeTruthy();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = moment();
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value).toEqual(value);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Moment` as value", function() {
        //-- Arrange
        var value = "-2000";
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset();

        //-- Act & Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var value = moment();
        var propertyValue = new AwesomeICS.PropertyValue.UTCOffset().setValue(value);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });
});