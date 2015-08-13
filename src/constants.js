// Definition of an object that contains Constants values used within module
Awesome.Constants = {
    format: {
        newLine: "\n",
        blockBegin: "BEGIN:",
        blockEnd: "END:",
        separatorProp: ":",
        separatorParam: ";",
        separatorValue: "=",
        whitespace: " "
    },
    regex: {
        blockBegin: /^BEGIN:/i,
        blockEnd: /^END:/i,
        separator: /.+:.+/i
    }
};