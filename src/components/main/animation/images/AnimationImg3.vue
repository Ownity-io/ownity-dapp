<template>
  <div class="img-container" :class="{play: status}">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/1.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/2.svg"
      alt="figure">
    <!-- <img :class="{status: !status }" :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/3.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/4.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/5.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/6.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/7.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/8.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/9.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/10.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/11.svg"
      alt="figure">
    <img :style="{ left: cursorX + 'px', right: cursorY + 'px' }" src="@/assets/images/main-animation/12.svg"
      alt="figure"> -->
  </div>
</template>

<script>


export default {
  props: ['status', 'cursorX', 'cursorY'],
  data() {
    return {
      play: false,
    }
  },
}
</script>

<style scoped>
.img2 .img-container {
  /* width: 1100px;
  height: 1075px; */
  width: 904.76px;
  height: 636.25px;

  /* transform: rotate(138.67deg); */
  /* position: relative; */
}

.img2 .img-container img {
  width: auto;
  height: auto;
  transition: 2s;
}
</style>