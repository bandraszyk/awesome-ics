var AwesomeICS	= require("../dist/awesome-ics");
var moment      = require("moment");

describe("Property Value Date", function() {
    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "20150901";
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date();

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
        var property = new AwesomeICS.Elements.PropertyValue.Date().convertFromString(content);

        //-- Assert
        expect(property.value).toBeNull();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date().convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });

    it("should be invalid when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toEqual(false);
    });

    it("should equal valid date when properly formatted", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toEqual(true);
    });

    it("should contains momentjs value", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isValid()).toBeTruthy();
    });

    it("should equal same date as passed", function() {
        //-- Arrange
        var content = "20150901";

        //-- Act
        var propertyValue = new AwesomeICS.Elements.PropertyValue.Date().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.format("YYYY-MM-DD")).toEqual("2015-09-01");
    });
});