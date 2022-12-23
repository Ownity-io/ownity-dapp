<template>
  <div ref="intro" class="intros"></div>
  <lottie-player id="firstLottie"
                 ref="lottie"
                 controls
                 mode="normal"
                 src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                 style="width: 320px;">
  </lottie-player>
</template>


<script>

import '@lottiefiles/lottie-player';
import { create } from '@lottiefiles/lottie-interactivity';

import lottie from 'lottie-web'

export default {
	name: "FirstBlock",
  data() {
		return {
    }
  },
	mounted() {
		this.$refs.lottie.addEventListener('load', function() {
			// 3. configure the interactivity library
			create({
				mode: 'scroll',
				player: '#firstLottie',
				actions: [
					{
						visibility: [0, 1],
						type: 'seek',
						frames: [0, 100],
					},
				],
			});
		})
	}
}

</script>