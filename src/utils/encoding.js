/**
 * 编码检测和转换工具类
 */

const chardet = require('chardet');
const Buffer = require('buffer').Buffer;

/**
 * 检测文本编码
 * @param {string|Buffer} input - 输入文本或Buffer
 * @returns {string} 检测到的编码
 */
function detectEncoding(input) {
  if (typeof input === 'string') {
    input = Buffer.from(input);
  }

  const encoding = chardet.detect(input);
  if (!encoding) {
    throw new Error('无法检测文本编码');
  }

  return encoding;
}

/**
 * Base64解码
 * @param {string} input - Base64编码的字符串
 * @returns {string} 解码后的文本
 */
function decodeBase64(input) {
  try {
    return Buffer.from(input, 'base64').toString('utf8');
  } catch (error) {
    throw new Error('无效的Base64字符串');
  }
}

/**
 * 16进制解码
 * @param {string} input - 16进制字符串
 * @returns {string} 解码后的文本
 */
function decodeHex(input) {
  try {
    const cleanHex = input.replace(/[^0-9A-Fa-f]/g, '');
    const bytes = [];
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes.push(parseInt(cleanHex.substr(i, 2), 16));
    }
    return Buffer.from(bytes).toString('utf8');
  } catch (error) {
    throw new Error('无效的16进制字符串');
  }
}

module.exports = {
  detectEncoding,
  decodeBase64,
  decodeHex
};