import _ from 'lodash';
import './../assets/css/app.scss';
import './../assets/css/index.css';
function componet() {
  // let el = document.createElement('div');
  // el.innerHTML = 'Hello webpack';
  // return el;
  return "<div>Hello webpack</div>"
}
console.log(componet(), '1122')
document.body.appendChild(componet());