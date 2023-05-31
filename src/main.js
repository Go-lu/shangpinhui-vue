import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 三级联动组件 --- 全局注册-引用
import TypeNav from '@/components/TypeNav'
// 轮播图组件 --- 全局注册-引用
import Carousel from '@/components/Carousel'
// 分页器组件 --- 全局注册-引用
import Pagination from '@/components/Pagination'
//引入仓库
import store from "./store"
// 引入MockServer.js
import "./mock/mockServer"
// 引入swiper样式
import "swiper/css/swiper.css"
// 按需引入api
// import { reqCategoryList } from './api'

// 调用 reqCategoryList
// reqCategoryList();

Vue.config.productionTip = false
// 第一个参数 全局组件的名字  第二个参数 注册哪组件
// 全局注册三级联动组件
Vue.component(TypeNav.name, TypeNav);
// 全局注册轮番图组件
Vue.component(Carousel.name, Carousel);
// 全局注册分页器组件
Vue.component(Pagination.name, Pagination);

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  // 注册路由信息：当这里写下router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库：组件实例身上回多一个$store属性
  store
}).$mount('#app')
