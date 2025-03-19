/**
 * ROT13加密/解密算法的实现
 * ROT13是一种简单的替换加密,将字母移动13位
 */

function rot13(input) {
  return input.replace(/[a-zA-Z]/g, char => {
    const code = char.charCodeAt(0);
    const isUpperCase = code >= 65 && code <= 90;
    const base = isUpperCase ? 65 : 97;
    return String.fromCharCode((code - base + 13) % 26 + base);
  });
}

module.exports = rot13;