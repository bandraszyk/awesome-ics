import { splitSafe, mapToJSON, mapToString, isEmptyString } from "./util";
import { PropertyParameter } from "./property-parameter";
import { getValue, PropertyValue, PropertyMultipleValue } from "./property-value";

export class Property {
    constructor() {
        this.clear();
    }
    clear() {
        this.parameters = [];
        this.name       = null;
        this.value      = null;
        return this;
    }
    toString() {
        let name = this.name;

        if (this.parameters.length) {
            let parameters = this.parameters.map(mapToString).join(Property.__format.separatorParameter);
            name = [ name, parameters ].join(Property.__format.separatorParameter);
        }

        let value = name + Property.__format.separatorProperty + this.value.toString();
        let returnValue = value.slice(0, Property.__format.lineMaxLength);
        let rest = value.slice(Property.__format.lineMaxLength);

        while(rest.length) {
            rest = " " + rest;
            returnValue = returnValue.concat(Property.__format.newLine + rest.slice(0, Property.__format.lineMaxLength));
            rest = rest.slice(Property.__format.lineMaxLength);
        }

        return returnValue;
    }
    toJSON() {
        return {
            name        : this.name,
            parameters  : this.parameters.map(mapToJSON),
            value       : mapToJSON(this.value)
        };
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        this.name       = splitSafe(string, Property.__format.separatorProperty)[0];
        this.value      = string.slice(this.name.length + 1);

        let parameters = splitSafe(this.name, Property.__format.separatorParameter);

        if (this.name.indexOf(Property.__format.separatorParameter) !== -1) {
            this.name       = parameters[0];
            this.parameters = parameters.slice(1).map(function(paramContent) { return new PropertyParameter().convertFromString(paramContent); });
        }

        this.value = getValue(this.name, this.value, this.parameters);
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setValue(value) {
        if (value instanceof PropertyValue || value instanceof PropertyMultipleValue) { this.value = value; }
        return this;
    }
    addParameter(parameter) {
        if (parameter instanceof PropertyParameter) { this.parameters.push(parameter); }
        return this;
    }
}

Property.__format = {
    separatorProperty   : ":",
    separatorParameter  : ";",
    lineMaxLength       : 72,
    newLine             : "\n",
    multiLineBegin      : " "
};