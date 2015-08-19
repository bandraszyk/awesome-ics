export const format = {
    newLine         : "\n",
    blockBegin      : "BEGIN:",
    blockEnd        : "END:",
    separatorProp   : ":",
    separatorParam  : ";",
    separatorValue  : "=",
    separatorGeo    : ";",
    whitespace      : " ",
    lineMaxLength   : 75,
    multilineBegin  : " "
};

export const regex = {
    blockBegin  : /^BEGIN:/i,
    blockEnd    : /^END:/i,
    separator   : /.+:.+/i
};