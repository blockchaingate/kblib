const ecc = require('tiny-secp256k1');
var BIP39 = require('bip39');
const { BIP32Factory } = require('bip32');
const BIP32 = BIP32Factory(ecc);
// const { ECPairFactory } = require('ecpair');
// const ECPair = ECPairFactory(ecc);
const Btc = require('bitcoinjs-lib');
const bs58 = require('bs58');
// const { ETH_BIGNUMBER_ROUNDING_MODE } = require('../utils/config');
const CustomCommon = require('ethereumjs-common').default;
const EthereumTx = require('ethereumjs-tx').Transaction;

const networkOptions = ['MAINNET', 'TESTNET'];
const networks = {
  MAINNET: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  TESTNET: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  }
}
const customCommon = { 
  MAINNET: CustomCommon.forCustomChain(
    'mainnet',
    {
      name: 'mainnet',
      networkId: 211,
      chainId: 211
    },
      'byzantium'
  ),
  TESTNET: CustomCommon.forCustomChain(
    'mainnet',
    {
      name: 'test',
      networkId: 212,
      chainId: 212
    },
    'byzantium'
  )
}

/**
 * Returns true if given string is a valid log topic.
 *
 * @method deriveFromMnemonic
 * @param {String} mnemonic
 * @param {String} network {optional}
 * @return {Object}
 */
 var deriveFromMnemonic = function (mnemonic, network = 'MAINNET') {
  try {
    if (!networkOptions.includes(network)){
      throw Error('network field must be "MAINNET" or "TESTNET"')
    }
    const seed = BIP39.mnemonicToSeedSync(mnemonic);
    let path = 'm/44\'/' + 1150 + '\'/0\'/' + 0 + '/' + 0;
    let net = networks[network];

    let root = BIP32.fromSeed(seed
      , net
      );

    let childNode = root.derivePath(path);
    const privateKey = childNode.privateKey;
    const { address } = Btc.payments.p2pkh({
      pubkey: childNode.publicKey,
      network: net
    });
   let bytes = bs58.decode(address)
   let hexAddressUntrimmed = Buffer.from(bytes).toString('hex');
   let kanbanAddress = `0x${hexAddressUntrimmed.slice(2, 42)}`

    return {
      privateKey: privateKey.toString('hex'),
      privateKeyWIF: childNode.toWIF(),
      publicKey: childNode.publicKey.toString('hex'),
      address: kanbanAddress
    }

  } catch (error) {
    throw Error(`Error in deriveFromMnemonic: ${error.message}`) 
  }
};

/* //importFromWIF not finished. not working.


var importFromWIF = function (privateKeyWIF, network = 'MAINNET') {
  try {
    if (!networkOptions.includes(network)){
      throw Error('network field must be "MAINNET" or "TESTNET"')
    }
    const net = networks[network];
    const keyPair = ECPair.fromWIF(privateKeyWIF, net)
    const getMethods = (obj) => {
      let properties = new Set()
      let currentObj = obj
      do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
      } while ((currentObj = Object.getPrototypeOf(currentObj)))
      return [...properties.keys()].filter(item => typeof obj[item] === 'function')
    }
    
    console.log('keyPair: ', getMethods(keyPair));
    console.log({
      privateKey: keyPair.compressed,
      publicKey: 'keyPair.getPublicKey',
      address: ''
    })
    return {
      privateKey: privateKey,
      publicKey: 'keyPair.getPublicKey',
      address: ''
    };
  } catch (error) {
    throw Error(`Error in importFromWIF: ${error}`) 
  }
}
*/

var signTransaction = function (transactionObject, privateKey, network = 'MAINNET') {
  try {
    // check if network conforms to expectations
    if (!networkOptions.includes(network)){
      throw Error('network field must be "MAINNET" or "TESTNET"')
    }
    const common = customCommon[network];

    // check if second paramter conforms to expectations
    if (typeof(privateKey) !== 'string') {
      throw Error('privateKey must be a string');
    }
    if (privateKey.replace('0x', '').length !== 64) {
      throw Error('privateKey must be a string');
    }
    
    // check if first paramter conforms to expectations
    // can be a contract creation (no 'to' field. optional value field.)
    // or sendtocontract (optional value field. mandatory 'data' field. mandatory 'to' field)
    // or just send transaction. (mandatory 'to' field. no 'data' field. mandatory 'value' field).
    if (typeof(transactionObject) !== 'object'){
      throw Error('type of transactionObject must be object');
    }

    switch(true) {
      case !transactionObject.hasOwnProperty('gasPrice'):
        throw Error('transaction object missing property "gasPrice"');
      case !transactionObject.hasOwnProperty('gasLimit'):
        throw Error('transaction object missing property "gasLimit"');
      case !transactionObject.hasOwnProperty('nonce'):
        throw Error('transaction object missing property "nonce"');
    }

    let finalizedTransactionObject = {
      gasLimit: transactionObject['gasLimit'],
      gasPrice: transactionObject['gasPrice'],
      nonce: transactionObject['nonce'],
    };

    if (!objectPropertyValidator(transactionObject, 'to')){
      // has no 'to' field
      // likely to be a contract creation transaction
      if (!objectPropertyValidator(transactionObject, 'data')) {
        throw Error('transaction may leave "to" and "data" field empty, but not both');
      }
      finalizedTransactionObject['to'] = '0x';
      finalizedTransactionObject['data'] = transactionObject.data;
      finalizedTransactionObject['value'] = transactionObject.value || '0x0';
    } else if (!objectPropertyValidator(transactionObject, 'data')) {
          // likely to be a send transaction
          if (!objectPropertyValidator(transactionObject, 'value')) {
            throw Error('"value" field is mandatory for transctions of the "send" type, and must be set explicitly');
          }
          finalizedTransactionObject['to'] = transactionObject.to;
          finalizedTransactionObject['data'] = transactionObject.data || '0x';
          finalizedTransactionObject['value'] = transactionObject.value;
    } else {
          // likely to be a sendtocontract transaction
          finalizedTransactionObject['to'] = transactionObject.to;
          finalizedTransactionObject['data'] = transactionObject.data;
          finalizedTransactionObject['value'] = transactionObject.value || '0x0';
    }
    let transaction = new EthereumTx(finalizedTransactionObject, { common: common });
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    transaction.sign(privateKeyBuffer, common);
    const serializedTx = transaction.serialize();
    txhex = '0x' + serializedTx.toString('hex');     
    return txhex; 

    function objectPropertyValidator(obj, fieldName) {
      if (obj.hasOwnProperty(fieldName) && obj.fieldName !== null && typeof(obj[fieldName]) === 'string' && obj[fieldName].length > 0){
        return true
      } else {
        return false
      }
    }
  } catch (error) {
    throw new Error(`signTransaction met an error: ${error.message}`)
  }
}

module.exports = {
  deriveFromMnemonic: deriveFromMnemonic,
  // importFromWIF: importFromWIF // importFromWIF not finished. not working.
  signTransaction: signTransaction,
};
