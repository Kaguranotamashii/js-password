/**
 * js-password API 全面测试文件
 * 测试所有加密算法和编码工具的功能
 */

const {
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
} = require('../src/index');

describe('js-password API 全面测试', () => {
  // 编码工具测试
  describe('编码工具测试', () => {
    describe('detectEncoding 函数测试', () => {
      test('应该正确检测UTF-8编码', () => {
        const input = 'Hello World';
        const result = detectEncoding(input); // UTF-8
        expect(result).toBe('UTF-8');
      });

      test('应该接受Buffer输入', () => {
        const input = Buffer.from('Hello World', 'utf8');
        const result = detectEncoding(input); // UTF-8
        expect(result).toBe('UTF-8');
      });

      test('应该抛出错误当无法检测编码', () => {
        const input = Buffer.alloc(0);
        expect(() => detectEncoding(input)).toThrow('无法检测文本编码');
      });
    });

    describe('decodeBase64 函数测试', () => {
      test('应该正确解码有效的Base64字符串', () => {
        const input = 'SGVsbG8gV29ybGQ=';
        const result = decodeBase64(input); // Hello World
        expect(result).toBe('Hello World');
      });

      test('应该解码包含特殊字符的Base64字符串', () => {
        const input = 'SGVsbG8sIFdvcmxkIQ==';
        const result = decodeBase64(input); // Hello, World!
        expect(result).toBe('Hello, World!');
      });

      test('应该抛出错误当输入无效的Base64字符串', () => {
        const input = 'invalid base64!';
        expect(() => decodeBase64(input)).toThrow('无效的Base64字符串');
      });
    });

    describe('decodeHex 函数测试', () => {
      test('应该正确解码有效的16进制字符串', () => {
        const input = '48656C6C6F20576F726C64';
        const result = decodeHex(input); // Hello World
        expect(result).toBe('Hello World');
      });

      test('应该自动清理无效字符并解码16进制字符串', () => {
        const input = '48 65 6C 6C 6F';
        const result = decodeHex(input); // Hello
        expect(result).toBe('Hello');
      });

      test('应该抛出错误当输入完全无效的16进制字符串', () => {
        const input = 'xyz';
        expect(() => decodeHex(input)).toThrow('无效的16进制字符串');
      });
    });
  });

  // 加密算法测试
  describe('加密算法测试', () => {
    describe('rot13 函数测试', () => {
      test('应该正确加密/解密字母字符', () => {
        const input = 'Hello, World!';
        const encrypted = rot13(input); // Uryyb, Jbeyq!
        expect(encrypted).toBe('Uryyb, Jbeyq!');
        expect(rot13(encrypted)).toBe(input); // 再次应用ROT13应该得到原文
      });

      test('应该保持非字母字符不变', () => {
        const input = '123!@#$%^&*()';
        const result = rot13(input); // 123!@#$%^&*()
        expect(result).toBe(input);
      });

      test('应该正确处理大小写字母', () => {
        const input = 'AbCdEfGhIjKlMnOpQrStUvWxYz';
        const expected = 'NoPqRsTuVwXyZaBcDeFgHiJkLm'; // ROT13加密结果
        expect(rot13(input)).toBe(expected);
      });
    });

    describe('vigenere 函数测试', () => {
      test('应该正确加密和解密文本', () => {
        const input = 'HELLO';
        const key = 'KEY';
        const encrypted = vigenereEncrypt(input, key); // RIJVS
        expect(vigenereDecrypt(encrypted, key)).toBe(input);
      });

      test('应该保持非字母字符不变', () => {
        const input = 'HELLO, WORLD!';
        const key = 'KEY';
        const encrypted = vigenereEncrypt(input, key); // RIJVS, UYVJN!
        expect(encrypted).toMatch(/^[A-Z]+, [A-Z]+!$/);
        expect(vigenereDecrypt(encrypted, key)).toBe(input);
      });

      test('应该自动转换为大写字母', () => {
        const input = 'Hello';
        const key = 'key';
        const encrypted = vigenereEncrypt(input, key); // RIJVS
        expect(encrypted).toMatch(/^[A-Z]+$/);
      });

      test('应该抛出错误当输入或密钥为空', () => {
        expect(() => vigenereEncrypt('', 'KEY')).toThrow('输入和密钥不能为空');
        expect(() => vigenereEncrypt('HELLO', '')).toThrow('输入和密钥不能为空');
      });

      test('应该抛出错误当密钥不包含字母', () => {
        expect(() => vigenereEncrypt('HELLO', '123')).toThrow('密钥必须包含至少一个字母');
      });
    });

    describe('caesar 函数测试', () => {
      test('应该正确加密和解密文本', () => {
        const input = 'Hello';
        const shift = 3;
        const encrypted = caesarEncrypt(input, shift); // Khoor
        expect(caesarDecrypt(encrypted, shift)).toBe(input);
      });

      test('应该保持非字母字符不变', () => {
        const input = 'Hello, World!';
        const shift = 5;
        const encrypted = caesarEncrypt(input, shift); // Mjqqt, Btwqi!
        expect(encrypted).toMatch(/^[A-Za-z]+, [A-Za-z]+!$/);
        expect(caesarDecrypt(encrypted, shift)).toBe(input);
      });

      test('应该正确处理负数位移', () => {
        const input = 'Hello';
        const shift = -3;
        const encrypted = caesarEncrypt(input, shift); // Ebiil
        expect(caesarDecrypt(encrypted, shift)).toBe(input);
      });

      test('应该抛出错误当输入为空或位移量不是数字', () => {
        expect(() => caesarEncrypt('', 3)).toThrow('输入不能为空且位移量必须是数字');
        expect(() => caesarEncrypt('Hello', '3')).toThrow('输入不能为空且位移量必须是数字');
      });
    });

    describe('bruteForceCaesar 函数测试', () => {
      test('应该返回所有可能的移位结果', () => {
        const input = 'HELLO';
        const results = bruteForceCaesar(input); // 返回26种可能的解密结果
        expect(results).toHaveLength(26);
        expect(results[0]).toHaveProperty('shift');
        expect(results[0]).toHaveProperty('text');
      });

      test('应该包含正确的解密结果', () => {
        const original = 'HELLO';
        const shift = 3;
        const encrypted = caesarEncrypt(original, shift); // KHOOR
        const results = bruteForceCaesar(encrypted);
        const correctResult = results.find(r => r.shift === (26 - shift) % 26);
        expect(correctResult.text).toBe(original);
      });
    });

    describe('railFence 函数测试', () => {
      test('应该正确加密和解密文本', () => {
        const input = 'HELLOWORLD';
        const rails = 3;
        const encrypted = railFenceEncrypt(input, rails); // HOLELWRDLO
        expect(railFenceDecrypt(encrypted, rails)).toBe(input);
      });

      test('应该处理不同栅栏数', () => {
        const input = 'DEFENDTHEEASTWALL';
        const rails = 4;
        const encrypted = railFenceEncrypt(input, rails); // DNETEDHESWLFTAAL
        expect(railFenceDecrypt(encrypted, rails)).toBe(input);
      });

      test('应该抛出错误当输入为空或栅栏数小于2', () => {
        expect(() => railFenceEncrypt('', 3)).toThrow('输入不能为空且栅栏数必须是大于1的数字');
        expect(() => railFenceEncrypt('HELLO', 1)).toThrow('输入不能为空且栅栏数必须是大于1的数字');
      });
    });

    describe('morse 函数测试', () => {
      test('应该正确编码和解码文本', () => {
        const input = 'HELLO';
        const encoded = morseEncode(input); // .... . .-.. .-.. ---
        expect(morseDecode(encoded)).toBe(input);
      });

      test('应该正确处理数字和标点符号', () => {
        const input = 'HELLO 123!';
        const encoded = morseEncode(input); // .... . .-.. .-.. ---   .---- ..--- ...-- -.-.--
        expect(morseDecode(encoded)).toBe(input);
      });

      test('应该抛出错误当输入为空', () => {
        expect(() => morseEncode('')).toThrow('输入不能为空');
        expect(() => morseDecode('')).toThrow('输入不能为空');
      });

      test('应该抛出错误当输入包含无效字符', () => {
        expect(() => morseEncode('HELLO~')).toThrow('无效的字符: ~');
      });

      test('应该抛出错误当摩斯密码无效', () => {
        expect(() => morseDecode('.... . .-.. .-.. --- -----.')).toThrow('无效的摩斯密码: -----.');
      });
    });

    describe('affine 函数测试', () => {
      test('应该正确加密和解密文本', () => {
        const input = 'HELLO';
        const a = 5;
        const b = 8;
        const encrypted = affineEncrypt(input, a, b); // RCLLA
        expect(affineDecrypt(encrypted, a, b)).toBe(input);
      });

      test('应该保持非字母字符不变', () => {
        const input = 'HELLO, WORLD!';
        const a = 7;
        const b = 11;
        const encrypted = affineEncrypt(input, a, b); // VCLLA, DAJLX!
        expect(encrypted).toMatch(/^[A-Z]+, [A-Z]+!$/);
        expect(affineDecrypt(encrypted, a, b)).toBe(input);
      });

      test('应该抛出错误当系数a与26不互质', () => {
        expect(() => affineEncrypt('HELLO', 4, 7)).toThrow('系数a必须与26互质');
        expect(() => affineDecrypt('HELLO', 13, 5)).toThrow('系数a必须与26互质');
      });

      test('应该抛出错误当输入为空或系数不是数字', () => {
        expect(() => affineEncrypt('', 5, 8)).toThrow('输入不能为空且系数必须是数字');
        expect(() => affineEncrypt('HELLO', '5', 8)).toThrow('输入不能为空且系数必须是数字');
      });
    });
  });
});