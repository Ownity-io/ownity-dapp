<template>
  <div style="position:relative;">
    <lottie-player id="secondLottie"
                   ref="lottie"
                   mode="normal"
                   speed="10"
                   style="height: 800px"
                   src="https://lottie.host/f5e41c4f-4e1c-40c6-b8f6-809078615fed/PSQtJ63K1P.json"
    >
    </lottie-player>
    <div id="MyContainerId"></div>

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
	  this.$refs.lottie.addEventListener('ready', function() {
		  create({
			  mode: 'scroll',
			  player: '#secondLottie',
			  container: "#MyContainerId",
			  actions: [
				  {
					  visibility: [0.25, 0.4],
					  type: 'seek',
					  frames: [0, 180],
				  },
			  ],
		  });
	  });
  }
}

</script>

<style>
#secondLottie image{
    width: 700px;
    height: 700px;
}
</style>
