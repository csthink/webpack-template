import _ from 'lodash';

import './style/index.css';

function createElement() {
  let div = document.createElement('div');
  div.innerHTML = _.join(['Hello', 'Webpack'], ' ');
  div.className = 'box';
  return div;
}

document.body.appendChild(createElement())
