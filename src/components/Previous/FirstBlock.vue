<template>
  <div style="position:relative;">
<!--    <lottie-player id="secondLottie"-->
<!--                   ref="lottie"-->
<!--                   mode="normal"-->
<!--                   speed="10"-->
<!--                   style="height: 800px"-->
<!--                   src="https://lottie.host/f5e41c4f-4e1c-40c6-b8f6-809078615fed/PSQtJ63K1P.json"-->
<!--    >-->
<!--    </lottie-player>-->
<!--    <div id="MyContainerId"></div>-->
<!--    <canvas id="hero-lightpass"/>-->
  </div>

</template>


<script>

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import { create } from '@lottiefiles/lottie-interactivity';


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
	  // this.$refs.lottie.addEventListener('ready', function() {
		//   create({
		// 	  mode: 'scroll',
		// 	  player: '#secondLottie',
		// 	  container: "#MyContainerId",
		// 	  actions: [
		// 		  {
		// 			  visibility: [0.25, 0.4],
		// 			  type: 'seek',
		// 			  frames: [0, 180],
		// 		  },
		// 	  ],
		//   });
	  // });
	  // window.addEventListener('scroll', function (){
	  // 	const html = document.documentElement;
	  // 	const canvas = document.getElementById("hero-lightpass");
	  // 	const context = canvas.getContext("2d");
    //
	  // 	const frameCount = 59;
	  // 	const currentFrame = index => (
	  // 		`/src/assets/animationFirst/ezgif-frame-${index.toString().padStart(3, '0')}.png`
	  // 	)
    //
	  // 	const preloadImages = () => {
	  // 		for (let i = 1; i < frameCount; i++) {
	  // 			const img = new Image();
	  // 			img.src = currentFrame(i);
	  // 		}
	  // 	};
    //
	  // 	const img = new Image()
	  // 	img.src = currentFrame(1);
	  // 	canvas.width=1900;
	  // 	canvas.height=1000;
	  // 	img.onload=function(){
	  // 		context.drawImage(img, 0, 0);
	  // 	}
    //
	  // 	const updateImage = index => {
	  // 		img.src = currentFrame(index);
	  // 		context.drawImage(img, 0, 0);
	  // 	}
    //
	  // 	window.addEventListener('scroll', () => {
	  // 		const scrollTop = html.scrollTop;
	  // 		const scrollFraction = scrollTop / 200;
	  //  		const frameIndex = Math.min(
	  //  			frameCount - 1,
	  //  			Math.ceil(scrollFraction * frameCount)
	  //  		);
    //
	  //  		requestAnimationFrame(() => updateImage(frameIndex + 1))
	  //  	});
    //
	  //  	preloadImages()
	  //  })
  }
}

</script>

<style>
canvas {
    max-width: 100vw;
    max-height: 100vh;
    margin: 0 auto;
}
</style>
