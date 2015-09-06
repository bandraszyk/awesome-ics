export const format = {
    newLine             : "\n",
    blockBegin          : "BEGIN:",
    blockEnd            : "END:",
    separatorProp       : ":",
    separatorParam      : ";",
    separatorValue      : "=",
    separatorGeo        : ";",
    separatorMulti      : ",",
    separatorDateTime   : "T",
    whitespace          : " ",
    lineMaxLength       : 72,
    multilineBegin      : " ",
    values              : {
        date            : "YYYYMMDD",
        time            : "HHmmSS",
        timeUTC         : "Z",
        UTCOffset       : "ZZ"
    }
};

export const regex = {
    blockBegin  : /^BEGIN:/i,
    blockEnd    : /^END:/i,
    separator   : /.+:.+/i
};