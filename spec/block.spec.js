var AwesomeICS	= require("../dist/awesome-ics");

describe("Block", function() {
    it("should allow to convert value from string", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Block();

        //-- Act
        var blockConverted = block.convertFromString(content);

        //-- Assert
        expect(block.toString()).toEqual(content);
        expect(blockConverted).toBe(block);
    });

    it("should be empty", function() {
        //-- Arrange
        var content = undefined;
        var block = new AwesomeICS.Block();

        //-- Act
        var blockConverted = block.convertFromString(content);

        //-- Assert
        expect(block.properties.length).toEqual(0);
        expect(block.blocks.length).toEqual(0);
        expect(block.type).toBeNull();
        expect(blockConverted).toBe(block);
    });

    it("should return same string value", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Block();

        //-- Act
        var blockConverted = block.convertFromString(content);

        //-- Assert
        expect(block.toString()).toEqual(content);
        expect(blockConverted).toBe(block);
    });

    it("should have type", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Block();

        //-- Act
        var blockConverted = block.convertFromString(content);

        //-- Assert
        expect(block.type).toEqual("BLOCK_NAME");
        expect(blockConverted).toBe(block);
    });

    it("should have one property", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nPROPERTY_NAME:PROPERTY_VALUE\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Block();

        //-- Act
        var blockConverted = block.convertFromString(content);

        //-- Assert
        expect(block.properties.length).toEqual(1);
        expect(blockConverted).toBe(block);
    });

    it("should have one child block", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nBEGIN:BLOCK_CHILD\nEND:BLOCK_CHILD\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Block();

        //-- Act
        var blockConverted = block.convertFromString(content);

        //-- Assert
        expect(block.blocks.length).toEqual(1);
        expect(blockConverted).toBe(block);
    });

    it("should have one child block and one property", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nPROPERTY_NAME:PROPERTY_VALUE\nBEGIN:BLOCK_CHILD\nEND:BLOCK_CHILD\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Block();

        //-- Act
        var blockConverted = block.convertFromString(content);

        //-- Assert
        expect(block.properties.length).toEqual(1);
        expect(block.blocks.length).toEqual(1);
        expect(blockConverted).toBe(block);
    });

    it("should allow to set type", function() {
        //-- Arrange
        var type = "EVENT";
        var block = new AwesomeICS.Block();

        //-- Act
        var blockSet = block.setType(type);

        //-- Assert
        expect(block.type).toEqual(type);
        expect(blockSet).toBe(block);
    });

    it("should allow only `String` as type", function() {
        //-- Arrange
        var type = 123;
        var block = new AwesomeICS.Block();

        //-- Act & Assert
        expect(function() { block.setType(type); }).toThrow();
    });

    it("should allow to add child block", function() {
        //-- Arrange
        var child = new AwesomeICS.Block();
        var block = new AwesomeICS.Block();

        //-- Act
        var blockWithChild = block.addBlock(child);

        //-- Assert
        expect(block.blocks.length).toEqual(1);
        expect(block.blocks[0]).toBe(child);
        expect(blockWithChild).toBe(block);
    });

    it("should allow only `Block` to be added to blocks", function() {
        //-- Arrange
        var child = "Invalid Child Block";
        var block = new AwesomeICS.Block();

        //-- Act & Assert
        expect(function() { block.addBlock(child); }).toThrow();
    });

    it("should allow to add property", function() {
        //-- Arrange
        var property = new AwesomeICS.Property();
        var block = new AwesomeICS.Block();

        //-- Act
        var blockWithProperty = block.addProperty(property);

        //-- Assert
        expect(block.properties.length).toEqual(1);
        expect(block.properties[0]).toBe(property);
        expect(blockWithProperty).toBe(block);
    });

    it("should allow only `Property` to be added to properties", function() {
        //-- Arrange
        var child = "Invalid Child Parameter";
        var block = new AwesomeICS.Block();

        //-- Act & Assert
        expect(function() { block.addProperty(child); }).toThrow();
    });

    it("should allow to clear the value", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nPROPERTY_NAME:PROPERTY_VALUE\nBEGIN:BLOCK_CHILD\nEND:BLOCK_CHILD\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Block().convertFromString(content);

        //-- Act
        var blockCleared = block.clear();

        //-- Assert
        expect(block.type).toBeNull();
        expect(block.properties.length).toEqual(0);
        expect(block.blocks.length).toEqual(0);
        expect(blockCleared).toBe(block);
    });

    it("should clear the value during empty string conversion", function() {
        //-- Arrange
        var content = "BEGIN:BLOCK_NAME\nPROPERTY_NAME:PROPERTY_VALUE\nBEGIN:BLOCK_CHILD\nEND:BLOCK_CHILD\nEND:BLOCK_NAME";
        var block = new AwesomeICS.Block().convertFromString(content);

        //-- Act
        var blockCleared = block.convertFromString();

        //-- Assert
        expect(block.type).toBeNull();
        expect(block.properties.length).toEqual(0);
        expect(block.blocks.length).toEqual(0);
        expect(blockCleared).toBe(block);
    });
});