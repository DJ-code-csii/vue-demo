import Vue from 'vue';
import VueRouter from 'vue-router';

// 往vue里面加一些路由vue-router维护的东西
Vue.use(VueRouter);

import inputPage from './pages/inputPage.vue';
import outputPage from './pages/outputPage.vue';


export default new VueRouter({
    routes:[{
        // 录入页
        name:'input',
        path:'/input',
        component: inputPage

    },{
        // 结果页
        name:'output',
        path:'/output',
        component: outputPage

    },{
        // 如果没有匹配到路由就重定向到默认路由
        path:'/*',
        redirect:'/input'

    }]
})