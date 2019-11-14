<template>

<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <home-swiper :banner="banner"></home-swiper>
  <recommend-view :recommends="recommends"></recommend-view>
  <feature-view></feature-view>
</div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childrenComps/HomeSwiper";
  import {getHomeMultidata} from "network/home";
  import RecommendView from "./childrenComps/RecommendView";
  import FeatureView from "./childrenComps/FeatureView";

  export default {
name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
    data() {
      return {
        // result: null
        banner: null,
        recommends: null
      }
    },
    created() {
  //1.请求多个数据
        getHomeMultidata().then( res => {
          console.log(res);
          //如果res没有被指向的话，会被垃圾回收机制回收掉,因为函数调用时创建的res 会在
          //函数执行完成的时候销毁，销毁了就没有东西指向请求回来的data了，所以data会被回收掉
          //用组件内定义的result来指向data，让data得以保存
          // this.result = res;
          this.banner = res.data.banner.list
          this.recommends = res.data.recommend.list
        })

    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 1;*/
  }
</style>
