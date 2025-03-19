/**
 * 异或加密/解密的实现
 * 使用异或运算进行对称加密和解密
 */

function xorCipher(input, key) {
  if (!input || !key) {
    throw new Error('输入和密钥不能为空');
  }

  const result = [];
  for (let i = 0; i < input.length; i++) {
    const inputChar = input.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    result.push(String.fromCharCode(inputChar ^ keyChar));
  }

  return result.join('');
}

module.exports = xorCipher;