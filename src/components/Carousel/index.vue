<template>
    <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(carousel) in list" :key="carousel['id']">
                <img :src="carousel['imgUrl']">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
</template>

<script>
import Swiper from 'swiper'
export default {
   name: "Carousel",
   props: ['list'],
   watch: {
    list:{
      // 挂载后立即运行一次监听内代码，不管监听的数据变化与否
      immediate: true,
      /* 
        数据变化执行的回调函数  调用此回调函数会传入 newValue和oldValue 两个参数
        此方法被调用只能说明bannerList数据改变了（获取到了数据），页面还没有重新渲染
        只有v-for执行完成后页面才被重新渲染
        ** nextTick: 在下次DOM更新 循环结束之后 执行其中的延迟回调，在修改数据之后立即执行这个方法
         -- 获取更新后的DOM
       */
      handler(){
        this.$nextTick(()=>{
          new Swiper(".swiper-container", {
            loop: true,
            // 是否需要分页器
            pagination:{
              el: ".swiper-pagination",
              // 点击分页器切换轮番
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next"
            }
          })
        });
      }
    }
  },
}
</script>

<style scoped>
   
</style>