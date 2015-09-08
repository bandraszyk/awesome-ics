var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value Boolean", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(property.original).toBeUndefined();
        expect(property.value).toBeNull();
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "TRUE";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(property.original).toEqual(content);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "TRUE";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(property.toString()).toEqual(content);
    });

    it("should contain null value when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(property.value).toBeNull();
    });

    it("should equal `true`", function() {
        //-- Arrange
        var content = "TRUE";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(property.value).toEqual(true);
    });

    it("should equal `false`", function() {
        //-- Arrange
        var content = "FALSE";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Boolean(content);

        //-- Assert
        expect(property.value).toEqual(false);
    });
});