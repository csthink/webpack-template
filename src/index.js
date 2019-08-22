import _ from 'lodash';

import './assets/style/index.css';
import './assets/style/test.scss';

function createElement() {
  let div = document.createElement('div');
  div.innerHTML = _.join(['Hello', 'Webpack'], ' ');
  div.className = 'box iconfont iconzhixianghuishou';
  return div;
}

document.body.appendChild(createElement())
