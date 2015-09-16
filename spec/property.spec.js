var AwesomeICS	= require("../dist/awesome-ics");

describe("Property", function() {
	it("should allow to set value from string", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";
		var property = new AwesomeICS.Property();

		//-- Act
		var propertySetResult = property.convertFromString(content);

		//-- Assert
		expect(propertySetResult).toBe(property);
		expect(propertySetResult.name).toEqual("PROPERTY_NAME");
		expect(propertySetResult.value instanceof AwesomeICS.PropertyValue.Value).toBeTruthy();
	});

	it("should be empty", function() {
		//-- Arrange & Act
		var content = undefined;
		var property = new AwesomeICS.Property();

		//-- Assert
		expect(property.parameters.length).toEqual(0);
		expect(property.name).toBeNull();
		expect(property.value).toBeNull();
	});

	it("should return same string value", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";
		var property = new AwesomeICS.Property();

		//-- Act
		var propertyConverted = property.convertFromString(content);

		//-- Assert
		expect(property.toString()).toEqual(content);
		expect(propertyConverted).toBe(property);
	});

	it("should have name", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";
		var property = new AwesomeICS.Property();

		//-- Act
		var propertyConverted = property.convertFromString(content);

		//-- Assert
		expect(property.name).toEqual("PROPERTY_NAME");
		expect(propertyConverted).toBe(property);
	});

	it("should have value", function() {
		//-- Arrange
		var content = "PROPERTY_NAME:PROPERTY_VALUE";
		var property = new AwesomeICS.Property();

		//-- Act
		var propertyConverted = property.convertFromString(content);

		//-- Assert
		expect(property.value instanceof AwesomeICS.PropertyValue.Value).toBeTruthy();
		expect(propertyConverted).toBe(property);
	});

	it("should have one parameter", function() {
		//-- Arrange
		var content = "PROPERTY_NAME;VALUE=DATE:PROPERTY_VALUE";
		var property = new AwesomeICS.Property();

		//-- Act
		var propertyConverted = property.convertFromString(content);

		//-- Assert
		expect(property.parameters.length).toEqual(1);
		expect(propertyConverted).toBe(property);
	});

	it("should allow to set name", function() {
		//-- Arrange
		var name = "PROPERTY_NAME";
		var property = new AwesomeICS.Property();

		//-- Act
		var propertySet = property.setName(name);

		//-- Assert
		expect(property.name).toEqual(name);
		expect(propertySet).toBe(property);
	});

	it("should allow to set value", function() {
		//-- Arrange
		var value = new AwesomeICS.PropertyValue.Value();
		var property = new AwesomeICS.Property();

		//-- Act
		var propertySet = property.setValue(value);

		//-- Assert
		expect(property.value).toBe(value);
		expect(propertySet).toBe(property);
	});

	it("should allow only `PropertyValue` or `PropertyValueMultiple` or any child class as value", function() {
		//-- Arrange
		var invalidValue = "Invalid Property";
		var property = new AwesomeICS.Property();

		//-- Act & Assert
		expect(function() { property.setValue(invalidValue) }).toThrow();
	});

	it("should allow only `PropertyValue` or `PropertyValueMultiple` or any child class as value", function() {
		//-- Arrange
		var value = new AwesomeICS.PropertyValue.Value();
		var property = new AwesomeICS.Property();

		//-- Act
		var propertySet = property.setValue(value);

		//-- Assert
		expect(property.value).toBe(value);
		expect(property).toBe(propertySet);
	});

	it("should allow only `PropertyValue` or `PropertyValueMultiple` or any child class as value", function() {
		//-- Arrange
		var value = new AwesomeICS.PropertyValue.Boolean();
		var property = new AwesomeICS.Property();

		//-- Act
		var propertySet = property.setValue(value);

		//-- Assert
		expect(property.value).toBe(value);
		expect(property).toBe(propertySet);
	});

	it("should allow only `PropertyValue` or `PropertyValueMultiple` or any child class as value", function() {
		//-- Arrange
		var value = new AwesomeICS.PropertyValue.MultipleValue();
		var property = new AwesomeICS.Property();

		//-- Act
		var propertySet = property.setValue(value);

		//-- Assert
		expect(property.value).toBe(value);
		expect(property).toBe(propertySet);
	});

	it("should allow to add parameter", function() {
		//-- Arrange
		var property = new AwesomeICS.Property();
		var parameter = new AwesomeICS.PropertyParameter();

		//-- Act
		var propertyWithParameter = property.addParameter(parameter);

		//-- Assert
		expect(property.parameters.length).toEqual(1);
		expect(property.parameters[0]).toBe(parameter);
		expect(propertyWithParameter).toBe(property);
	});

	it("should allow only `PropertyParameter' to be added parameter", function() {
		//-- Arrange
		var property = new AwesomeICS.Property();
		var parameter = "Invalid Parameter";

		//-- Act & Assert
		expect(function() { property.addParameter(parameter) }).toThrow();
	});
});