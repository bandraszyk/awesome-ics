var AwesomeICS	= require("../dist/awesome-ics");
var moment      = require("moment");

describe("Property Value DateTime", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "20150901T061545";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime().convertFromString(content);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain empty date-time object", function() {
        //-- Arrange & Act
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Assert
        expect(propertyValue.value.date).toBeNull();
        expect(propertyValue.value.time).toBeNull();
    });

    it("should contain value one Date value and one Time value", function() {
        //-- Arrange
        var content = "20150901T061545";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime().convertFromString(content);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.date instanceof AwesomeICS.PropertyValue.Date).toBeTruthy();
        expect(propertyValue.value.time instanceof AwesomeICS.PropertyValue.Time).toBeTruthy();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "20150901T061545";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime().convertFromString(content);

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow to clear the value", function() {
        //-- Arrange
        var content = "20150901T061545";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.clear(content);

        //-- Assert
        expect(propertyValue.value.date).toBeNull();
        expect(propertyValue.value.time).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "20150901T061545";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value.date).toBeNull();
        expect(propertyValue.value.time).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should allow to set time", function() {
        //-- Arrange
        var time = new AwesomeICS.PropertyValue.Time().setValue(moment());
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act
        var propertyValueSet = propertyValue.setTime(time);

        //-- Assert
        expect(propertyValue.value.time).toEqual(time);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Time` as time", function() {
        //-- Arrange
        var value = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act & Assert
        expect(function() { propertyValue.setTime(value); }).toThrow();
    });

    it("should allow to set date", function() {
        //-- Arrange
        var date = new AwesomeICS.PropertyValue.Date().setValue(moment());
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act
        var propertyValueSet = propertyValue.setDate(date);

        //-- Assert
        expect(propertyValue.value.date).toEqual(date);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Date` as date", function() {
        //-- Arrange
        var value = "20150901";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act & Assert
        expect(function() { propertyValue.setDate(value); }).toThrow();
    });

    it("should allow to set time value", function() {
        //-- Arrange
        var time = moment();
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act
        var propertyValueSet = propertyValue.setTimeValue(time);

        //-- Assert
        expect(propertyValue.value.time.value.time).toEqual(time);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Moment` as time value", function() {
        //-- Arrange
        var time = "064532";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act & Assert
        expect(function() { propertyValue.setTimeValue(time); }).toThrow();
    });

    it("should allow to set date value", function() {
        //-- Arrange
        var date = moment();
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act
        var propertyValueSet = propertyValue.setDateValue(date);

        //-- Assert
        expect(propertyValue.value.date.value).toEqual(date);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Moment` as date value", function() {
        //-- Arrange
        var time = "064532";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act & Assert
        expect(function() { propertyValue.setDateValue(date); }).toThrow();
    });

    it("should allow to set isFixed value", function() {
        //-- Arrange
        var isFixed = false;
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act
        var propertyValueSet = propertyValue.setIsFixedValue(isFixed);

        //-- Assert
        expect(propertyValue.value.time.value.isFixed).toEqual(isFixed);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Boolean` as isFixed value", function() {
        //-- Arrange
        var isFixed = "FALSE";
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act & Assert
        expect(function() { propertyValue.setIsFixedValue(isFixed); }).toThrow();
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = {
            date: new AwesomeICS.PropertyValue.Date().setValue(moment()),
            time: new AwesomeICS.PropertyValue.Time().setTime(moment())
        };
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value.date).toEqual(value.date);
        expect(propertyValue.value.time).toEqual(value.time);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Object` as value", function() {
        //-- Arrange
        var value = 123;
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should allow only `Object` with valid date as value", function() {
        //-- Arrange
        var value = {
            date: "061232",
            time: new AwesomeICS.PropertyValue.Time().setTime(moment())
        };
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should allow only `Object` with valid time as value", function() {
        //-- Arrange
        var value = {
            date: new AwesomeICS.PropertyValue.Date().setValue(moment()),
            time: "061532"
        };
        var propertyValue = new AwesomeICS.PropertyValue.DateTime();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });
});