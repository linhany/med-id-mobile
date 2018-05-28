// symmetric key constants
const algorithm = 'aes256';
const inputEncoding = 'utf8';
const outputEncoding = 'base64';

// need to encrypt key with public key
let encryptStringWithPublicKey = (toEncrypt, publicKeyB64) => {
  // const publicKey = Buffer.from(publicKeyB64, 'base64').toString('utf8');
  // const key = new NodeRSA(publicKey);
  // return key.encrypt(toEncrypt, 'base64');
}

// need to encrypt HR with key
let encryptStringWithSymmetricKey = (toEncrypt, key) => {
  // let cipher = crypto.createCipher(algorithm, key);
  // let ciphered = cipher.update(toEncrypt, inputEncoding, outputEncoding);
  // ciphered += cipher.final(outputEncoding);
  // return ciphered;
}

module.exports = {
  encryptStringWithPublicKey: encryptStringWithPublicKey,
  encryptStringWithSymmetricKey: encryptStringWithSymmetricKey
}