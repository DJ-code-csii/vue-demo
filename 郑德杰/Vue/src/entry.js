import Vue from 'vue';
// import Vue from 'vue/dist/main.js'

// 引入主页面
import App from './App.vue';
// 引入路由配置文件
import router from './router';

// 引入公共指令
import './directives/index';

// 引入公共组件
import './components/index';

// import image2d from './image2d';不需要这个
// image2D().afterTo   image方法


// 创建根Vue实例对象
new Vue({
    // 挂载点
    el: document.getElementById('root'),
    // template:'<span>我来了</span>'

    // 挂载路由
    router,
    // 这里的router是简写

    render: createElement => {
        return createElement(App);
    }
})