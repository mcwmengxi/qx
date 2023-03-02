module.exports = {
  printWidth: 140, // 指定代码换行的行长度
  tabWidth: 2,
  useTabs: true, //使用空格代替tab缩进
  singleQuote: true, // 是否使用单引号
  semi: false, //句末使用分号
  endOfLine: "auto", //文件每行结束的格式
  bracketSpacing: true, // 是否在对象属性添加空格
  arrowParens: "avoid", // 箭头函数单个参数的情况是否省略括号 always/avoid
  trailingComma: "none" // 尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境
}
