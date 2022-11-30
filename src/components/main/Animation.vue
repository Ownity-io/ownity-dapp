<template>
  <div class="screen-animation">
    <div class="screen-animation-container">
      <!-- <img
        src="../../assets/images/main-bg.svg"
        alt=""
        style="position: absolute; top: 0; width: 100%; height: auto; left: 0"
      /> -->
      <AnimationImg ref="AnimationImg" />
      <AnimationImg2
        :class="{ active: animationPlay2 }"
        ref="AnimationImg2"
        :mouseEventX="mouseEventX"
        :mouseEventY="mouseEventY"
      />
      <AnimationImg3 ref="AnimationImg3" />
    </div>
  </div>
</template>

<script>
import AnimationImg from "./animation/images/AnimationImg.vue";
import AnimationImg2 from "./animation/images/AnimationImg2.vue";
import AnimationImg3 from "./animation/images/AnimationImg3.vue";

export default {
  data() {
    return {
      // props:[]

      mouseEvent: false,
      mouseEventX: false,
      mouseEventY: false,

      animationPlay2: false,

      // x1:0,
      // y1:0,
      // x2:0,
      // y2:0,
      // x3:0,
      // y3:0,
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
    AnimationImg,
    AnimationImg2,
    AnimationImg3,
  },
  mounted() {
    document.addEventListener("mousemove", this.cursorMove);
    // document.addEventListener("resize", this.cursorMove);
    window.onresize = function () {
      setTimeout(() => {
        this.checkElPosition();
      }, "3000");
    };
    // this.statusEl()
    this.checkElPosition();
  },
  methods: {
    // chekPositionMouse

    checkElPosition() {
      this.img2.top = this.$refs.AnimationImg2.$el.getBoundingClientRect().top;
      this.img2.left = this.$refs.AnimationImg2.$el.getBoundingClientRect().left;
      this.img2.bottom = this.$refs.AnimationImg2.$el.getBoundingClientRect().bottom;
      this.img2.right = this.$refs.AnimationImg2.$el.getBoundingClientRect().right;
    },

    cursorMove($event) {
      this.mouseEventX = $event.pageX;
      this.mouseEventY = $event.pageY;
      this.statusAnimation(this.mouseEventX, this.mouseEventY, this.img2);
    },

    statusAnimation(cursorX, cursorY, obj) {
      console.log(
        " top:" +
          obj.top +
          " left:" +
          obj.left +
          " bottom:" +
          obj.bottom +
          " right:" +
          obj.right +
          " cursorX:" +
          cursorX +
          " cursorY:" +
          cursorY
      );
      if (
        cursorX > obj.left &&
        cursorX < obj.right &&
        cursorY > obj.top &&
        cursorY < obj.bottom
      )
        return (this.animationPlay2 = true);
      else this.animationPlay2 = false;
    },

    // statusEl(el) {
    //     if (
    //       el.getBoundingClientRect().top >= 0 &&
    //       el.getBoundingClientRect().top <
    //       el.getBoundingClientRect().height + 15
    //     ) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    // },
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.cursorMove);
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
}
</style>
