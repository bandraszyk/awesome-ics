
var AwesomeICS	= require('../dist/awesome-ics');
var fs			= require('fs');
var jsdiff		= require('diff');

//-- Define custom marchers
var customMachers = {
	toBeAwesome: function (util, customEqualityTesters) { return {
		compare: function (actual, expected) {
			if (expected === undefined)
				expected = '';

			var result = { message: '', pass: true };

			//-- Match
			result.pass = (actual === expected);

			//-- Message
			if (!result.pass) {
				//-- Get differences
				var diff = jsdiff.diffLines(JSON.parse(actual), JSON.parse(expected));
				//-- Prepare message
				for (var i = 0; i < diff.length; i++) {
					result.message += 
						diff[i].added ? '+++' : 
						diff[i].removed ? '---' : '';
					result.message += diff[i].value;
				}
			}	

			return result;
		}
	}} 
}


describe("library", function() {

	beforeEach(function() {
		//-- Register custom matcher
		jasmine.addMatchers(customMachers);
	});

	it("should convert back basic ics", function() {
		//-- Arrange
		var icsFile = fs.readFileSync("./spec/ics/basic.ics", 'utf8')
			.replace(/\r/g, "").trim();

		//-- Act
		var calendar = new AwesomeICS.Calendar(icsFile);

		//-- Assert
		expect(JSON.stringify(calendar.toString())).toBeAwesome(JSON.stringify(icsFile));
	});

	it("should convert back MacOS generated ics", function() {
		//-- Arrange
		var icsFile = fs.readFileSync("./spec/ics/macos.ics", 'utf8')
			.replace(/\r/g, "").trim();

		//-- Act
		var calendar = new AwesomeICS.Calendar(icsFile);

		//-- Assert
		expect(JSON.stringify(calendar.toString())).toBeAwesome(JSON.stringify(icsFile));
	});

	it("should convert back ics with multiline description", function() {
		//-- Arrange
		var icsFile = fs.readFileSync("./spec/ics/long-description.ics", 'utf8')
			.replace(/\r/g, "").trim();

		//-- Act
		var calendar = new AwesomeICS.Calendar(icsFile);

		//-- Assert
		expect(JSON.stringify(calendar.toString())).toBeAwesome(JSON.stringify(icsFile));
	});
});