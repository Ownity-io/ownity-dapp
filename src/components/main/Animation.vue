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
        :animationPlay2="animationPlay2"
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
      animationPlay2: false,

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
    // document.addEventListener("mousemove", this.cursorMove);
    // window.onresize = function () {
    //   setTimeout(() => {
    //     this.checkElPosition();
    //   }, "3000");
    // };
    // this.checkElPosition();
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
      // this.statusAnimation($event.pageX, $event.pageX, this.img1);
      this.statusAnimation($event.pageX, $event.pageX, this.img2);
      // this.statusAnimation($event.pageX, $event.pageX, this.img3);
    },

    statusAnimation(cursorX, cursorY, obj) {
      // console.log(
      //   " top:" +
      //     obj.top +
      //     " left:" +
      //     obj.left +
      //     " bottom:" +
      //     obj.bottom +
      //     " right:" +
      //     obj.right +
      //     " cursorX:" +
      //     cursorX +
      //     " cursorY:" +
      //     cursorY
      // );
      if (
        cursorX > obj.left &&
        cursorX < obj.right &&
        cursorY > obj.top &&
        cursorY < obj.bottom
      ) {
        return (this.animationPlay2 = true);
      } else {
        return (this.animationPlay2 = false);
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
}

svg:nth-child(1).active {
  background: pink;
}
svg:nth-child(2).active {
  background: rgb(210, 255, 192);
}
svg:nth-child(3).active {
  background: rgb(255, 218, 192);
}
</style>
