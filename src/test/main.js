import Transaction from "./transaction.js";
import BlockChain from "./blockchain.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate("83d396a24b483d7a9eacb6b4bfabb17e6f6259ceae15f46674551e35f18654ac");
const myWalletAddress = myKey.getPublic("hex");
console.log("\nMyKey: "+ myKey);
console.log("\nMyWalletAddress: "+ myWalletAddress);

let bitcoin= new BlockChain();
const trans1 = new Transaction(myWalletAddress, "Public key goes here", 10);
trans1.signTransaction(myKey);
bitcoin.addTransaction(trans1);

console.log("\nStarting the miner....");
bitcoin.mindPendingTransactions(myWalletAddress);

console.log("\nBalance of LuuDuc is ", bitcoin.getBalanceOfAddress(myWalletAddress));

console.log("Is chain valid?",  bitcoin.checkChainValidity());

console.log(bitcoin.blockchain);
