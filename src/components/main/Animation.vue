<template>
  <div class="screen-animation">
    <div class="screen-animation-container">
      <!-- <img
        src="../../assets/images/main-bg.svg"
        alt=""
        style="position: absolute; top: 0; width: 100%; height: auto; left: 0"
      /> -->
      <AnimationImg />
      <AnimationImg2 />
      <AnimationImg3 />
    </div>
  </div>
</template>

<script>
import AnimationImg from "./animation/images/AnimationImg.vue";
import AnimationImg2 from "./animation/images/AnimationImg2.vue";
import AnimationImg3 from "./animation/images/AnimationImg3.vue";

export default {
  data() {
    return {};
  },
  components: {
    AnimationImg,
    AnimationImg2,
    AnimationImg3,
  },
};
</script>

<style scoped>
.screen-animation-container {
  position: relative;
  width: 100%;
}

.screen-animation-container svg {
  position: absolute;
  /* min-width: 637px;
  min-height: 946px; */
}

/* .screen-animation-container svg:nth-child(1){
  left: -615.17px;
  top: -190.76px;
  transform: rotate(-138.67deg) ;
  transform: rotate(221.33deg) ;
}

.screen-animation-container svg:nth-child(2){
  right: 223.72px;
  top: -260.36px;
  transform: rotate(165.84deg) ;
} */

.screen-animation-container svg:nth-child(1) {
  top: -737px;
  left: -383px;
}

.screen-animation-container svg:nth-child(2) {
  top: -432px;
  left: 37%;
}

.screen-animation-container svg:nth-child(3) {
  right: 10px;
  top: -10px;
  /* transform: scale(1.02); */
  /* display: none; */
}
</style>
