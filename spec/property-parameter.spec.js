var AwesomeICS	= require("../dist/awesome-ics");

describe("Parameter", function() {
    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";
        var parameter = new AwesomeICS.Elements.PropertyParameter();

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

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter().convertFromString(content);

        //-- Assert
        expect(parameter.name).toBeNull("");
        expect(parameter.value).toBeNull();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter().convertFromString(content);

        //-- Assert
        expect(parameter.toString()).toEqual(content);
    });

    it("should have name", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter().convertFromString(content);

        //-- Assert
        expect(parameter.name).toEqual("PARAMETER_NAME");
    });

    it("should have value", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter().convertFromString(content);

        //-- Assert
        expect(parameter.value).toEqual("PARAMETER_VALUE");
    });
});