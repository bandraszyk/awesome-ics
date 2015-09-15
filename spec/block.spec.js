var AwesomeICS	= require("../dist/awesome-ics");

describe("Block", function() {
    it("should allow to set value from string", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Elements.Block();

        //-- Act
        var blockSetResult = block.convertFromString(content);

        //-- Assert
        expect(blockSetResult).toBe(block);
        expect(block.toString()).toEqual(content);
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;

        //-- Act
        var block = new AwesomeICS.Elements.Block().convertFromString(content);

        //-- Assert
        expect(block.properties.length).toEqual(0);
        expect(block.blocks.length).toEqual(0);
        expect(block.type).toBeNull();
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block().convertFromString(content);

        //-- Assert
        expect(block.toString()).toEqual(content);
    });

    it("should have type", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";

        //-- Act
        var calendar = new AwesomeICS.Elements.Block().convertFromString(content);

        //-- Assert
        expect(calendar.type).toEqual("BLOCK_NAME");
    });

    it("should have one property", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nPROPERTY_NAME:PROPERTY_VALUE\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block().convertFromString(content);

        //-- Assert
        expect(block.properties.length).toEqual(1);
    });

    it("should have one child block", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nBEGIN:BLOCK_CHILD\nEND:BLOCK_CHILD\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block().convertFromString(content);

        //-- Assert
        expect(block.blocks.length).toEqual(1);
    });

    it("should have one child block and one property", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nPROPERTY_NAME:PROPERTY_VALUE\nBEGIN:BLOCK_CHILD\nEND:BLOCK_CHILD\nEND:BLOCK_NAME";

        //-- Act
        var block = new AwesomeICS.Elements.Block().convertFromString(content);

        //-- Assert
        expect(block.properties.length).toEqual(1);
        expect(block.blocks.length).toEqual(1);
    });
});