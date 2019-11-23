<template>
  <div class="check-button" :class="{active: isChecked}">
    <img src="~assets/img/car/tick.svg" alt="">
  </div>
</template>

<script>
    export default {
      name: "CheckButton",
      props: {
        isChecked: {
          type: Boolean,
          default: false
        }
      }
    }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 1px solid #aaa;
  }

  .active {
    background-color: red;
    border-color: red;
  }

</style>
