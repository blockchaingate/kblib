var chai = require('chai');
var assert = chai.assert;
var Kblib = require('../index.js');
var kblib = new Kblib();
var u = require('./helpers/test.utils.js');

describe('kblib.shh', function() {
    describe('methods', function() {
        u.methodExists(kblib.shh, 'version');
        u.methodExists(kblib.shh, 'info');
        u.methodExists(kblib.shh, 'setMaxMessageSize');
        u.methodExists(kblib.shh, 'setMinPoW');
        u.methodExists(kblib.shh, 'markTrustedPeer');
        u.methodExists(kblib.shh, 'newKeyPair');
        u.methodExists(kblib.shh, 'addPrivateKey');
        u.methodExists(kblib.shh, 'deleteKeyPair');
        u.methodExists(kblib.shh, 'hasKeyPair');
        u.methodExists(kblib.shh, 'getPublicKey');
        u.methodExists(kblib.shh, 'getPrivateKey');
        u.methodExists(kblib.shh, 'newSymKey');
        u.methodExists(kblib.shh, 'addSymKey');
        u.methodExists(kblib.shh, 'generateSymKeyFromPassword');
        u.methodExists(kblib.shh, 'hasSymKey');
        u.methodExists(kblib.shh, 'getSymKey');
        u.methodExists(kblib.shh, 'deleteSymKey');
        u.methodExists(kblib.shh, 'newMessageFilter');
        u.methodExists(kblib.shh, 'post');

    });
});

