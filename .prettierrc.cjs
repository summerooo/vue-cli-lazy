/**
 * Prettier 代码格式化配置文件
 * 
 * 适用于团队代码排版风格统一
 */
module.exports = {
  // 句末不加分号
  semi: false,

  // 使用单引号代替双引号
  singleQuote: true,

  // 多行时尽可能添加尾随逗号 (all: ES5/TypeScript/Object/Array 等)
  trailingComma: 'all',

  // 单行代码最大字符长度 (超过则自动换行)
  printWidth: 100,

  // 缩进空格数
  tabWidth: 2,

  // 箭头函数只有一个参数时省略括号 (如: x => x)
  arrowParens: 'avoid',

  // 换行符统一使用 LF (\n)
  endOfLine: 'lf',
}
