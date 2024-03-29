var chai = require('chai');
var assert = chai.assert; 
//var kblib = require('../../index');

var FakeHttpProvider = require('./FakeHttpProvider');

var methodExists = function (object, method) {
    it('should have method ' + method + ' implemented', function() {
        //kblib.setProvider(null);
        assert.equal('function', typeof object[method], 'method ' + method + ' is not implemented');
    });
};

var propertyExists = function (object, property) {
    it('should have property ' + property + ' implemented', function() {
        // set dummy providor, to prevent error
        // kblib.setProvider(new FakeHttpProvider());
        assert.notEqual('undefined', typeof object[property], 'property ' + property + ' is not implemented');
    });
};

module.exports = {
    methodExists: methodExists,
    propertyExists: propertyExists
};

