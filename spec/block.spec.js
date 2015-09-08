var AwesomeICS	= require("../dist/awesome-ics");
var _util		= require("./_util");

describe("Block", function() {
    beforeEach(function() { _util.applyCustomMatcher(jasmine); });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var block = new AwesomeICS.Elements.Block(content);

        //-- Assert
        expect(block.original).toBeUndefined();
        expect(block.properties.length).toEqual(0);
        expect(block.blocks.length).toEqual(0);
        expect(block.type).toBeNull();
    });

    it("should contain original content", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block(content);

        //-- Assert
        expect(block.original).toEqual(content);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block(content);

        //-- Assert
        expect(block.toString()).toEqual(content);
    });

    it("should have type", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";

        //-- Act
        var calendar = new AwesomeICS.Elements.Block(content);

        //-- Assert
        expect(calendar.type).toEqual("BLOCK_NAME");
    });

    it("should have one property", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nPROPERTY_NAME:PROPERTY_VALUE\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block(content);

        //-- Assert
        expect(block.properties.length).toEqual(1);
    });

    it("should have one child block", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nBEGIN:BLOCK_CHILD\nEND:BLOCK_CHILD\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block(content);

        //-- Assert
        expect(block.blocks.length).toEqual(1);
    });

    it("should have one child block and one property", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nPROPERTY_NAME:PROPERTY_VALUE\nBEGIN:BLOCK_CHILD\nEND:BLOCK_CHILD\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block(content);

        //-- Assert
        expect(block.properties.length).toEqual(1);
        expect(block.blocks.length).toEqual(1);
    });
});