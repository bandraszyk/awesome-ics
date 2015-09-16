var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Geo", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "45.67;11.23";
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueSetResult = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should contain empty latitude and longitude", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Geo().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.longitude).toBeNull();
        expect(propertyValue.value.latitude).toBeNull();
    });

    it("should contain value of two floats", function() {
        //-- Arrange
        var content = "45.67;11.23";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Geo().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.longitude instanceof AwesomeICS.PropertyValue.Float).toBeTruthy();
        expect(propertyValue.value.latitude instanceof AwesomeICS.PropertyValue.Float).toBeTruthy();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "45.67;11.23";

        //-- property
        var propertyValue = new AwesomeICS.PropertyValue.Geo().convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});