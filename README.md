# Ethereum Voting DApp

This is a simple decentralized voting application written using the solidity programming language.
```ganache``` is used as a fake blockchain for the development purpose

> A [decentralized application](https://ethereum.stackexchange.com/questions/383/what-is-a-dapp) is the one which does not exist on a single central server

#### Tech:
- [NodeJS](https://nodejs.org/en/download/) - JavaScript runtime environment
- [Ganache CLI](https://github.com/trufflesuite/ganache-cli) - Ethereum RPC client for testing and development
- [Web3JS](https://github.com/ethereum/web3.js/) - Ethereum JavaScript API
- [SolcJS](https://github.com/ethereum/solc-js) - Javascript bindings for the solidity compiler

#### Installation: 
Open your favorite Terminal and run these commands.
```sh
$ git clone https://github.com/kamranazmat/ethereum_voting_dapp.git
$ cd ethereum_voting_dapp
$ npm install
$ node_modules/.bin/ganache-cli
```

##### Compile and Deploy:
In a new terminal window. (Make sure you have ```ganache``` running in another window)
```sh
$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
'0x78686e6050328bbb8e317465e32c22979028c8bd' // will be different for you, copy this to line 8 of index.js
```
Copy the deployedContact address to line 8 of ```index.js```
and, Now open the ```index.html``` in your browser

### Todos:

 - Deploy the contract to the public Blockchain
 - Build contracts and manage the dapp using Truffle Framework.
 - Make it more dynamic
 - Create user accounts
 - Use Docker

### Contribute

Want to contribute? Great!
contact: azmat.kamran@gmail.com
