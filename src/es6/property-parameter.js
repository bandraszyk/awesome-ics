import { format } from "./constants";
import { splitSafe, trim } from "./util";

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
        this.original = content;

        this.name   = splitSafe(content, format.separatorValue)[0];
        this.value = trim(content.slice(this.name.length + 1));
    }
    toString() {
        return [ this.name, this.value ].join(format.separatorValue);
    }
    toJSON() {
        return {
            name    : this.name,
            value   : this.value
        };
    }
}