module.exports = {
  root: true, // 告诉 eslint此配置文件是顶级，不要再往上找了
  parser: 'babel-eslint', // 指定eslint解析器
  parserOptions: { //指定javaScript语言类型和风格
    sourceType: 'module', // 指定js导入的方式,默认是script,此处设置为module,指某块导入方式
    "ecmaVersion": 6 // 指定要使用的ECMAScript版本，默认值5
  },
  env: { // 指定环境的全局变量,下面的配置指定为浏览器环境
    browser: true,
    node: true
  },
  extends: 'standard', // 配置标准的js风格
  globals: {
    NODE_ENV: false,
    PRODUCTION: "readonly",
    SERVICE_URL: "readonly"
  },
  'rules': {
    'arrow-parens': 'off', // 允许使用箭头函数
    'genetator-start-spacing': 'off', // 允许方法之间加星号(ES6的生成器函数)
    'no-unused-expressions': [ // 禁止无用的表达式
      "error",
      {
        "allowTernary": true,
        "allowShortCircuit": true
      }
    ],
    'no-bitwise': [ //不允许使用位运算符
      "error",
      {
        "allow": ["~"]
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off' // 允许在开发环境下使用debugger
  }
}
