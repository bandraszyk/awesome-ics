import { splitSafe, isEmptyString } from "./util";

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
    constructor() {
        this.clear();
    }
    clear() {
        this.name   = null;
        this.value  = null;

        return this;
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
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        this.name       = splitSafe(string, PropertyParameter.__format.separator)[0];
        this.value      = string.slice(this.name.length + 1);

        return this;
    }
    setName(name) {
        if (typeof name !== "string" && !(name instanceof String)) {
            throw new Error("[PropertyParameter] [setName()] The name must be an instance of `String`");
        }

        this.name = name;
        return this;
    }
    setValue(value) {
        if (typeof value !== "string" && !(value instanceof String)) {
            throw new Error("[PropertyParameter] [setName()] The value must be an instance of `String`");
        }

        this.value = value;
        return this;
    }
}

PropertyParameter.__format = {
    separator: "="
};