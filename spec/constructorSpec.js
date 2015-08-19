
var AwesomeICS	= require('../dist/awesome-ics');
var fs			= require('fs');

describe("library", function() {

	it("should convert back basic ics", function() {
		//-- Arrange
		var icsFile = fs.readFileSync("./spec/ics/basic.ics", 'utf8').replace(/\r/g, "");

		//-- Act
		var calendar = new AwesomeICS.Calendar(icsFile);

		//-- Assert
		expect(JSON.stringify(calendar.toString())).toEqual(JSON.stringify(icsFile));
	});

	it("should convert back MacOS generated ics", function() {
		//-- Arrange
		var icsFile = fs.readFileSync("./spec/ics/macos.ics", 'utf8').replace(/\r/g, "");

		//-- Act
		var calendar = new AwesomeICS.Calendar(icsFile);

		//-- Assert
		expect(JSON.stringify(calendar.toString())).toEqual(JSON.stringify(icsFile));
	});
});