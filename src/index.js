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

console.log('test log')

document.body.appendChild(createElement())
