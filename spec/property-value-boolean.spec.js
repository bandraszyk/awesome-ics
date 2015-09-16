var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Boolean", function() {
    it("should allow to convert value from string", function() {
        //-- Arrange
        var content = "TRUE";
        var propertyValue = new AwesomeICS.PropertyValue.Boolean();

        //-- Act
        var propertyValueSetResult = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.value).toBeTruthy();
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Boolean().convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "TRUE";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Boolean().convertFromString(content)

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });

    it("should contain null value when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Boolean().convertFromString(content)

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should equal `true`", function() {
        //-- Arrange
        var content = "TRUE";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Boolean().convertFromString(content)

        //-- Assert
        expect(propertyValue.value).toEqual(true);
    });

    it("should equal `false`", function() {
        //-- Arrange
        var content = "FALSE";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Boolean().convertFromString(content)

        //-- Assert
        expect(propertyValue.value).toEqual(false);
    });
});