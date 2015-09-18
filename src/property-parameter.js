//     Awesome ICS v0.1.0
//     http://bandraszyk.github.io/awesome-ico/
//     (c) 2015 Bandro
//     Awesome ICS may be freely distributed under the MIT license.

import { splitSafe, isEmptyString } from "./util";

// ### Define: property types
// > This variable should be used in the future to handle types of properties to filter out invalid ones according to documentation.
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

// ### Class: PropertyParameter
// > Defines `PropertyParameter` class that ca be used to specify Parameter special attributes
export class PropertyParameter {
    // Initializes object with default values
    constructor() {
        this.clear();
    }
    // Clears the `PropertyParameter` by setting default values
    clear() {
        this.name   = null;
        this.value  = null;

        return this;
    }
    // Converts `PropertyParameter` to string
    toString() {
        return `${this.name}${PropertyParameter.__format.separator}${this.value}`;
    }
    // Converts `PropertyParameter` to JSON object
    toJSON() {
        return {
            name    : this.name,
            value   : this.value
        };
    }
    // Converts `PropertyParameter` from string, e.g.: 'PropertyName:PropertyValue'
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        this.name       = splitSafe(string, PropertyParameter.__format.separator)[0];
        this.value      = string.slice(this.name.length + 1);

        return this;
    }
    // Sets `PropertyParameter`'s name that must be an instance of `string`
    setName(name) {
        if (typeof name !== "string" && !(name instanceof String)) {
            throw new Error("[PropertyParameter] [setName()] The name must be an instance of `String`");
        }

        this.name = name;
        return this;
    }
    // Sets `PropertyParameter`'s value that be an instance of `string`
    setValue(value) {
        if (typeof value !== "string" && !(value instanceof String)) {
            throw new Error("[PropertyParameter] [setName()] The value must be an instance of `String`");
        }

        this.value = value;
        return this;
    }
}

// ### Static members for: PropertyParameter
PropertyParameter.__format = {
    separator: "="
};