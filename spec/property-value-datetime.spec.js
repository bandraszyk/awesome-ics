var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value DateTime", function() {
    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "20150901T061545";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.DateTime().setValueFromString(content);

        //-- Act
        var propertyValueSetResult = propertyValue.setValueFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should contain empty date-time object", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.DateTime().setValueFromString(content);

        //-- Assert
        expect(propertyValue.value.date).toBeNull();
        expect(propertyValue.value.time).toBeNull();
    });

    it("should contain value one Date value and one Time value", function() {
        //-- Arrange
        var content = "20150901T061545";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.DateTime().setValueFromString(content);

        //-- Assert
        expect(propertyValue.value.date instanceof AwesomeICS.Elements.PropertyValue.Date).toBeTruthy();
        expect(propertyValue.value.time instanceof AwesomeICS.Elements.PropertyValue.Time).toBeTruthy();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "20150901T061545";

        //-- property
        var propertyValue = new AwesomeICS.Elements.PropertyValue.DateTime().setValueFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});