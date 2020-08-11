import Vue from 'vue';
// import Vue from 'vue/dist/main.js'

import App from './App.vue';
import router from './router';

// import image2d from './image2d';不需要这个
// image2D().afterTo   image方法

new Vue({
    el: document.getElementById('root'),
    // template:'<span>我来了</span>'
    router,
    // 这里的router是简写
    render: createElement => {
        return createElement(App);
    }
})