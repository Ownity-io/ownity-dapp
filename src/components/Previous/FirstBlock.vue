<template>
  <div ref="intro" class="intros">
<!--    <canvas id="hero-lightpass"/>-->
    <video ref="video" src="src/assets/home2 без лого.mp4"></video>
  </div>
</template>

<script>

export default {
	name: "FirstBlock",
  data() {
		return {

    }
  },
	mounted() {
		// window.addEventListener('scroll', function (){
		// 	const html = document.documentElement;
		// 	const canvas = document.getElementById("hero-lightpass");
		// 	const context = canvas.getContext("2d");
		//
		// 	const frameCount = 30;
		// 	const currentFrame = index => (
		// 		// `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
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
		// 		const maxScrollTop = html.scrollHeight - window.innerHeight;
		// 		const scrollFraction = scrollTop / maxScrollTop;
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

<style scoped>
canvas {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100vw;
    max-height: 100vh;
}
</style>