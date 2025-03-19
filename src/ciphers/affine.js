/**
 * 仿射密码加密和解密的实现
 * 仿射密码是一种单字母替换密码，每个字母按照f(x) = (ax + b) mod m进行加密
 * 其中a和m必须互质，m是字母表的大小（通常为26）
 */

// 计算最大公约数
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 计算模反元素
function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1;
}

function affineEncrypt(input, a, b) {
  if (!input || typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('输入不能为空且系数必须是数字');
  }

  // 确保a与26互质
  if (gcd(a, 26) !== 1) {
    throw new Error('系数a必须与26互质');
  }

  return input.replace(/[a-zA-Z]/g, char => {
    const code = char.charCodeAt(0);
    const isUpperCase = code >= 65 && code <= 90;
    const base = isUpperCase ? 65 : 97;
    const x = code - base;
    const encryptedCode = ((a * x + b) % 26 + 26) % 26;
    return String.fromCharCode(encryptedCode + base);
  });
}

function affineDecrypt(input, a, b) {
  if (!input || typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('输入不能为空且系数必须是数字');
  }

  // 确保a与26互质
  if (gcd(a, 26) !== 1) {
    throw new Error('系数a必须与26互质');
  }

  // 计算a的模反元素
  const aInverse = modInverse(a, 26);

  return input.replace(/[a-zA-Z]/g, char => {
    const code = char.charCodeAt(0);
    const isUpperCase = code >= 65 && code <= 90;
    const base = isUpperCase ? 65 : 97;
    const y = code - base;
    const decryptedCode = ((aInverse * (y - b)) % 26 + 26) % 26;
    return String.fromCharCode(decryptedCode + base);
  });
}

module.exports = {
  affineEncrypt,
  affineDecrypt
};