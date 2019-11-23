<template>
<div>
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
  <car-list></car-list>
</div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CarList from "./childComps/CarList";
  import {mapGetters} from 'vuex'
  export default {
    name: "Shopcar",
    components: {
      NavBar,
      CarList
    },
    computed: {
      ...mapGetters({
        length: 'carLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #f6f6f6;
    font-weight: 700;
    position: relative;
  }

</style>
