
var AwesomeICS	= require('../dist/awesome-ics');
var fs			= require('fs');

describe("library", function() {

    it ("should convert geo-coordinates", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/geo.ics", "utf8")
            .replace(/\r/g, "").trim();

        //-- Act
        var calendar = new AwesomeICS.Calendar(icsFile);
        var coordinates = calendar.blocks[0].properties[3].toJSON().value;

        //-- Assert
        expect(coordinates.latitude).toEqual(37.386013);
        expect(coordinates.longitude).toEqual(-122.082932);
    });

    it ("should convert back geo-coordinates", function() {
        //-- Arrange
        var icsFile = fs.readFileSync("./spec/ics/geo.ics", "utf8")
            .replace(/\r/g, "").trim();

        //-- Act
        var calendar = new AwesomeICS.Calendar(icsFile);

        //-- Assert
        expect(JSON.stringify(calendar.toString())).toEqual(JSON.stringify(icsFile));
    });
});