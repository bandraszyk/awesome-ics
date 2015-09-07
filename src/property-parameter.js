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
        this.name       = ""
        this.value      = "";

        if (!this.original) { return; }

        this.name       = splitSafe(content, PropertyParameter.__format.separator)[0];
        this.value      = content.slice(this.name.length + 1);
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
}

PropertyParameter.__format = {
    separator: "="
};