var AwesomeICS	= require("../dist/awesome-ics");

describe("Parameter", function() {
    it("should allow to set value from string", function() {
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
});