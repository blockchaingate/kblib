# kanbanwebapi documentation


## Web3.eth

| Property                | Return-type               | Description                                                      |
|-------------------------|---------------------------|------------------------------------------------------------------|
| eth.coinbase            | string                    | the coinbase address to which mining rewards will go             |
| eth.mining              | boolean                   | checks whether the node is mining or not                         |
| eth.hashrate            | number                    | number of hashes per second that the node is mining with         |
| eth.syncing             | syncing object or boolean | if node is syncing, returns syncing object, otherwise false      |
| eth.gasPrice            | BigNumber                 | current gas price oracle determined by median of last few blocks |   // confirm if should exist
| eth.accounts            | array of accounts         | array of addresses controlled by node                            |   // confirm return type & if works
| eth.blockNumber         | object                    | object containing "blockNumber" and "blockNumberHex"             |
| eth.protocolVersion     | string                    | protocol version of the node in hexadecimal format               |   // confirm if produces kanban version


