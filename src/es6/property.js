export class Property {
    constructor(content) {
        this.original   = content;
    }
    toString() {
        return this.original;
    }
    toJSON() {
        return { original: this.original };
    }
}