// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from '@/router/routes'
// 使用插件
Vue.use(VueRouter);

// 配置路由
export default new VueRouter({
    // 配置路由
    routes,
    scrollBehavior(){
        return {y: 0}
    }
})