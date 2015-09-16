var AwesomeICS	= require("../dist/awesome-ics");
var moment      = require("moment");

describe("Property Value Time", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "061545";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain empty time object", function() {
        //-- Arrange & Act
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Assert
        expect(propertyValue.value.time).toBeNull();
        expect(propertyValue.value.isFixed).toBeNull();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "061545";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contains `Moment` value", function() {
        //-- Arrange
        var content = "061545";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time.isValid()).toBeTruthy();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be invalid when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time.isValid()).toEqual(false);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should equal valid date when properly formatted", function() {
        //-- Arrange
        var content = "061545";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time.isValid()).toEqual(true);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should equal same date as passed", function() {
        //-- Arrange
        var content = "061545";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time.format("HH:mm:SS")).toEqual("06:15:45");
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be fixed", function() {
        //-- Arrange
        var content = "061545";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isFixed).toEqual(true);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should not be fixed", function() {
        //-- Arrange
        var content = "061545Z";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isFixed).toEqual(false);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow to clear the value", function() {
        //-- Arrange
        var content = "061545Z";
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.clear(content);

        //-- Assert
        expect(propertyValue.value.time).toBeNull();
        expect(propertyValue.value.isFixed).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "061545Z";
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value.time).toBeNull();
        expect(propertyValue.value.isFixed).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should allow to set time", function() {
        //-- Arrange
        var time = moment();
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueSet = propertyValue.setTime(time);

        //-- Assert
        expect(propertyValue.value.time).toEqual(time);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Moment` as time", function() {
        //-- Arrange
        var value = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act & Assert
        expect(function() { propertyValue.setTime(value); }).toThrow();
    });

    it("should allow to set isFixed", function() {
        //-- Arrange
        var value = false;
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueConverted = propertyValue.setIsFixed(value);

        //-- Assert
        expect(propertyValue.value.isFixed).toEqual(value);
        expect(propertyValueConverted).toBe(propertyValue)
    });

    it("should allow only `Boolean` as isFixed", function() {
        //-- Arrange
        var value = 123;
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act && Assert
        expect(function() { propertyValue.setIsFixed(value); }).toThrow();
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = { time: moment(), isFixed: true };
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value.time).toEqual(value.time);
        expect(propertyValue.value.isFixed).toEqual(value.isFixed);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Object` as value", function() {
        //-- Arrange
        var value = 123;
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should allow only `Object` with valid time as value", function() {
        //-- Arrange
        var value = { time: 123, isFixed: true };
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should allow only `Object` with valid isFixed as value", function() {
        //-- Arrange
        var value = { time: moment(), isFixed: 123 };
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });
});