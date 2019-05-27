var formatters = require('./formatters');
var utils = require('../utils/utils');
var coder = require('../solidity/coder.js');
var Method = require('./method');
var Property = require('./property');

// TODO: refactor, so the input params are not altered.
// it's necessary to make same 'extension' work with multiple providers
var extend = function (kblib) {
    /* jshint maxcomplexity:5 */
    var ex = function (extension) {

        var extendedObject;
        if (extension.property) {
            if (!kblib[extension.property]) {
                kblib[extension.property] = {};
            }
            extendedObject = kblib[extension.property];
        } else {
            extendedObject = kblib;
        }

        if (extension.methods) {
            extension.methods.forEach(function (method) {
                method.attachToObject(extendedObject);
                method.setRequestManager(kblib._requestManager);
            });
        }

        if (extension.properties) {
            extension.properties.forEach(function (property) {
                property.attachToObject(extendedObject);
                property.setRequestManager(kblib._requestManager);
            });
        }
    };

    ex.formatters = formatters; 
    ex.utils = utils;
    ex.Method = Method;
    ex.Property = Property;
    ex.coders = coder

    return ex;
};



module.exports = extend;

