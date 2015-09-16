var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Integer", function() {
    it("should be empty", function() {
        //-- Arrange
        var content = undefined;
        var propertyValue = new AwesomeICS.PropertyValue.Integer();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "7";
        var propertyValue = new AwesomeICS.PropertyValue.Integer().convertFromString(content);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "7";
        var propertyValue = new AwesomeICS.PropertyValue.Integer().convertFromString(content);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(7);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be NaN", function() {
        //-- Arrange
        var content = "AWESOME";
        var propertyValue = new AwesomeICS.PropertyValue.Integer().convertFromString(content);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(NaN);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "7";
        var propertyValue = new AwesomeICS.PropertyValue.Integer().convertFromString(content);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "7";
        var propertyValue = new AwesomeICS.PropertyValue.Integer().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = 7;
        var propertyValue = new AwesomeICS.PropertyValue.Integer();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value).toEqual(value);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Number` as value", function() {
        //-- Arrange
        var value = "7";
        var propertyValue = new AwesomeICS.PropertyValue.Integer();

        //-- Act & Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var value = 7;
        var propertyValue = new AwesomeICS.PropertyValue.Integer().setValue(value);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });
});