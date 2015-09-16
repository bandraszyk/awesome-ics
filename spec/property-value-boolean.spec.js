var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Boolean", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "TRUE";
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeTruthy();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be empty", function() {
        //-- Arrange & Act
        var content = undefined;
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "FALSE";
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain null value when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should equal `true`", function() {
        //-- Arrange
        var content = "TRUE";
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(true);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should equal `false`", function() {
        //-- Arrange
        var content = "FALSE";
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(false);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = false;
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Act
        var propertyValueConverted = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value).toEqual(value);
        expect(propertyValueConverted).toBe(propertyValue)
    });

    it("should allow only `Boolean` as value", function() {
        //-- Arrange
        var value = 123;
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var value = true;
        var propertyValue = new AwesomeICS.PropertyValue.Boolean().setValue(value);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });
});