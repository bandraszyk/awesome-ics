var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value", function() {
    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "Parameter_Value";
        var propertyValue = new AwesomeICS.PropertyValue.Value();

        //-- Act
        var propertyValueSetResult = propertyValue.convertFromString().convertFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.value).toEqual(content);
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Value().convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Value().convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual("Property_Value");
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- property
        var propertyValue = new AwesomeICS.PropertyValue.Value().convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});