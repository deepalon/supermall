<template>
<div class="car-button-bar">
  <div class="check-content">
    <check-button class="check-button"
                  :is-checked="isSelectAll" @click.native="clickSelectAll"></check-button>
    <span>全选</span>

    <div class="price">
      合计： {{totalPrice}}
    </div>

    <div class="calculate">
        去计算：({{checkLength}})
    </div>
  </div>
</div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
    export default {
      name: "CarButtonBar",
      components: {
        CheckButton
      },
      computed: {
        totalPrice() {
          return this.$store.state.carList.filter(item => {
            return item.checked
          }).reduce((preValue, item) => {
            return preValue + item.nowPrice * item.count
          }, 0).toFixed(2)
        },
        checkLength() {
          return this.$store.state.carList.filter(item => item.checked).length
        },
        isSelectAll() {
          if (this.$store.state.carList.length === 0 ) return  false
          return !this.$store.state.carList.find(item => !item.checked)
        }
      },
      methods: {
        clickSelectAll() {
          if(this.isSelectAll){
            this.$store.state.carList.forEach(item => item.checked = false)
          } else {
            this.$store.state.carList.forEach(item => item.checked = true)
          }
        }
      }
    }
</script>

<style scoped>
  .car-button-bar {
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: relative;
    width: 100%;
  }

  .check-button {
    margin-right: 8px;
    line-height: 20px;
    width: 20px;
    height: 20px;
  }
  .check-content {
    margin-left: 8px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .price {
    margin-left: 20px;
  }
  .calculate {
    position: absolute;
    right: 0%;
    background-color: #ff7808;
    text-align: center;
    width: 100px;
    color: white;
  }

</style>
