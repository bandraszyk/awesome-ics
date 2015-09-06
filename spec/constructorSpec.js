var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util")
var fs			= require("fs");

describe("library", function() {

	beforeEach(function() {
		_util.applyCustomMatcher(jasmine);
	});

	it("should convert back basic ics", function() {
		//-- Arrange
		var icsFile = fs.readFileSync("./spec/ics/basic.ics", 'utf8')
			.replace(/\r/g, "").trim();

		//-- Act
		var calendar = new AwesomeICS.Calendar(icsFile);

		//-- Assert
		expect(JSON.stringify(calendar.toString())).noDiffBetween(JSON.stringify(icsFile));
	});

	it("should convert back MacOS generated ics", function() {
		//-- Arrange
		var icsFile = fs.readFileSync("./spec/ics/macos.ics", 'utf8')
			.replace(/\r/g, "").trim();

		//-- Act
		var calendar = new AwesomeICS.Calendar(icsFile);

		//-- Assert
		expect(JSON.stringify(calendar.toString())).noDiffBetween(JSON.stringify(icsFile));
	});

	it("should convert back ics with multiline description", function() {
		//-- Arrange
		var icsFile = fs.readFileSync("./spec/ics/long-description.ics", 'utf8')
			.replace(/\r/g, "").trim();

		//-- Act
		var calendar = new AwesomeICS.Calendar(icsFile);

		//-- Assert
		expect(JSON.stringify(calendar.toString())).noDiffBetween(JSON.stringify(icsFile));
	});
});