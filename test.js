var AwesomeICS = require("./dist/awesome-ics");
var fs      = require('fs');


fs.readFile("sample.ics", 'utf8', function(error, data) {
    if (error) {
        console.error("There was an error while loading the file: %j", error);
        return;
    }

    console.log(data);
    var calendar = new AwesomeICS.Calendar(data);
    console.log(JSON.stringify(calendar.toJSON(), null, 4));
    console.log(calendar.toString());
});

