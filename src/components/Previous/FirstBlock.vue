<template>
  <div ref="intro" class="intros">
<!--    <canvas id="hero-lightpass"/>-->
<!--    <video ref="video" src="src/assets/home2 без лого.mp4"></video>-->

  </div>
</template>


<script>

import lottie from 'lottie-web'

export default {
	name: "FirstBlock",
  data() {
		return {
    }
  },
	mounted() {
		lottie.loadAnimation({
      container: this.$refs.intro,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: './src/assets/sun.json'
    })
	}
}

</script>