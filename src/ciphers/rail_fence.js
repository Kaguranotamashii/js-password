/**
 * 栅栏密码加密和解密的实现
 * 栅栏密码是一种换位加密，通过将文本按照栅栏形状重新排列来实现加密
 */

function railFenceEncrypt(input, rails) {
  if (!input || typeof rails !== 'number' || rails < 2) {
    throw new Error('输入不能为空且栅栏数必须是大于1的数字');
  }

  // 创建栅栏矩阵
  const fence = Array(rails).fill('').map(() => Array(input.length).fill(''));
  let rail = 0;
  let direction = 1;

  // 填充栅栏
  for (let i = 0; i < input.length; i++) {
    fence[rail][i] = input[i];
    rail += direction;

    // 改变方向
    if (rail === rails - 1) direction = -1;
    if (rail === 0) direction = 1;
  }

  // 读取加密文本
  return fence.map(row => row.join('')).join('');
}

function railFenceDecrypt(input, rails) {
  if (!input || typeof rails !== 'number' || rails < 2) {
    throw new Error('输入不能为空且栅栏数必须是大于1的数字');
  }

  // 创建栅栏矩阵
  const fence = Array(rails).fill('').map(() => Array(input.length).fill(''));
  let rail = 0;
  let direction = 1;

  // 标记栅栏位置
  for (let i = 0; i < input.length; i++) {
    fence[rail][i] = '*';
    rail += direction;

    // 改变方向
    if (rail === rails - 1) direction = -1;
    if (rail === 0) direction = 1;
  }

  // 填充加密文本
  let index = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < input.length; j++) {
      if (fence[i][j] === '*' && index < input.length) {
        fence[i][j] = input[index++];
      }
    }
  }

  // 读取解密文本
  let result = '';
  rail = 0;
  direction = 1;
  
  for (let i = 0; i < input.length; i++) {
    result += fence[rail][i];
    rail += direction;

    // 改变方向
    if (rail === rails - 1) direction = -1;
    if (rail === 0) direction = 1;
  }

  return result;
}

module.exports = {
  railFenceEncrypt,
  railFenceDecrypt
};