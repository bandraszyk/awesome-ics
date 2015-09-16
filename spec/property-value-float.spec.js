var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Float", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "7.68";
        var propertyValue = new AwesomeICS.PropertyValue.Float();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be empty", function() {
        //-- Arrange & Act
        var propertyValue = new AwesomeICS.PropertyValue.Float();

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "7.68";
        var propertyValue = new AwesomeICS.PropertyValue.Float();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(7.68);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be NaN", function() {
        //-- Arrange
        var content = "AWESOME";
        var propertyValue = new AwesomeICS.PropertyValue.Float();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(NaN);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "7.68";
        var propertyValue = new AwesomeICS.PropertyValue.Float();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "7.68";
        var propertyValue = new AwesomeICS.PropertyValue.Float().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = 7.68;
        var propertyValue = new AwesomeICS.PropertyValue.Float();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value).toEqual(value);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Number` as value", function() {
        //-- Arrange
        var value = "7.68";
        var propertyValue = new AwesomeICS.PropertyValue.Float();

        //-- Act & Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var value = 7.68;
        var propertyValue = new AwesomeICS.PropertyValue.Float().setValue(value);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });
});