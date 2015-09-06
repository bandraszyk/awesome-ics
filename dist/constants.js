"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var format = {
    newLine: "\n",
    blockBegin: "BEGIN:",
    blockEnd: "END:",
    separatorProp: ":",
    separatorParam: ";",
    separatorValue: "=",
    separatorGeo: ";",
    separatorMulti: ",",
    separatorDateTime: "T",
    whitespace: " ",
    lineMaxLength: 72,
    multilineBegin: " ",
    values: {
        date: "YYYYMMDD",
        time: "HHmmSS",
        timeUTC: "Z",
        UTCOffset: "ZZ"
    }
};

exports.format = format;
var regex = {
    blockBegin: /^BEGIN:/i,
    blockEnd: /^END:/i,
    separator: /.+:.+/i
};
exports.regex = regex;
