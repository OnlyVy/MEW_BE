import sha256 from 'crypto-js/sha256.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    constructor(senderAddress, receiverAddress, amount) {
        this.senderAddress = senderAddress;
        this.receiverAddress = receiverAddress;
        this.amount = amount;
    }

    calculateHash() {
        return sha256(this.senderAddress + this.receiverAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        if(signingKey.getPublic("hex") !== this.senderAddress) {
            throw new Error("You cannot sign transaction for other wallet");
        }
        const hashTransaction = this.calculateHash();
        const sign = signingKey.sign(hashTransaction, "base64");
        this.signature = sign.toDER("hex");
    }

    isValid() {
        if(this.senderAddress === null) return true;
        if(!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }

        const publicKey = ec.keyFromPublic(this.senderAddress, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

export default Transaction;