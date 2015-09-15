var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value Boolean", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(propertyValue.original).toBeUndefined();
        expect(propertyValue.value).toBeNull();
    });

    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "TRUE";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Boolean();

        //-- Act
        var propertyValueSetResult = propertyValue.setValueFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.value).toBeTruthy();
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "TRUE";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(propertyValue.original).toEqual(content);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "TRUE";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });

    it("should contain null value when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should equal `true`", function() {
        //-- Arrange
        var content = "TRUE";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(propertyValue.value).toEqual(true);
    });

    it("should equal `false`", function() {
        //-- Arrange
        var content = "FALSE";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(propertyValue.value).toEqual(false);
    });
});