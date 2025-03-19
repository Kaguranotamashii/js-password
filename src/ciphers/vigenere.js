/**
 * 维吉尼亚密码加密和解密的实现
 */

function vigenereEncrypt(input, key) {
  if (!input || !key) {
    throw new Error('输入和密钥不能为空');
  }

  input = input.toUpperCase();
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key) {
    throw new Error('密钥必须包含至少一个字母');
  }

  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char >= 'A' && char <= 'Z') {
      const inputCode = char.charCodeAt(0) - 65;
      const keyCode = key[keyIndex % key.length].charCodeAt(0) - 65;
      const encryptedCode = (inputCode + keyCode) % 26;
      result += String.fromCharCode(encryptedCode + 65);
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

function vigenereDecrypt(input, key) {
  if (!input || !key) {
    throw new Error('输入和密钥不能为空');
  }

  input = input.toUpperCase();
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key) {
    throw new Error('密钥必须包含至少一个字母');
  }

  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char >= 'A' && char <= 'Z') {
      const inputCode = char.charCodeAt(0) - 65;
      const keyCode = key[keyIndex % key.length].charCodeAt(0) - 65;
      const decryptedCode = (inputCode - keyCode + 26) % 26;
      result += String.fromCharCode(decryptedCode + 65);
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

module.exports = {
  vigenereEncrypt,
  vigenereDecrypt
};