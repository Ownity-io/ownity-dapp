<template>
  <div class="img-container">
    <img :style="{position}" src="@/assets/images/main-animation/1.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/2.svg" alt="figure">
    <!-- <img :style="{position}" src="@/assets/images/main-animation/3.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/4.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/5.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/6.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/7.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/8.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/9.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/10.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/11.svg" alt="figure">
    <img :style="{position}" src="@/assets/images/main-animation/12.svg" alt="figure"> -->
    <!-- c\assets\images\main-animation -->
  </div>
</template>

<script>


export default {
  props: ['status'],
  data() {
    return {
      play: false,
      figure: []
    }
  },
  mounted(){
    // this.figure = document.querySelectorAll('img');
    // console.log(this.figure)
  },
  methods: {
    position(){
      if(this.status){
        console.log("dsdssds")
      }
    }
  }
}
</script>

<style scoped>
.img1 .img-container {
  /* width: 1100px;
  height: 1075px; */
  width: 904.76px;
  height: 636.25px;

  /* transform: rotate(138.67deg); */
  /* position: relative; */
}

.img1 .img-container img {
  width: auto;
  height: auto;
}
</style>