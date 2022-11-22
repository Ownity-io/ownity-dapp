<template>
    <div class="block-vote">
      <div class="vote-data section-deposit-data">
        <a href="#" class="deposit-img" :style="{backgroundImage: `url(${this.voting.marketplace.logo})`}"></a>

        <div class="deposit-data">
          <div class="deposit-listened">
            <a href="#">Listing price to {{this.voting.marketplace.name}}</a>
          </div>
          <div class="deposit-value">
            <div class="icon-token"></div>
            <span><b>{{this.abbrNum(this.toFixedIfNecessary(this.convertToEther(this.voting.amount),6),2)}} ETH</b></span>
            <span class="equivalent">(≈ $ {{(this.toFixedIfNecessary(this.abbrNum(this.convertToEther(this.voting.amount)*this.currencyToUsdPrice),2),2)}})</span>
          </div>
        </div>
      <div class="vote-btn-container">
        <!-- display if user logged and already votes -->
        <button class="btn btn-cancel" v-if="userLogged & this.voting.type=='FULLFILLED'">
            Cancel
        </button>
        <!-- display if user logged and not votes yet -->
        <button class="btn btn-vote" v-else-if="userLogged & (this.voting.type=='CANCEL'||this.voting.type=='SELL') & !userVoted">
            <i class="i-thumb-up-line"></i>
            <span>Confirm</span>
        </button>
      </div>
      </div>

      <div class="vote-progress-container">
        <div>Members voted: {{this.voting.count}}/{{this.item.bids.length}}</div>
        <div class="card-progress progress">
          <!-- <div
            class="progress-value owner"
            style="width: 40%"
          > -->
          <div
            class="progress-value"
            :style="{width: `${(this.voting.count/this.item.bids.length)*100}%`}"
          >
            <span>{{(this.voting.count/this.item.bids.length)*100}}%</span>
          </div>
          <div class="progress-value" style=" width: 20%, 'padding-left' :  20% ">
            <span>20%</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="block-vote">
      <div class="vote-data section-deposit-data">
        <a href="#" class="deposit-img"></a>

        <div class="deposit-data">
          <div class="deposit-listened">
            <a href="#">Listing price to OpenSea</a>
          </div>
          <div class="deposit-value">
            <div class="icon-token"></div>
            <span><b>2 ETH</b></span>
            <span class="equivalent">(≈ $ 2K)</span>
          </div>
        </div>
      <div class="vote-btn-container">
        <button class="btn btn-vote">
            <i class="i-thumb-up-line"></i>
            <span>Confirm</span>
        </button>
      </div>
      </div>

      <div class="vote-progress-container">
        <div>Members voted: 1/6</div>
        <div class="card-progress progress">
          <div
            class="progress-value owner"
            style="width: 40%"
          >
            <span>40%</span>
          </div>
          <div class="progress-value" style=" width: 20%, 'padding-left' :  20% ">
            <span>20%</span>
          </div>
        </div>
      </div>
    </div> -->

</template>

<script>
import { ethers } from 'ethers';

export default{
  methods:{
    abbrNum(number, decPlaces) {
      decPlaces = Math.pow(10, decPlaces);
      var abbrev = ["k", "m", "b", "t"];
      for (var i = abbrev.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3);
        if (size <= number) {
          number = Math.round(number * decPlaces / size) / decPlaces;
          if ((number == 1000) && (i < abbrev.length - 1)) {
            number = 1;
            i++;
          }
          number += abbrev[i];
          break;
        }
      }
      return number;
    },
    convertToEther(value){
      return ethers.utils.formatEther(value);
    },
    async setCurrencyToUsd(){
      let request = await fetch(`https://api.octogamex.com/rates?symbol=${this.item.currency.ticker}`);
      let requestJson = await request.json();
      try{
        this.currencyToUsdPrice =  requestJson.quotes[0].priceUsd;
      }
      catch{
        this.currencyToUsdPrice = 1;
      }
    },
    toFixedIfNecessary(value, dp) {
      return +parseFloat(value).toFixed(dp);
    },
    async setCurrencyToUsd(){
      let request = await fetch(`https://api.octogamex.com/rates?symbol=${this.item.currency.ticker}`);
      let requestJson = await request.json();
      try{
        this.currencyToUsdPrice =  requestJson.quotes[0].priceUsd;
      }
      catch{
        this.currencyToUsdPrice = 1;
      }
    },
    async setUserVotedAndLogged(){
      let userAddress = localStorage.getItem('userAddress');
      if (userAddress!=null & userAddress!='null'){
        this.userLogged = true;
        for (let user of this.voting.users){
          if (user.address == userAddress){
            this.userVoted=true;
          }
        }
      }
      else{
        this.userLogged = false;
      }
    }
  },
  data(){
    return{
      currencyToUsdPrice:1,
      userLogged:false,
      userVoted:false
    }
  },
  props:['item','voting'],
  async mounted(){
    // console.log(this.voting);  
    await this.setCurrencyToUsd();
    await this.setUserVotedAndLogged();

    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while (true) {
      await delay(1000);
      await this.setUserVotedAndLogged();
    }
  }
}

</script>