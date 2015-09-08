var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value Integer", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Integer(content);

        //-- Assert
        expect(property.original).toBeUndefined();
        expect(property.value).toBeNull();
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "7";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Integer(content);

        //-- Assert
        expect(property.original).toEqual(content);
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "7";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Integer(content);

        //-- Assert
        expect(property.value).toEqual(7);
    });

    it("should be NaN", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Integer(content);

        //-- Assert
        expect(property.value).toEqual(NaN);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "7";

        //-- property
        var property = new AwesomeICS.Elements.PropertyValue.Integer(content);

        //-- Assert
        expect(property.toString()).toEqual(content);
    });
});