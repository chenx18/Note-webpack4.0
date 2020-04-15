import _ from 'lodash';
import './../assets/font/iconfont.css';   //  字体图标
import './../assets/css/app.scss';        
import './../assets/css/index.css';

console.log('main.js');

console.log('DefinePlugin 全局变量—IS_PRODUCTION', IS_PRODUCTION);
console.log('DefinePlugin 全局变量—NODE_ENV', process.env.NODE_ENV);

//ES6中的语法 异步处理
async function sayHello(){ 
	console.log('https://www.baidu.com');
}
sayHello();