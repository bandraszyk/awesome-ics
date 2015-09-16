var AwesomeICS	= require("../dist/awesome-ics");

describe("Parameter", function() {
    it("should allow to convert value from string", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act
        var parameterSetResult = parameter.convertFromString(content);

        //-- Assert
        expect(parameterSetResult).toBe(parameter);
        expect(parameterSetResult.name).toEqual("PARAMETER_NAME");
        expect(parameterSetResult.value).toEqual("PARAMETER_VALUE");
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act
        var parameterConverted = parameter.convertFromString(content);

        //-- Assert
        expect(parameter.name).toBeNull("");
        expect(parameter.value).toBeNull();
        expect(parameterConverted).toBe(parameter);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act
        var parameterConverted = parameter.convertFromString(content);

        //-- Assert
        expect(parameter.toString()).toEqual(content);
        expect(parameterConverted).toBe(parameter);
    });

    it("should have name", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act
        var parameterConverted = parameter.convertFromString(content);

        //-- Assert
        expect(parameter.name).toEqual("PARAMETER_NAME");
        expect(parameterConverted).toBe(parameter);
    });

    it("should have value", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act
        var parameterConverted = parameter.convertFromString(content);

        //-- Assert
        expect(parameter.value).toEqual("PARAMETER_VALUE");
        expect(parameterConverted).toBe(parameter);
    });

    it("should allow to set name", function() {
        //-- Arrange
        var name = "PARAMETER_NAME";
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act
        var parameterSet = parameter.setName(name);

        //-- Assert
        expect(parameter.name).toEqual(name);
        expect(parameterSet).toBe(parameter);
    });

    it("should allow only `String` as name", function() {
        //-- Arrange
        var name = 123;
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act & Assert
        expect(function() { parameter.setName(name); }).toThrow();
    });

    it("should allow to set value", function() {
        //-- Arrange
        var value = "PARAMETER_VALUE";
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act
        var parameterSet = parameter.setValue(value);

        //-- Assert
        expect(parameter.value).toEqual(value);
        expect(parameterSet).toBe(parameter);
    });

    it("should allow only `String` as value", function() {
        //-- Arrange
        var value = 123;
        var parameter = new AwesomeICS.PropertyParameter();

        //-- Act & Assert
        expect(function() { parameter.setValue(value); }).toThrow();
    });

    it("should allow to clear the value", function() {
        //-- Arrange
        var content = "PROPERTY_NAME:PROPERTY_VALUE";
        var parameter = new AwesomeICS.PropertyParameter().convertFromString(content);

        //-- Act
        var parameterCleared = parameter.clear();

        //-- Assert
        expect(parameter.name).toBeNull();
        expect(parameter.value).toBeNull();
        expect(parameterCleared).toBe(parameter);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "PROPERTY_NAME:PROPERTY_VALUE";
        var parameter = new AwesomeICS.PropertyParameter().convertFromString(content);

        //-- Act
        var parameterCleared = parameter.convertFromString();

        //-- Assert
        expect(parameter.name).toBeNull();
        expect(parameter.value).toBeNull();
        expect(parameterCleared).toBe(parameter);
    });
});