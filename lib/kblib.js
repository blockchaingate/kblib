/*!
 * kblib.js - Kanban JavaScript API
 *
 * @license lgpl-3.0
 * @see 
*/

/*
 * This file is part of kblib.js.
 * 
 * kblib.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * kblib.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with kblib.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @file kblib.js
 * @authors:
 *   Jeffrey Wilcke <jeff@ethdev.com>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 *   Gav Wood <g@ethdev.com>
 * @date 2014
 */

var RequestManager = require('./kblib/requestmanager');
var Iban = require('./kblib/iban');
var Kanban = require('./kblib/methods/kanban');
var DB = require('./kblib/methods/db');
var Shh = require('./kblib/methods/shh');
var Net = require('./kblib/methods/net');
var Personal = require('./kblib/methods/personal');
var Swarm = require('./kblib/methods/swarm');
var Debug = require('./kblib/methods/debug');
var Settings = require('./kblib/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./kblib/extend');
var Batch = require('./kblib/batch');
var Property = require('./kblib/property');
var HttpProvider = require('./kblib/httpprovider');
var IpcProvider = require('./kblib/ipcprovider');
var BigNumber = require('bignumber.js');



function Kblib (provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.kanban = new Kanban(this);
    this.db = new DB(this);
    this.shh = new Shh(this);
    this.net = new Net(this);
    this.personal = new Personal(this);
    this.debug = new Debug(this);
    this.bzz = new Swarm(this);
    this.settings = new Settings();
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider: IpcProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

// expose providers on the class
Kblib.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

Kblib.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

Kblib.prototype.reset = function (keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

Kblib.prototype.BigNumber = BigNumber;
Kblib.prototype.toHex = utils.toHex;
Kblib.prototype.toAscii = utils.toAscii;
Kblib.prototype.toUtf8 = utils.toUtf8;
Kblib.prototype.fromAscii = utils.fromAscii;
Kblib.prototype.fromUtf8 = utils.fromUtf8;
Kblib.prototype.toDecimal = utils.toDecimal;
Kblib.prototype.fromDecimal = utils.fromDecimal;
Kblib.prototype.toBigNumber = utils.toBigNumber;
Kblib.prototype.toWei = utils.toWei;
Kblib.prototype.fromWei = utils.fromWei;
Kblib.prototype.isAddress = utils.isAddress;
Kblib.prototype.isChecksumAddress = utils.isChecksumAddress;
Kblib.prototype.toChecksumAddress = utils.toChecksumAddress;
Kblib.prototype.isIBAN = utils.isIBAN;
Kblib.prototype.padLeft = utils.padLeft;
Kblib.prototype.padRight = utils.padRight;
Kblib.prototype.generateOrderHash = utils.generateOrderHash;

Kblib.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
Kblib.prototype.fromICAP = function (icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function () {
    return [
        new Property({
            name: 'version.node',
            getter: 'web3_clientVersion'
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.ethereum',
            getter: 'kanban_protocolVersion',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.whisper',
            getter: 'shh_version',
            inputFormatter: utils.toDecimal
        })
    ];
};

Kblib.prototype.isConnected = function(){
    return (this.currentProvider && this.currentProvider.isConnected());
};

Kblib.prototype.createBatch = function () {
    return new Batch(this);
};

module.exports = Kblib;
