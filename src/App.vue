<template>
    <div id="app">
      <MyHeader/>
      <!-- 路由组件出口的地方 -->
      <router-view/>
      <!--suppress JSUnresolvedVariable -->
      <MyFooter v-show="$route.meta.show"/>
    </div>
</template>

<script>
import MyHeader from './components/Header'
import MyFooter from './components/Footer'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter
  },
  mounted() {
    // 通知Vuex发送请求，获取数据，存储于仓库当中  放在app一级组件中只在打开网页时执行一次 性能更佳
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>
</style>
