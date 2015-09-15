var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Text", function() {
    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "Property_Value";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Text();

        //-- Act
        var propertyValueSetResult = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Text().convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Text().convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual("Property_Value");
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- property
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Text().convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});