var Kblib = require('../index.js');
var kblib = new Kblib();
var u = require('./helpers/test.utils.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

describe('kblib', function() {
    describe('methods', function () {
        // set dummy providor, to prevent error
        kblib.setProvider(new FakeHttpProvider());

        u.methodExists(kblib, 'sha3');
        u.methodExists(kblib, 'toAscii');
        u.methodExists(kblib, 'fromAscii');
        u.methodExists(kblib, 'toDecimal');
        u.methodExists(kblib, 'fromDecimal');
        u.methodExists(kblib, 'fromWei');
        u.methodExists(kblib, 'toWei');
        u.methodExists(kblib, 'toBigNumber');
        u.methodExists(kblib, 'isAddress');
        u.methodExists(kblib, 'setProvider');
        u.methodExists(kblib, 'reset');

        u.propertyExists(kblib, 'providers');
        u.propertyExists(kblib, 'kanban');
        u.propertyExists(kblib, 'db');
        u.propertyExists(kblib, 'shh');
    });
});

