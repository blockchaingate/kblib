var Kblib = require('./lib/kblib');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Kblib === 'undefined') {
    window.Kblib = Kblib;
}

module.exports = Kblib;
