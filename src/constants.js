export const format = {
    newLine         : "\n",
    blockBegin      : "BEGIN:",
    blockEnd        : "END:",
    separatorProp   : ":",
    separatorParam  : ";",
    separatorValue  : "=",
    separatorGeo    : ";",
    separatorMulti  : ",",
    whitespace      : " ",
    lineMaxLength   : 72,
    multilineBegin  : " ",
    values          : {
        date        : "YYYYMMDD",
        time        : "HHmmSS"
    }
};

export const regex = {
    blockBegin  : /^BEGIN:/i,
    blockEnd    : /^END:/i,
    separator   : /.+:.+/i
};