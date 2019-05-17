var chai = require('chai');
var assert = chai.assert;
var Kblib = require('../index.js');
var kblib = new Kblib();
var u = require('./helpers/test.utils.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

describe('kblib.net', function() {
    describe('methods', function() {
        // set dummy providor, to prevent error
        kblib.setProvider(new FakeHttpProvider());
        u.propertyExists(kblib.personal, 'listAccounts');
        u.methodExists(kblib.personal, 'newAccount');
        u.methodExists(kblib.personal, 'unlockAccount');
    });
});
