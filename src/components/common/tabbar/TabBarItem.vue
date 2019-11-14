<template>


  <div class="tar-bar-item" @click="itemClick">
<!--    防止插槽替换，把v-if,:class等东西替换掉-->
<!--    用一个div进行包装-->
<!--    <div><slot name="item-icon"></slot></div>-->

    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
<!--  <div class="tar-bar-item">-->
<!--    <img src="../../assets/img/tabbar/category.svg" alt="">-->
<!--    <div>分类</div>-->
<!--  </div>-->
<!--  <div class="tar-bar-item">-->
<!--    <img src="../../assets/img/tabbar/shopcar.svg" alt="">-->
<!--    <div>购物车</div>-->
<!--  </div>-->
<!--  <div class="tar-bar-item">-->
<!--    <img src="../../assets/img/tabbar/profile.svg" alt="">-->
<!--    <div>我的</div>-->
<!--  </div>-->


</template>

<script>
export default {
name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type : String,
      default: 'red'
    }
  },
  data() {
  return   {
    // isActive: true
  }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },

  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
  .tar-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tar-bar-item img {
    height: 22px;
    width: 22px;
    margin: 3px 3px 2px;
    vertical-align: middle;
  }
</style>
