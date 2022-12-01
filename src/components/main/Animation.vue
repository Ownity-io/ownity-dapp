<template>
  <div class="screen-animation">
    <div class="screen-animation-container">
      <AnimationImg1
        class="img img1"
        :class="{ active: img1.status }"
        ref="AnimationImg1"
      />
      <AnimationImg2
        class="img img2"
        :class="{ active: img2.status }"
        ref="AnimationImg2"
      />
      <AnimationImg3
        class="img img3"
        :class="{ active: img3.status }"
        ref="AnimationImg3"
      />
    </div>
  </div>
</template>

<script>
import AnimationImg1 from "./animation/images/AnimationImg1.vue";
import AnimationImg2 from "./animation/images/AnimationImg2.vue";
import AnimationImg3 from "./animation/images/AnimationImg3.vue";
import "../main/animation/animation.css";

export default {
  data() {
    return {
      // animationPlay1: false,
      // animationPlay2: false,
      // animationPlay3: false,
      // el1: '',
      // el2: '',
      // el3: '',
      img1: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        status: false,
        cursorX: 0,
        cursorY: 0,
      },
      img2: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        status: false,
        cursorX: 0,
        cursorY: 0,
      },
      img3: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        status: false,
        cursorX: 0,
        cursorY: 0,
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
      this.statusAnimation($event.pageX, $event.pageY, this.img1);
      this.statusAnimation($event.pageX, $event.pageY, this.img2);
      this.statusAnimation($event.pageX, $event.pageY, this.img3);
    },

    statusAnimation(cursorX, cursorY, obj) {
      // console.log(
      //   " top: " + obj.top +
      //   " right: " + obj.right +
      //   " bottom: " + obj.bottom +
      //   " left: " + obj.left +
      //   " cursorX: " + cursorX +
      //   " cursorY: " + cursorY+
      //   " 1: " + (cursorX > obj.left) +
      //   " 2: " +(cursorX < obj.right)+
      //   " 3: " +(cursorY > obj.top)+
      //   " 4: " +(cursorY < obj.bottom)
      // );
      if (
        cursorX > obj.left &&
        cursorX < obj.right &&
        cursorY > obj.top &&
        cursorY < obj.bottom
      ) {
        return (obj.status = true);
        // return {
        //   obj: {
        //     status: true,
        //     cursorX: cursorX,
        //     cursorY: cursorY,
        //   }
        // };
      } else return (obj.status = false);
      // {
      // return {
      // obj: {
      //   status: false,
      //   cursorX: 0,
      //   cursorY: 0,
      // }
      // };
      // },
    },
  },
  unmounted() {
    removeEventListener("mousemove", this.cursorMove);
  },
};
</script>

<style scoped>

.img.active {
  /* background: rgb(205, 255, 185); */
}
</style>
