# js-password

[English](./README.md) | [中文](./README.cn.md)

A high-performance string decryption tool library that provides implementations of various encoding and encryption algorithms.

## Features

- Multiple encryption algorithm support
  - ROT13 cipher
  - Vigenère cipher
  - Caesar cipher
  - Rail fence cipher
  - Morse code
  - Affine cipher
- Text encoding detection and conversion
  - Base64 decoding
  - Hex decoding
  - Encoding detection

## Installation

```bash
npm install js-password
```

## Usage

```javascript
const jsPassword = require('js-password');

// ROT13 encryption/decryption
const encrypted = jsPassword.rot13('Hello, World!');
console.log(encrypted); // Output: Uryyb, Jbeyq!

// Vigenère cipher
const text = 'HELLO';
const key = 'KEY';
const encryptedText = jsPassword.vigenereEncrypt(text, key);
const decryptedText = jsPassword.vigenereDecrypt(encryptedText, key);

// Base64 decoding
const decodedText = jsPassword.decodeBase64('SGVsbG8gV29ybGQ=');
```

## API Documentation

### Encoding Utilities

#### detectEncoding(input)
Detects the encoding of the input text.
- `input`: String or Buffer - Input text or Buffer
- Returns: String - Detected encoding

#### decodeBase64(input)
Decodes a Base64 encoded string.
- `input`: String - Base64 encoded string
- Returns: String - Decoded text

#### decodeHex(input)
Decodes a hexadecimal string.
- `input`: String - Hexadecimal string
- Returns: String - Decoded text

### Encryption Algorithms

#### rot13(input)
ROT13 encryption/decryption.
- `input`: String - Text to encrypt/decrypt
- Returns: String - Encrypted/decrypted text

#### vigenereEncrypt(input, key) / vigenereDecrypt(input, key)
Vigenère cipher encryption and decryption.
- `input`: String - Text to encrypt/decrypt
- `key`: String - Encryption key
- Returns: String - Encrypted/decrypted text

#### railFenceEncrypt(input, rails) / railFenceDecrypt(input, rails)
Rail fence cipher encryption and decryption.
- `input`: String - Text to encrypt/decrypt
- `rails`: Number - Number of rails
- Returns: String - Encrypted/decrypted text

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.