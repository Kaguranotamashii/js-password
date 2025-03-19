# js-password

[English](./README.md) | [中文](./README.cn.md)

一个高性能的字符串破译工具库,提供各种编码和加密算法的实现.

## 特性

- 支持多种加密算法
  - ROT13密码
  - 维吉尼亚密码
  - 凯撒密码
  - 栅栏密码
  - 摩斯密码
  - 仿射密码
- 文本编码检测和转换
  - Base64解码
  - 16进制解码
  - 编码检测

## 安装

```bash
npm install js-password
```

## 使用示例

```javascript
const jsPassword = require('js-password');

// ROT13加密/解密
const encrypted = jsPassword.rot13('Hello, World!');
console.log(encrypted); // 输出: Uryyb, Jbeyq!

// 维吉尼亚密码
const text = 'HELLO';
const key = 'KEY';
const encryptedText = jsPassword.vigenereEncrypt(text, key);
const decryptedText = jsPassword.vigenereDecrypt(encryptedText, key);

// Base64解码
const decodedText = jsPassword.decodeBase64('SGVsbG8gV29ybGQ=');
```

## API文档

### 编码工具

#### detectEncoding(input)
检测输入文本的编码.
- `input`: String或Buffer - 输入文本或Buffer
- 返回值: String - 检测到的编码

#### decodeBase64(input)
解码Base64编码的字符串.
- `input`: String - Base64编码的字符串
- 返回值: String - 解码后的文本

#### decodeHex(input)
解码16进制字符串.
- `input`: String - 16进制字符串
- 返回值: String - 解码后的文本

### 加密算法

#### rot13(input)
ROT13加密/解密.
- `input`: String - 要加密/解密的文本
- 返回值: String - 加密/解密后的文本

#### vigenereEncrypt(input, key) / vigenereDecrypt(input, key)
维吉尼亚密码加密和解密.
- `input`: String - 要加密/解密的文本
- `key`: String - 加密密钥
- 返回值: String - 加密/解密后的文本

#### railFenceEncrypt(input, rails) / railFenceDecrypt(input, rails)
栅栏密码加密和解密.
- `input`: String - 要加密/解密的文本
- `rails`: Number - 栅栏数
- 返回值: String - 加密/解密后的文本

## 贡献

欢迎提交贡献!请随时提交Pull Request.

## 许可证

本项目采用MIT许可证.