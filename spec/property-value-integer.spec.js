var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Integer", function() {
    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Integer().setValueFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "7";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Integer().setValueFromString(content);

        //-- Act
        var propertyValueSetResult = propertyValue.setValueFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "7";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Integer().setValueFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(7);
    });

    it("should be NaN", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Integer().setValueFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(NaN);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "7";

        //-- property
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Integer().setValueFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});