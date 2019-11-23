<template>
<div id="detail">
  <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
  <scroll class="content" ref="scroll"
          @scroll="scroll"
          :probeType="3">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoadEnd="imageLoadEnd"></detail-goods-info>
    <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommendInfo"></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShow"></back-top>
  <detail-bottom-bar @addCar="addToCar"></detail-bottom-bar>
</div>

</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import BackTop from "components/content/backtop/BackTop";


    import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";

    import Scroll from "components/common/scroll/Scroll";

    import {itemImgListenerMixin} from "../../common/mixin";

    export default {
      name: "Detail",
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        BackTop,
        Scroll
      },
      data() {
        return {
          iid: null,
          topImages: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          commentInfo: {},
          recommendInfo: [],
          themeTopYs: [],
          currentIndex: 0,
          isShow: false
        }
      },
      mixins:[itemImgListenerMixin],
      created() {
        this.iid = this.$route.params.iid

        getDetail(this.iid).then(res => {
          const data = res.result
          this.topImages = data.itemInfo.topImages

          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          console.log(this.goods);

          this.shop = new Shop(data.shopInfo)

          this.detailInfo = data.detailInfo

          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }

        })
        getRecommend().then(res => {
          this.recommendInfo = res.data.list
          // console.log(this.recommendInfo);
        })

      },
      mounted() {

      },
      updated() {
      },
      deactivated() {
        //取消全局事件的监听
        this.$bus.$off('itemImageLoad',this.itemImgListener)
      },
      methods: {
        imageLoadEnd() {
          this.$refs.scroll.refresh()
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs);
        },
        titleClick(index) {
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
        },
        scroll(position) {
          // console.log(position);
          const positionY = -position.y
          let length = this.themeTopYs.length
          for(let i = 0; i < length - 1; i++ ) {
            if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])) {
              this.currentIndex = i
              this.$refs.detailNavBar.currentIndex = this.currentIndex
            }
          }

          this.isShow = -(position.y) > 1000

          this.isFixed = -(position.y) > this.offsetTop


        },
        backClick() {
          this.$refs.scroll.scrollTo(0, 0, 500)
        },
        addToCar() {
          //获取购物车中需要展示的商品信息
          const product = {}
          product.image = this.topImages[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.nowPrice = this.goods.nowPrice
          product.iid = this.iid
          // console.log(product);
          //将商品加入购物车
          // this.$store.commit('addcar', product)
          this.$store.dispatch('addcar', product).then(res => {
            console.log(res);
          })
        }
      }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 60px;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>
