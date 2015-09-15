var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Value(content);

        //-- Assert
        expect(propertyValue.original).toBeUndefined();
        expect(propertyValue.value).toBeNull();
    });

    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "Parameter_Value";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Value();

        //-- Act
        var propertyValueSetResult = propertyValue.setValueFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.value).toEqual(content);
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Value(content);

        //-- Assert
        expect(propertyValue.original).toEqual(content);
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Value(content);

        //-- Assert
        expect(propertyValue.value).toEqual("Property_Value");
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- property
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Value(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});