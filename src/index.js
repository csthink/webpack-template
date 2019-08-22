import _ from 'lodash'

// import './assets/style/index.css'
// import './assets/style/test.scss'
// 使用 alias 名称
import { name } from '@/test'
import 'assets/style/index.css'
import 'assets/style/test.scss'

function createElement () {
  const div = document.createElement('div')
  div.innerHTML = _.join(['Hello', 'Webpack', name], ' ')
  div.className = 'box iconfont iconzhixianghuishou'
  return div
}

// 因为在 eslintrc 中配置了全局变量，这里不会报错
if (PRODUCTION) {
  console.log('Production log')
} else {
  console.log('Debug info')
}

// 因为在 eslintrc 中配置了全局变量，这里不会报错
console.log('SERVICE_URL:' + SERVICE_URL)

document.body.appendChild(createElement())
