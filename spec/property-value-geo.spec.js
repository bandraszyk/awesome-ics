var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value Geo", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should contain empty latitude and longitude", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Geo(content);

        //-- Assert
        expect(propertyValue.original).toBeUndefined();
        expect(propertyValue.value.longitude).toBeNull();
        expect(propertyValue.value.latitude).toBeNull();
    });

    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "45.67;11.23";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Geo();

        //-- Act
        var propertyValueSetResult = propertyValue.setValueFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "45.67;11.23";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Geo(content);

        //-- Assert
        expect(propertyValue.original).toEqual(content);
    });

    it("should contain value of two floats", function() {
        //-- Arrange
        var content = "45.67;11.23";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Geo(content);

        //-- Assert
        expect(propertyValue.value.longitude instanceof AwesomeICS.Elements.PropertyValue.Float).toBeTruthy();
        expect(propertyValue.value.latitude instanceof AwesomeICS.Elements.PropertyValue.Float).toBeTruthy();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "45.67;11.23";

        //-- property
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Geo(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});