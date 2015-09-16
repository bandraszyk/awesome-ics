var AwesomeICS	= require("../dist/awesome-ics");
var moment      = require("moment");

describe("Property Value Date", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValueConverted).toBe(propertyValue);
        expect(propertyValueConverted.toString()).toEqual(content);
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be invalid when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toEqual(false);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return valid date when properly formatted", function() {
        //-- Arrange
        var content = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toEqual(true);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contains `Moment` value", function() {
        //-- Arrange
        var content = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toBeTruthy();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same date as passed", function() {
        //-- Arrange
        var content = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.format("YYYY-MM-DD")).toEqual("2015-09-01");
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.Date().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = moment();
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value).toEqual(value);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Moment` as value", function() {
        //-- Arrange
        var value = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.Date();

        //-- Act & Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var value = moment();
        var propertyValue = new AwesomeICS.PropertyValue.Date().setValue(value);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });
});