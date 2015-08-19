import { splitSafe, mapToJSON, mapToString } from "./util";
import { format } from "./constants";
import { PropertyParameter } from "./property-parameter";
import { getValue } from "./property-value";

export class Property {
    constructor(content) {
        this.original   = content;
        this.parameters = [];
        this.name       = splitSafe(content, format.separatorProp)[0];
        this.value      = content.slice(this.name.length + 1);

        let parameters = splitSafe(this.name, format.separatorParam);

        if (this.name.indexOf(format.separatorParam) !== -1) {
            this.name       = parameters[0];
            this.parameters = parameters.slice(1).map(function(paramContent) { return new PropertyParameter(paramContent); });
        }

        this.value = getValue(this.name, this.parameters, this.value);
    }
    toString() {
        let name = this.name;

        if (this.parameters.length) {
            let parameters = this.parameters.map(mapToString).join(format.separatorParam);
            name = [ name, parameters ].join(format.separatorParam);
        }

        let value = name + format.separatorProp + this.value.toString();
        let returnValue = value.slice(0, format.lineMaxLength - 1);
        let rest = value.slice(format.lineMaxLength);

        while(rest.length) {
            rest = format.multilineBegin + rest;
            returnValue = returnValue.concat(format.newLine + rest.slice(0, format.lineMaxLength - 1));
            rest = rest.slice(format.lineMaxLength);
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
}