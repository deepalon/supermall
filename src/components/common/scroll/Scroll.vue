<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: "Scroll",
      data() {
        return {
          scroll: null
        }
      },
      props: {
        probeType: {
          type: Number,
          default: 0
        },
        pullUpLoad: {
          type: Boolean,
          default: false
        }
      },
      mounted() {
        //1.创建better-scroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })

        //2.监听滚动的位置
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })

        //3.监听上拉加载
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
      },
      methods: {
        scrollTo(x, y, time) {
          this.scroll &&    this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
          this.scroll &&   this.scroll.finishPullUp()
        },
        refresh() {
          // console.log('---');
          this.scroll &&   this.scroll.refresh()
        }
      }
    }
</script>

<style scoped>


</style>
