const {
  decodeBase64,
  decodeHex,
  xorCipher,
  bruteForceCaesar,
  detectEncoding
} = require('../src/index');

describe('字符串破译工具库测试', () => {
  describe('Base64解码测试', () => {
    test('应该正确解码有效的Base64字符串', () => {
      const input = 'SGVsbG8gV29ybGQ=';
      expect(decodeBase64(input)).toBe('Hello World');
    });

    test('应该抛出错误当输入无效的Base64字符串', () => {
      const input = 'invalid base64!';
      expect(() => decodeBase64(input)).toThrow('无效的Base64字符串');
    });
  });

  describe('16进制解码测试', () => {
    test('应该正确解码有效的16进制字符串', () => {
      const input = '48656C6C6F20576F726C64';
      expect(decodeHex(input)).toBe('Hello World');
    });

    test('应该自动清理无效字符并解码16进制字符串', () => {
      const input = '48 65 6C 6C 6F';
      expect(decodeHex(input)).toBe('Hello');
    });

    test('应该抛出错误当输入完全无效的16进制字符串', () => {
      const input = 'xyz';
      expect(() => decodeHex(input)).toThrow('无效的16进制字符串');
    });
  });

  describe('异或加密/解密测试', () => {
    test('应该正确执行异或加密和解密', () => {
      const input = 'Hello';
      const key = 'Key';
      const encrypted = xorCipher(input, key);
      expect(xorCipher(encrypted, key)).toBe(input);
    });

    test('应该抛出错误当输入或密钥为空', () => {
      expect(() => xorCipher('', 'key')).toThrow('输入和密钥不能为空');
      expect(() => xorCipher('input', '')).toThrow('输入和密钥不能为空');
    });
  });

  describe('凯撒密码暴力破解测试', () => {
    test('应该返回所有可能的移位结果', () => {
      const input = 'HELLO';
      const results = bruteForceCaesar(input);
      expect(results).toHaveLength(26);
      expect(results[0]).toHaveProperty('shift');
      expect(results[0]).toHaveProperty('text');
    });

    test('应该保持非字母字符不变', () => {
      const input = 'HELLO, WORLD!';
      const results = bruteForceCaesar(input);
      results.forEach(result => {
        expect(result.text).toMatch(/^[A-Z]+, [A-Z]+!$/);
      });
    });
  });

  describe('文本编码检测测试', () => {
    test('应该正确检测UTF-8编码', () => {
      const input = 'Hello World';
      expect(detectEncoding(input)).toBe('UTF-8');
    });

    test('应该接受Buffer输入', () => {
      const input = Buffer.from('Hello World', 'utf8');
      expect(detectEncoding(input)).toBe('UTF-8');
    });

    test('应该抛出错误当无法检测编码', () => {
      const input = Buffer.alloc(0);
      expect(() => detectEncoding(input)).toThrow('无法检测文本编码');
    });
  });
});