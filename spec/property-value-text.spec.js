var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Text", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "Property_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Text();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;
        var propertyValue = new AwesomeICS.PropertyValue.Text();

        //-- property
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "Property_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Text();

        //-- property
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual("Property_Value");
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "Property_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Text();

        //-- property
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = "Property_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Text();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value).toEqual(value);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `String` as value", function() {
        //-- Arrange
        var value = 7;
        var propertyValue = new AwesomeICS.PropertyValue.Text();

        //-- Act & Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var value = "Property_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Text().setValue(value);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });
});