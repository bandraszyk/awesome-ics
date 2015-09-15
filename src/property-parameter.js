import { splitSafe } from "./util";

const propertyTypes = [
    "ALTREP",
    "CN",
    "CUTYPE",
    "DELEGATED-FROM",
    "DELEGATED-TO",
    "DIR",
    "ENCODING",
    "FMTTYPE",
    "FBTYPE",
    "LANGUAGE",
    "MEMBER",
    "PARTSTAT",
    "RANGE",
    "RELATED",
    "RELTYPE",
    "ROLE",
    "RSVP",
    "SENT-BY",
    "TZID",
    "VALUE"
];

export class PropertyParameter {
    constructor(content) {
        this.original   = content;
        this.name       = null;
        this.value      = null;

        if (content) { this.setValueFromString(content); }
    }
    toString() {
        return [ this.name, this.value ].join(PropertyParameter.__format.separator);
    }
    toJSON() {
        return {
            name    : this.name,
            value   : this.value
        };
    }
    setValueFromString(string) {
        this.name       = splitSafe(string, PropertyParameter.__format.separator)[0];
        this.value      = string.slice(this.name.length + 1);
        return this;
    }
}

PropertyParameter.__format = {
    separator: "="
};