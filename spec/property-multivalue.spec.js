var AwesomeICS	= require("../dist/awesome-ics");

describe("Property MultipleValue", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "Parameter_Value";
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValueConverted.value.length).toEqual(1);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should require the mapping", function() {
        //-- Arrange & Act & Assert
        expect(function() { new AwesomeICS.PropertyValue.MultipleValue(); }).toThrow();
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.length).toEqual(0);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain one value", function() {
        //-- Arrange
        var content = "Parameter_Value";
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.length).toEqual(1);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain one value of given type", function() {
        //-- Arrange
        var content = "Parameter_Value";
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.length).toEqual(1);
        expect(propertyValue.value[0] instanceof AwesomeICS.PropertyValue.Value).toBeTruthy();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain two value", function() {
        //-- Arrange
        var content = "Parameter_Value1,Parameter_Value2";
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.length).toEqual(2);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "Parameter_Value";
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow only `ParameterValue` as mapping", function() {
        //-- Arrange & Act & Assert
        expect(function() { new AwesomeICS.PropertyValue.MultipleValue("mapping") }).toThrow();
    });

    it("should allow to clear the value", function() {
        //-- Arrange
        var content = "Parameter_Value1,Parameter_Value2";
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value).convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.clear();

        //-- Assert
        expect(propertyValue.value.length).toEqual(0);
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "Parameter_Value1,Parameter_Value2";
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value).convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value.length).toEqual(0);
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = [ "Parameter_Value1", "Parameter_Value2" ];
        var propertyValue = new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value);

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value.length).toEqual(2);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should only allow array as value", function() {
        //-- Arrange
        var value = "Parameter_Value1,Parameter_Value2";

        //-- Act & Assert
        expect(function() { new AwesomeICS.PropertyValue.MultipleValue(AwesomeICS.PropertyValue.Value).setValue(value); }).toThrow();
    });
});