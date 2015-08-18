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
    whitespace: " ",
    lineMaxLength: 75,
    multilineBegin: " "
};

exports.format = format;
var regex = {
    blockBegin: /^BEGIN:/i,
    blockEnd: /^END:/i,
    separator: /.+:.+/i
};
exports.regex = regex;
