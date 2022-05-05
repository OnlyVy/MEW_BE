import generateAccountAddress from "./generateAccountAddress.js";
import NodeRSA from "node-rsa";
import sha256 from 'crypto-js/sha256.js';

const key = new NodeRSA({b: 512});
const secret = "MEW WALLET APP";
 
const privateKey = key.exportKey('private');
const publicKey = key.exportKey('public');

console.log(publicKey);
console.log(privateKey);

const key_private = new NodeRSA(privateKey);
const key_public = new NodeRSA(publicKey);
//Public key for encryption
const encryptedString = key_public.encrypt(secret, "base64")
console.log(encryptedString);

//Public key for encryption
const decryptedString = key_private.decrypt(encryptedString, "utf8");
console.log(decryptedString);
