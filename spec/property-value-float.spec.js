var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Float", function() {

    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "7.68";
        var propertyValue = new AwesomeICS.PropertyValue.Float();

        //-- Act
        var propertyValueSetResult = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Float().convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toBeNull();
    });

    it("should contain value", function() {
        //-- Arrange
        var content = "7.68";

        //-- Act
        var property = new AwesomeICS.PropertyValue.Float().convertFromString(content);

        //-- Assert
        expect(property.value).toEqual(7.68);
    });

    it("should be NaN", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Float().convertFromString(content);

        //-- Assert
        expect(propertyValue.value).toEqual(NaN);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "7.68";

        //-- property
        var propertyValue = new AwesomeICS.PropertyValue.Float().convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });
});