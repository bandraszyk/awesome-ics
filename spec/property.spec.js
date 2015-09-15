var AwesomeICS	= require("../dist/awesome-ics");

describe("Property", function() {
	it("should allow to set value from string", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";
		var property = new AwesomeICS.Elements.Property();

		//-- Act
		var propertySetResult = property.convertFromString(content);

		//-- Assert
		expect(propertySetResult).toBe(property);
		expect(propertySetResult.name).toEqual("PROPERTY_NAME");
		expect(propertySetResult.value instanceof AwesomeICS.Elements.PropertyValue.Value).toBeTruthy();
	});

	it("should be empty", function() {
		//-- Arrange
		var content = undefined;

		//-- Act
		var property = new AwesomeICS.Elements.Property().convertFromString(content);

		//-- Assert
		expect(property.parameters.length).toEqual(0);
		expect(property.name).toBeNull();
		expect(property.value).toBeNull();
	});

	it("should return same string value", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property().convertFromString(content);

		//-- Assert
		expect(property.toString()).toEqual(content);
	});

	it("should have name", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property().convertFromString(content);;

		//-- Assert
		expect(property.name).toEqual("PROPERTY_NAME");
	});

	it("should have value", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property().convertFromString(content);;

		//-- Assert
		expect(property.value instanceof AwesomeICS.Elements.PropertyValue.Value).toBeTruthy();
	});

	it("should have one parameter", function() {
		//-- Arrange
		var content = "PROPERTY_NAME;VALUE=DATE:PROPERTY_VALUE";

		//-- Act
		var property = new AwesomeICS.Elements.Property().convertFromString(content);;

		//-- Assert
		expect(property.parameters.length).toEqual(1);
	});
});