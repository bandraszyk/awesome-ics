var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Parameter", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter(content);

        //-- Assert
        expect(parameter.original).toBeUndefined();
        expect(parameter.name).toBeNull("");
        expect(parameter.value).toBeNull();
    });

    it("should contain original content", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter(content);

        //-- Assert
        expect(parameter.original).toEqual(content);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter(content);

        //-- Assert
        expect(parameter.toString()).toEqual(content);
    });

    it("should have name", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter(content);

        //-- Assert
        expect(parameter.name).toEqual("PARAMETER_NAME");
    });

    it("should have value", function() {
        //-- Arrange
        var content = "PARAMETER_NAME=PARAMETER_VALUE";

        //-- Act
        var parameter = new AwesomeICS.Elements.PropertyParameter(content);

        //-- Assert
        expect(parameter.value).toEqual("PARAMETER_VALUE");
    });
});