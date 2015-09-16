var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "Parameter_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Value();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValueConverted).toBe(propertyValue);
        expect(propertyValueConverted.value).toEqual(content);
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Value();

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "Property_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Value();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual("Property_Value");
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "Property_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Value();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = true;
        var propertyValue = new AwesomeICS.PropertyValue.Value();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value).toEqual(value);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow to clear value", function() {
        //-- Arrange
        var value = true;
        var propertyValue = new AwesomeICS.PropertyValue.Value().setValue(value);

        //-- Act
        var propertyValueCleared = propertyValue.clear();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var value = true;
        var propertyValue = new AwesomeICS.PropertyValue.Value().setValue(value);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });
});