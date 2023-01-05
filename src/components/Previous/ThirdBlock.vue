<template>
<div class="aggregator">
  <div class="aggregator-inner">
    <div class="aggregator-left">
      <p class="aggregator-left-title">{{ translatesGet("AGGREGATOR_LEFT-TITLE") }}</p>
      <p class="aggregator-left-subtitle">
        {{ translatesGet("AGGREGATOR_LEFT-SUBTITLE") }}
      </p>
      <div class="information-of-nft">
        <div class="information-wrapper">
          <div class="design"></div>
          <p> {{ translatesGet("INFORMATION_OF_NFT-1") }}</p>
        </div>
        <div class="information-wrapper">
          <div class="design"></div>
          <p> {{ translatesGet("INFORMATION_OF_NFT-2") }}</p>
        </div>
      </div>
      <div class="aggregator-left-coins">
        <div class="coins-eth">
          <p class="coins-eth-title">Blockchains</p>
          <div class="coins-eth-img"></div>
          <p class="coins-eth-subtitle" ref="soon">More Coming Soon</p>
        </div>
        <div class="coins-marketplaces">
          <p class="coins-marketplaces-title">Marketplaces</p>
          <div class="coins-marketplaces-coin">
            <div class="coin-1"></div>
            <div class="coin-2"></div>
            <div class="coin-3"></div>
          </div>
          <p class="coins-marketplaces-soon">More Coming Soon</p>
        </div>
      </div>
    </div>
    <div class="aggregator-right">
      <div v-bind:style="thereWidth">
        <lottie-player id="firstLottie"
                       ref="lottie"
                       mode="normal"
                       src="https://lottie.host/1fc4eedc-dd4d-4c94-b81d-20b75024ede6/4jS7TgFrwl.json"
                       speed="5"
        >
        </lottie-player>
      </div>
    </div>
  </div>

</div>
</template>

<script>

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import { create } from '@lottiefiles/lottie-interactivity';

import MultiLang from "@/core/multilang";


export default {
	name: "ThirdBlock",
	components: {
		Vue3Lottie,
	},
  data(){
	  return {
			thereWidth: {
				'width': '600px'
      },
		  lang: new MultiLang(this),
	  }
  },
  methods: {
    getWidth(){
			let innerW = window.innerWidth
	    if (innerWidth < 1441){
		    this.thereWidth.width = '540px'
	    }
      if (innerWidth < 1150){
	      this.thereWidth.width = '530px'
      }
	    if (innerWidth < 1100){
		    this.thereWidth.width = '460px'
	    }
	    if (innerWidth < 480){
		    this.thereWidth.width = '355px'
	    }
    },
	  translatesGet(key) {
		  return this.lang.get(key);
	  },
  },

  mounted() {
	  this.$refs.lottie.addEventListener('load', function() {
		  create({
			  mode: 'scroll',
			  player: '#firstLottie',
			  actions: [
				  {
					  visibility: [0, 0.5],
					  type: 'seek',
					  frames: [0],
				  },
			  ],
		  });
	  });
		this.getWidth()
  }
}
</script>
