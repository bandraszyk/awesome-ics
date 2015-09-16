var AwesomeICS	= require("../dist/awesome-ics");

describe("Property Value Geo", function() {
    it("should allow to convert value from `String`", function() {
        //-- Arrange
        var content = "45.67;11.23";
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should contain empty latitude and longitude", function() {
        //-- Arrange & Act
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Assert
        expect(propertyValue.value.longitude).toBeNull();
        expect(propertyValue.value.latitude).toBeNull();
    });

    it("should contain value of two floats", function() {
        //-- Arrange
        var content = "45.67;11.23";
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.value.longitude instanceof AwesomeICS.PropertyValue.Float).toBeTruthy();
        expect(propertyValue.value.latitude instanceof AwesomeICS.PropertyValue.Float).toBeTruthy();
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "45.67;11.23";
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueConverted = propertyValue.convertFromString(content);

        //-- Assert
        expect(propertyValue.toString()).toEqual(content);
        expect(propertyValueConverted).toBe(propertyValue);
    });

    it("should allow to clear the value", function() {
        //-- Arrange
        var content = "45.67;11.23";
        var propertyValue = new AwesomeICS.PropertyValue.Geo().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.clear(content);

        //-- Assert
        expect(propertyValue.value.latitude).toBeNull();
        expect(propertyValue.value.longitude).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "45.67;11.23";
        var propertyValue = new AwesomeICS.PropertyValue.Geo().convertFromString(content);

        //-- Act
        var propertyValueCleared = propertyValue.convertFromString();

        //-- Assert
        expect(propertyValue.value.latitude).toBeNull();
        expect(propertyValue.value.longitude).toBeNull();
        expect(propertyValueCleared).toBe(propertyValue);
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = {
            longitude: new AwesomeICS.PropertyValue.Float().setValue(45.67),
            latitude: new AwesomeICS.PropertyValue.Float().setValue(11.23)
        };
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueSet = propertyValue.setValue(value);

        //-- Assert
        expect(propertyValue.value.longitude).toEqual(value.longitude);
        expect(propertyValue.value.latitude).toEqual(value.latitude);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Object` as value", function() {
        //-- Arrange
        var value = 123;
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should allow only `Object` with valid longitude as value", function() {
        //-- Arrange
        var value = {
            longitude: 45.67,
            latitude: new AwesomeICS.PropertyValue.Float().setValue(11.23)
        };
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should allow only `Object` with valid latitude as value", function() {
        //-- Arrange
        var value = {
            longitude: new AwesomeICS.PropertyValue.Float().setValue(45.67),
            latitude: 11.23
        };
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act && Assert
        expect(function() { propertyValue.setValue(value); }).toThrow();
    });

    it("should allow to set longitude", function() {
        //-- Arrange
        var longitude = new AwesomeICS.PropertyValue.Float().setValue(45.67);
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueSet = propertyValue.setLongitude(longitude);

        //-- Assert
        expect(propertyValue.value.longitude).toEqual(longitude);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Float` as longitude", function() {
        //-- Arrange
        var longitude = 45.67;
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act & Assert
        expect(function() { propertyValue.setLongitude(longitude); }).toThrow();
    });

    it("should allow to set latitude", function() {
        //-- Arrange
        var latitude = new AwesomeICS.PropertyValue.Float().setValue(11.23);
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueSet = propertyValue.setLatitude(latitude);

        //-- Assert
        expect(propertyValue.value.latitude).toEqual(latitude);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Float` as latitude", function() {
        //-- Arrange
        var latitude = 11.23;
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act & Assert
        expect(function() { propertyValue.setLatitude(latitude); }).toThrow();
    });

    it("should allow to set longitude value", function() {
        //-- Arrange
        var longitude = 45.67;
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueSet = propertyValue.setLongitudeValue(longitude);

        //-- Assert
        expect(propertyValue.value.longitude.value).toEqual(longitude);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Number` as latitude", function() {
        //-- Arrange
        var longitude = "45.67";
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act & Assert
        expect(function() { propertyValue.setLongitudeValue(longitude); }).toThrow();
    });

    it("should allow to set latitude value", function() {
        //-- Arrange
        var latitude = 11.23;
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act
        var propertyValueSet = propertyValue.setLatitudeValue(latitude);

        //-- Assert
        expect(propertyValue.value.latitude.value).toEqual(latitude);
        expect(propertyValueSet).toBe(propertyValue);
    });

    it("should allow only `Number` as latitude", function() {
        //-- Arrange
        var latitude = "11.23";
        var propertyValue = new AwesomeICS.PropertyValue.Geo();

        //-- Act & Assert
        expect(function() { propertyValue.setLatitudeValue(latitude); }).toThrow();
    });
});