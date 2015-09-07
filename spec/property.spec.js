var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Property", function() {
	beforeEach(function() { _util.applyCustomMatcher(jasmine); });

	it("should be empty", function() {
		//-- Arrange
		var content = undefined;

		//-- Act
		var property = new AwesomeICS.Elements.Property(content);

		//-- Assert
		expect(property.original).toBeUndefined();
		expect(property.parameters.length).toEqual(0);
		expect(property.name).toEqual("");
		expect(property.value).toEqual("");
	});

	it("should contain original content", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property(content);

		//-- Assert
		expect(property.original).toEqual(content);
	});

	it("should return same string value", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property(content);

		//-- Assert
		expect(property.toString()).toEqual(content);
	});

	it("should have name", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property(content);

		//-- Assert
		expect(property.name).toEqual("PROPERTY_NAME");
	});

	it("should have value", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property(content);

		//-- Assert
		expect(property.value instanceof AwesomeICS.Elements.PropertyValue.Value).toBeTruthy();
	});

	it("should have one parameter", function() {
		//-- Arrange
		var content = "PROPERTY_NAME;VALUE=DATE:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property(content);

		//-- Assert
		expect(property.parameters.length).toEqual(1);
	});
});