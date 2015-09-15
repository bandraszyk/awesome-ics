var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value Float", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Float(content);

        //-- Assert
        expect(propertyValue.original).toBeUndefined();
        expect(propertyValue.value).toBeNull();
    });

    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "7.68";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Float();

        //-- Act
        var propertyValueSetResult = propertyValue.setValueFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "7.68";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Float(content);

        //-- Assert
        expect(propertyValue.original).toEqual(content);
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "7.68";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Float(content);

        //-- Assert
        expect(property.value).toEqual(7.68);
    });

    it("should be NaN", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Float(content);

        //-- Assert
        expect(propertyValue.value).toEqual(NaN);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "7.68";

        //-- property
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Float(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});