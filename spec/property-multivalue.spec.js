var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property MultipleValue", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.MultipleValue(content);

        //-- Assert
        expect(property.original).toBeUndefined();
        expect(property.values.length).toEqual(0);
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "Parameter_Value";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.MultipleValue(content, AwesomeICS.Elements.PropertyValue.Value);

        //-- Assert
        expect(property.original).toEqual(content);
    });

    it("should contain one value", function() {
        //-- Arrange
        var content = "Parameter_Value";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.MultipleValue(content, AwesomeICS.Elements.PropertyValue.Value);

        //-- Assert
        expect(property.values.length).toEqual(1);
    });

    it("should contain two value", function() {
        //-- Arrange
        var content = "Parameter_Value1,Parameter_Value2";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.MultipleValue(content, AwesomeICS.Elements.PropertyValue.Value);

        //-- Assert
        expect(property.values.length).toEqual(2);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "Parameter_Value";

        //-- Act
        var property = new AwesomeICS.Elements.PropertyValue.MultipleValue(content, AwesomeICS.Elements.PropertyValue.Value);

        //-- Assert
        expect(property.toString()).toEqual(content);
    });
});