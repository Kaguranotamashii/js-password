/**
 * js-password
 * 高性能字符串破译工具库
 */

const { detectEncoding, decodeBase64, decodeHex } = require('./utils/encoding');
const rot13 = require('./ciphers/rot13');
const { vigenereEncrypt, vigenereDecrypt } = require('./ciphers/vigenere');
const { caesarEncrypt, caesarDecrypt, bruteForceCaesar } = require('./ciphers/caesar');
const { railFenceEncrypt, railFenceDecrypt } = require('./ciphers/rail_fence');
const { morseEncode, morseDecode } = require('./ciphers/morse');
const { affineEncrypt, affineDecrypt } = require('./ciphers/affine');


module.exports = {
  // 编码工具
  detectEncoding,
  decodeBase64,
  decodeHex,
  
  // 加密算法
  rot13,
  vigenereEncrypt,
  vigenereDecrypt,
  caesarEncrypt,
  caesarDecrypt,
  bruteForceCaesar,
  railFenceEncrypt,
  railFenceDecrypt,
  morseEncode,
  morseDecode,
  affineEncrypt,
  affineDecrypt
};