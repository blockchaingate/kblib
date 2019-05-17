/* jshint ignore:start */


// Browser environment
if(typeof window !== 'undefined') {
    Kblib = (typeof window.Kblib !== 'undefined') ? window.Kblib : require('kblib');
    BigNumber = (typeof window.BigNumber !== 'undefined') ? window.BigNumber : require('bignumber.js');
}


// Node environment
if(typeof global !== 'undefined') {
    Kblib = (typeof global.Kblib !== 'undefined') ? global.Kblib : require('kblib');
    BigNumber = (typeof global.BigNumber !== 'undefined') ? global.BigNumber : require('bignumber.js');
}

/* jshint ignore:end */