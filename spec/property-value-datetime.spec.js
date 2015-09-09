var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property Value DateTime", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should contain empty date-time object", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.DateTime(content);

        //-- Assert
        expect(propertyValue.original).toBeUndefined();
        expect(propertyValue.value.date).toBeNull();
        expect(propertyValue.value.time).toBeNull();
    });

    it("should contain original value", function() {
        //-- Arrange
        var content = "20150901T061545";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.DateTime(content);

        //-- Assert
        expect(propertyValue.original).toEqual(content);
    });

    it("should contain value one Date value and one Time value", function() {
        //-- Arrange
        var content = "20150901T061545";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.DateTime(content);

        //-- Assert
        expect(propertyValue.value.date instanceof AwesomeICS.Elements.PropertyValue.Date).toBeTruthy();
        expect(propertyValue.value.time instanceof AwesomeICS.Elements.PropertyValue.Time).toBeTruthy();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "20150901T061545";

        //-- property
        var propertyValue = new AwesomeICS.Elements.PropertyValue.DateTime(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});