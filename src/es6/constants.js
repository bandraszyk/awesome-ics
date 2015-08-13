export const format = {
    newLine: "\n",
    blockBegin: "BEGIN:",
    blockEnd: "END:",
    separatorProp: ":",
    separatorParam: ";",
    separatorValue: "=",
    whitespace: " "
};

export const regex = {
    blockBegin: /^BEGIN:/i,
    blockEnd: /^END:/i,
    separator: /.+:.+/i
};