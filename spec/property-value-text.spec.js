var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value Text", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Text(content);

        //-- Assert
        expect(property.original).toBeUndefined();
        expect(property.value).toBeNull();
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Text(content);

        //-- Assert
        expect(property.original).toEqual(content);
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.Text(content);

        //-- Assert
        expect(property.value).toEqual("Property_Value");
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "Property_Value";

        //-- property
        var property = new AwesomeICS.Elements.PropertyValue.Text(content);

        //-- Assert
        expect(property.toString()).toEqual(content);
    });
});