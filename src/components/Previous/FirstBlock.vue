<template>
  <div class="mains">
    <div class="copy">
      <h1>scroll down</h1>
    </div>
    <div class="scroll-element">
      <div id="hand"></div>
    </div>
    <div class="copy">
    </div>
  </div>
</template>


<script>

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from 'lottie-web'


export default {
	name: "FirstBlock",
	components: {
		Vue3Lottie,
	},
  data() {
		return {
    }
  },
  methods:{
	  play() {
		  this.$refs['customControl'].play()
	  },
	  pause() {
		  this.$refs['customControl'].pause()
	  },
	  stop() {
		  this.$refs['customControl'].stop()
	  },
  },
  mounted() {
	  gsap.registerPlugin(ScrollTrigger);

	  LottieScrollTrigger({
		  target: "#hand",
		  path: "https://lottie.host/f5e41c4f-4e1c-40c6-b8f6-809078615fed/PSQtJ63K1P.json",
		  speed: "fast",
		  pin: ".mains",
		  start: "top",
		  scrub: 0.2,
		  markers: false
	  });


	  function LottieScrollTrigger(vars) {
		  let playhead = {frame: 0},
			  target = gsap.utils.toArray(vars.target)[0],
			  speeds = {slow: "+=2000", medium: "+=1000", fast: "+=70"},
			  st = {trigger: target, pin: false, start: "top", end: speeds[vars.speed] || "+=70",},
			  animation = lottie.loadAnimation({
				  container: target,
				  renderer: vars.renderer || "svg",
				  loop: false,
				  autoplay: false,
				  path: vars.path
			  });
		  for (let p in vars) { // let users override the ScrollTrigger defaults
			  st[p] = vars[p];
		  }
		  animation.addEventListener("DOMLoaded", function() {
			  gsap.to(playhead, {
				  frame: animation.totalFrames - 1,
				  ease: "none",
				  onUpdate: () => animation.goToAndStop(playhead.frame, true),
				  scrollTrigger: st
			  });
		  });
	  }
  }
}

</script>

<style>
.mains .scroll-element {
    display: block;
    width: 100%;
    height: 100vh;
}
.mains .scroll-element #hand {
    display: block;
    width: 100% !important;
    height: 900px !important;
    margin: 0 auto;
}

.mains {
  top: -30px !important;
}

</style>
