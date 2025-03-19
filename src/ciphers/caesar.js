/**
 * 凯撒密码加密和解密的实现
 * 凯撒密码是一种替换加密，将字母表上的每个字母移动特定位数
 */

function caesarEncrypt(input, shift) {
  if (!input || typeof shift !== 'number') {
    throw new Error('输入不能为空且位移量必须是数字');
  }

  // 确保位移量在0-25之间
  shift = ((shift % 26) + 26) % 26;

  return input.replace(/[a-zA-Z]/g, char => {
    const code = char.charCodeAt(0);
    const isUpperCase = code >= 65 && code <= 90;
    const base = isUpperCase ? 65 : 97;
    return String.fromCharCode((code - base + shift) % 26 + base);
  });
}

function caesarDecrypt(input, shift) {
  // 解密就是向反方向移动，即用26减去位移量
  return caesarEncrypt(input, (26 - shift) % 26);
}

/**
 * 暴力破解凯撒密码，返回所有可能的结果
 */
function bruteForceCaesar(input) {
  const results = [];
  for (let shift = 0; shift < 26; shift++) {
    results.push({
      shift,
      text: caesarDecrypt(input, shift)
    });
  }
  return results;
}

module.exports = {
  caesarEncrypt,
  caesarDecrypt,
  bruteForceCaesar
};