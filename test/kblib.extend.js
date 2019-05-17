var chai = require('chai');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var Kblib = require('../lib/kblib');
var kblib = new Kblib();


var tests = [{
    properties: [new kblib._extend.Property({
        name: 'gasPrice',
        getter: 'kanban_gasPrice',
        outputFormatter: kblib._extend.formatters.outputBigNumberFormatter
    })]
},{
    methods: [new kblib._extend.Method({
        name: 'getBalance',
        call: 'kanban_getBalance',
        params: 2,
        inputFormatter: [kblib._extend.utils.toAddress, kblib._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: kblib._extend.formatters.outputBigNumberFormatter
    })]
},{
    property: 'admin',
    properties: [new kblib._extend.Property({
        name: 'gasPrice',
        getter: 'kanban_gasPrice',
        outputFormatter: kblib._extend.formatters.outputBigNumberFormatter
    })],
    methods: [new kblib._extend.Method({
        name: 'getBalance',
        call: 'kanban_getBalance',
        params: 2,
        inputFormatter: [kblib._extend.utils.toAddress, kblib._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: kblib._extend.formatters.outputBigNumberFormatter
    })]
}];

describe('kblib', function () {
    describe('_extend', function () {
        tests.forEach(function (test, index) {
            it('test no: ' + index, function () {
                kblib._extend(test);


                if(test.properties)
                    test.properties.forEach(function(property){

                        var provider = new FakeHttpProvider();
                        kblib.setProvider(provider);
                        provider.injectResult('');
                        provider.injectValidation(function (payload) {
                            assert.equal(payload.jsonrpc, '2.0');
                            assert.equal(payload.method, property.getter);
                        });

                        if(test.property) {
                            assert.isObject(kblib[test.property][property.name]);
                            assert.isFunction(kblib[test.property]['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);
                        } else {
                            assert.isObject(kblib[property.name]);
                            assert.isFunction(kblib['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);                        
                        }
                    });

                if(test.methods)
                    test.methods.forEach(function(property){
                        if(test.property)
                            assert.isFunction(kblib[test.property][property.name]);
                        else
                            assert.isFunction(kblib[property.name]);
                    });

            });
        });
    });
});

