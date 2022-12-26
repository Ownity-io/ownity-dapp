<template>
  <div id="MyContainerId">
    <lottie-player id="secondLottie"
                   ref="lottie"
                   mode="normal"

                   src="https://lottie.host/e0097477-67a8-41d7-ba73-6d4f400c7d24/37uUd7FUK4.json"
                   speed="10"
    >
    </lottie-player>
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
	  this.$refs.lottie.addEventListener('load', function() {
		  create({
			  mode: 'cursor',
			  player: '#secondLottie',
			  actions: [
				  {
					  type: "toggle"
				  }
			  ],
		  });
	  });
  }
}

</script>
