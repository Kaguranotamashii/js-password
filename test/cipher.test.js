const {
  rot13,
  vigenereEncrypt,
  vigenereDecrypt
} = require('../src/index');

describe('高级加密算法测试', () => {
  describe('ROT13加密/解密测试', () => {
    test('应该正确加密/解密字母字符', () => {
      const input = 'Hello, World!';
      const encrypted = rot13(input);
      expect(encrypted).toBe('Uryyb, Jbeyq!');
      expect(rot13(encrypted)).toBe(input);
    });

    test('应该保持非字母字符不变', () => {
      const input = '123!@#$%^&*()';
      expect(rot13(input)).toBe(input);
    });

    test('应该正确处理大小写字母', () => {
      const input = 'AbCdEfGhIjKlMnOpQrStUvWxYz';
      const expected = 'NoPqRsTuVwXyZaBcDeFgHiJkLm';
      expect(rot13(input)).toBe(expected);
    });
  });

  describe('维吉尼亚密码测试', () => {
    test('应该正确加密和解密文本', () => {
      const input = 'HELLO';
      const key = 'KEY';
      const encrypted = vigenereEncrypt(input, key);
      expect(vigenereDecrypt(encrypted, key)).toBe(input);
    });

    test('应该保持非字母字符不变', () => {
      const input = 'HELLO, WORLD!';
      const key = 'KEY';
      const encrypted = vigenereEncrypt(input, key);
      expect(encrypted).toMatch(/^[A-Z]+, [A-Z]+!$/);
      expect(vigenereDecrypt(encrypted, key)).toBe(input);
    });

    test('应该自动转换为大写字母', () => {
      const input = 'Hello';
      const key = 'key';
      const encrypted = vigenereEncrypt(input, key);
      expect(encrypted).toMatch(/^[A-Z]+$/);
    });

    test('应该抛出错误当输入或密钥为空', () => {
      expect(() => vigenereEncrypt('', 'KEY')).toThrow('输入和密钥不能为空');
      expect(() => vigenereEncrypt('HELLO', '')).toThrow('输入和密钥不能为空');
      expect(() => vigenereDecrypt('', 'KEY')).toThrow('输入和密钥不能为空');
      expect(() => vigenereDecrypt('HELLO', '')).toThrow('输入和密钥不能为空');
    });

    test('应该抛出错误当密钥不包含字母', () => {
      expect(() => vigenereEncrypt('HELLO', '123')).toThrow('密钥必须包含至少一个字母');
      expect(() => vigenereDecrypt('HELLO', '123')).toThrow('密钥必须包含至少一个字母');
    });
  });
});