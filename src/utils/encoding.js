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
  if (!input || (Buffer.isBuffer(input) && input.length === 0)) {
    throw new Error('无法检测文本编码');
  }

  if (typeof input === 'string') {
    input = Buffer.from(input, 'utf8');
  }

  const encoding = chardet.detect(input);
  if (!encoding) {
    throw new Error('无法检测文本编码');
  }

  // 由于chardet可能将UTF-8文本识别为ASCII，这里进行特殊处理
  if (encoding === 'ASCII') {
    // 检查是否包含非ASCII字符或是UTF-8格式的输入
    const str = input.toString();
    if (/[\u0080-\uffff]/.test(str) || Buffer.isBuffer(input)) {
      return 'UTF-8';
    }
  }

  return encoding;
}

/**
 * Base64解码
 * @param {string} input - Base64编码的字符串
 * @returns {string} 解码后的文本
 */
function decodeBase64(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('无效的Base64字符串');
  }
  // 检查是否符合Base64格式
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(input)) {
    throw new Error('无效的Base64字符串');
  }
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
  if (!input || typeof input !== 'string') {
    throw new Error('无效的16进制字符串');
  }
  // 清理空格和其他分隔符
  const cleanHex = input.replace(/[^0-9A-Fa-f]/g, '');
  // 检查是否有有效的16进制字符
  if (cleanHex.length === 0 || cleanHex.length % 2 !== 0) {
    throw new Error('无效的16进制字符串');
  }
  try {
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