<template>

<div id="home" class="wrapper">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control :titles="['流行','新款','精选']"
               class="tab-control1"
               @tabClick="tabClick"
               ref="tabControl1"
               v-show="isFixed"
  ></tab-control>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="scrollContent"
          :pullUpLoad="true"
          @pullingUp="loadMore">
    <home-swiper :banner="banner"
                 @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"
                 ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShow"></back-top>
</div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";

  import HomeSwiper from "./childrenComps/HomeSwiper";
  import RecommendView from "./childrenComps/RecommendView";
  import FeatureView from "./childrenComps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  import {debounce} from "common/utils";
  import {itemImgListenerMixin} from "common/mixin";

  export default {
name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
    data() {
      return {
        // result: null
        banner: null,
        recommends: null,
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShow: false,
        offsetTop: 0,
        isFixed: false,
        saveY: 0,
      }
    },
    created() {
  //1.请求多个数据
      this.getHomeMultidata()
  //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mixins:[itemImgListenerMixin],
    mounted() {
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y

      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*
      * 事件监听相关方法
      * */

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

      scrollContent(position) {
        // console.log(position);
        //判断backTop是否显示
        this.isShow = -(position.y) > 1000

        this.isFixed = -(position.y) > this.offsetTop


      },

      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad() {
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      /*
      * 网络请求相关代码
      * */

      getHomeMultidata() {
        getHomeMultidata().then( res => {

          // console.log(res);
          //如果res没有被指向的话，会被垃圾回收机制回收掉,因为函数调用时创建的res 会在
          //函数执行完成的时候销毁，销毁了就没有东西指向请求回来的data了，所以data会被回收掉
          //用组件内定义的result来指向data，让data得以保存
          // this.result = res;
          this.banner = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.$refs.scroll.finishPullUp()
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }


  .content {
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    /*margin-top: 44px;*/
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

  }

  .tab-control1 {
    background-color: #fff;
    position: relative;
    z-index: 9;
  }

</style>
