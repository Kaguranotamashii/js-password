/**
 * 摩斯密码编码和解码的实现
 * 摩斯密码使用点和划的组合来表示字母和数字
 */

const MORSE_CODE = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', 
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', ' ': ' '
};

// 创建反向映射表
const REVERSE_MORSE = Object.entries(MORSE_CODE).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

function morseEncode(input) {
  if (!input) {
    throw new Error('输入不能为空');
  }

  return input.toUpperCase().split('').map(char => {
    const code = MORSE_CODE[char];
    if (code === undefined) {
      throw new Error(`无效的字符: ${char}`);
    }
    return code;
  }).join(' ');
}

function morseDecode(input) {
  if (!input) {
    throw new Error('输入不能为空');
  }

  const words = input.split('   ');
  return words.map(word => {
    return word.split(' ').map(code => {
      if (code === '') return '';
      const char = REVERSE_MORSE[code];
      if (char === undefined) {
        throw new Error(`无效的摩斯密码: ${code}`);
      }
      return char;
    }).join('');
  }).join(' ');
}

module.exports = {
  morseEncode,
  morseDecode
};