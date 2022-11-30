<template>
  <div class="screen-animation">
    <div class="screen-animation-container">
      <!-- <img
        src="../../assets/images/main-bg.svg"
        alt=""
        style="position: absolute; top: 0; width: 100%; height: auto; left: 0"
      /> -->
      <AnimationImg1 :status="img1.status" :class="{ active: img1.status }" ref="AnimationImg1" />
      <AnimationImg2 :status="img2.status" :class="{ active: img2.status }" ref="AnimationImg2" />
      <!-- 
        :animationPlay2="animationPlay2" -->
      <AnimationImg3 :status="img3.status" :class="{ active: img3.status }" ref="AnimationImg3" />
    </div>
  </div>
</template>

<script>
import AnimationImg1 from "./animation/images/AnimationImg1.vue";
import AnimationImg2 from "./animation/images/AnimationImg2.vue";
import AnimationImg3 from "./animation/images/AnimationImg3.vue";

export default {
  data() {
    return {
      // animationPlay2: false,
      // el1: '',
      // el2: '',
      // el3: '',
      img1: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        status: false,
      },
      img2: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        status: false,
      },
      img3: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        status: false,
      },
    };
  },
  components: {
    AnimationImg1,
    AnimationImg2,
    AnimationImg3,
  },
  mounted() {
    this.checkElPosition();
    // window.onresize = function () {
    //   setTimeout(() => {
    //     this.checkElPosition();
    //   }, "3000");
    // };
    document.addEventListener("mousemove", this.cursorMove);
  },
  methods: {
    checkElPosition() {

      this.img1.top = this.$refs.AnimationImg1.$el.getBoundingClientRect().top;
      this.img1.left = this.$refs.AnimationImg1.$el.getBoundingClientRect().left;
      this.img1.bottom = this.$refs.AnimationImg1.$el.getBoundingClientRect().bottom;
      this.img1.right = this.$refs.AnimationImg1.$el.getBoundingClientRect().right;

      this.img2.top = this.$refs.AnimationImg2.$el.getBoundingClientRect().top;
      this.img2.left = this.$refs.AnimationImg2.$el.getBoundingClientRect().left;
      this.img2.bottom = this.$refs.AnimationImg2.$el.getBoundingClientRect().bottom;
      this.img2.right = this.$refs.AnimationImg2.$el.getBoundingClientRect().right;

      this.img3.top = this.$refs.AnimationImg3.$el.getBoundingClientRect().top;
      this.img3.left = this.$refs.AnimationImg3.$el.getBoundingClientRect().left;
      this.img3.bottom = this.$refs.AnimationImg3.$el.getBoundingClientRect().bottom;
      this.img3.right = this.$refs.AnimationImg3.$el.getBoundingClientRect().right;

    },

    cursorMove($event) {
      this.statusAnimation($event.pageX, $event.pageX, this.img1);
      this.statusAnimation($event.pageX, $event.pageX, this.img2);
      this.statusAnimation($event.pageX, $event.pageX, this.img3);
    },

    statusAnimation(cursorX, cursorY, obj) {
      // console.log(
      //   " top:" +
      //   obj.top +
      //   " left:" +
      //   obj.left +
      //   " bottom:" +
      //   obj.bottom +
      //   " right:" +
      //   obj.right +
      //   " cursorX:" +
      //   cursorX +
      //   " cursorY:" +
      //   cursorY
      // );
      if (
        cursorX > obj.left &&
        cursorX < obj.right &&
        cursorY > obj.top &&
        cursorY < obj.bottom
      ) {
        return (obj.status = true);
      } else {
        return (obj.status = false);
      }
    },
  },
};
</script>

<style scoped>
.screen-animation-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-width: 100%;
}

.screen-animation-container svg {
  position: absolute;
}

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
  z-index: -1;
}

svg.active {
  background: rgb(205, 255, 185);
}
svg.play .path1 {
  background: rgb(255, 185, 185);
}
</style>
