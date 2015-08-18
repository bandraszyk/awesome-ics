
var AwesomeICS	= require('../dist/awesome-ics');
var fs			= require('fs');

describe("awesome ics", function() {

	var tests = [];
	tests.push({ name: 'should load basic ics',		ics: './spec/ics/basic.ics' });
	tests.push({ name: 'should load mac ics',		ics: './spec/ics/iCalendar.ics' });

	tests.forEach(function(item) {  
		it(item.name, function() {
			var icsFile = fs.readFileSync(item.ics, 'utf8');
			var calendar = new AwesomeICS.Calendar(icsFile);
			expect(calendar.toString()).toBe(icsFile);
		});
	});
});