import { createRequire } from "module";
const require = createRequire(import.meta.url);

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const keyGenerator = () => {
    
    const key = ec.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");
    
    console.log("\nPrivate Key: ", privateKey);
    console.log("\nPublic Key: ", publicKey);
    return {privateKey, publicKey};
}

export default keyGenerator;