var Awesome = require("./awesome-ics");

//-- TODO: Remove test data
var file =
    "BEGIN:VCALENDAR\n \
    VERSION:2.0 \n \
    PRODID:-//hacksw/handcal//NONSGML v1.0//EN \n \
    BEGIN:VEVENT \n \
    DTSTART;TZID=\"America/New_York=2=1312\":19970714T170000Z \n \
    DTEND:19970715T035959Z \n \
    SUMMARY:       Bastille Day : Partydsd     \n \
    END:VEVENT\n \
    END:VCALENDAR\n";

var calendar = new Awesome.Calendar().loadFromText(file);

console.log(JSON.stringify(calendar.toJSON(), null, 4));
console.log(calendar.toString());