<template>
  <div class="mains">
    <div class="copy"></div>
    <div class="scroll-element">
      <div id="hand"></div>
    </div>
    <div class="copy"></div>
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
  mounted() {
	  gsap.registerPlugin(ScrollTrigger);

	  LottieScrollTrigger({
		  target: "#hand",
		  path: "https://lottie.host/6978bb15-7fa2-4467-a951-710cd865d6db/tJ3aKAFXb0.json",
		  speed: "fast",
		  start: -1,
		  scrub: true,
		  markers: false
	  });

	  function LottieScrollTrigger(vars) {
		  let innerW = window.innerWidth
		  if (innerW < 600){
			  vars.path = 'https://lottie.host/6c34b008-e7bc-4618-bfb8-bf82539ebc73/QBaT0A9gQe.json'
		  }
		  let playhead = {frame: 0},
			  target = gsap.utils.toArray(vars.target)[0],
			  speeds = {slow: "+=2000", medium: "+=1000", fast: "+=70"},
			  st = {trigger: target, pin: false, start: 5, end: speeds[vars.speed] || "+=70",},

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
    height: 90vh;
}

.mains .scroll-element #hand {
    display: block;
    width: 100% !important;
    height: 90vh !important;
    margin: 0 auto;
}
.page-wrapper {
    padding: 0;
}
</style>
