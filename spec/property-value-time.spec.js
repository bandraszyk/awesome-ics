var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Time", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "061545";
        var propertyValue = new AwesomeICS.PropertyValue.Time();

        //-- Act
        var propertyValueSetResult = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValueSetResult).toBe(propertyValue);
        expect(propertyValueSetResult.toString()).toEqual(content);
    });

    it("should contain empty time object", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Time(content).convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time).toBeNull();
        expect(propertyValue.value.isFixed).toBeNull();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "061545";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
    });

    it("should contains `Moment` value", function() {
        //-- Arrange
        var content = "061545";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time.isValid()).toBeTruthy();
    });

    it("should be invalid when wrongly formatted", function() {
        //-- Arrange
        var content = "AWESOME";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time.isValid()).toEqual(false);
    });

    it("should equal valid date when properly formatted", function() {
        //-- Arrange
        var content = "061545";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time.isValid()).toEqual(true);
    });

    it("should equal same date as passed", function() {
        //-- Arrange
        var content = "061545";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.time.format("HH:mm:SS")).toEqual("06:15:45");
    });

    it("should be fixed", function() {
        //-- Arrange
        var content = "061545";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isFixed).toEqual(true);
    });

    it("should not be fixed", function() {
        //-- Arrange
        var content = "061545Z";

        //-- Act
        var propertyValue = new AwesomeICS.PropertyValue.Time().convertFromString(content);

        //-- Assert
        expect(propertyValue.value.isFixed).toEqual(false);
    });
});