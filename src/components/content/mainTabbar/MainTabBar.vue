<template>
  <div id="app">
    <tab-bar>
      <TabBarItem path="/home" >
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/category" >
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path="/shopcar" >
        <img slot="item-icon" src="~assets/img/tabbar/shopcar.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcar_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile" >
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </TabBarItem>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from "../../common/tabbar/TabBarItem";

  export default {
    components: {
      name: "MainTabBar",
      TabBar,
      TabBarItem,
    }
  }
</script>

<style>

</style>
