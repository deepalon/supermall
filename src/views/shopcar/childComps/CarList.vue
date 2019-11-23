<template>
<div class="car-list">
  <scroll class="content" ref="scroll">
    <car-list-item v-for="(item, index) in carList"
                   :key="index"
                   :item-info="item"></car-list-item>
  </scroll>
  <car-button-bar></car-button-bar>
</div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CarButtonBar from "./CarButtonBar";
  import CarListItem from "./CarListItem";

  import {mapGetters} from 'vuex'

  export default {
      name: "CarList",
    components: {
      Scroll,
      CarListItem,
      CarButtonBar
    },
    computed: {
      ...mapGetters(['carList'])
    },
    activated() {
        this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .car-list {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 89px;
    top: 44px;
  }
  .content {
    height: 100%;
    overflow: hidden;
  }

</style>
