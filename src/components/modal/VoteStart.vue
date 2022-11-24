<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Vote</div>
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setShowStartVotingModal',false)">
          <i class="i-close-line"></i>
        </button>
      </div>

      <div class="modal-content">
        <div class="modal-container">
          <div class="modal-section-nft-data">
            <div class="modal-nft-data">
              <div class="icon-nft" :style="{backgroundImage: `url(${item.media})`}"></div>
              <div class="nft-data">
                <div class="nft-id">{{item.token_id}}</div>
                <div>{{item.collection.name}}</div>
              </div>
            </div>
          </div>

          <div class="modal-section-main-data">
            <div class="modal-main-data-container">
              <div class="modal-data-block">
                <div class="modal-input container-input">
                  <div class="input-header">
                    <div>Price</div>
                    <div class="price-value">
                      <div class="icon-value"></div>
                      <span>ETH</span>
                    </div>
                  </div>
                  <div class="input-wrapper input-wrapper-amount">
                    <input type="text" placeholder="Input amount" v-model="amount">
                    <div class="input-equivalent equivalent" v-if="amount>0">≈ $ {{abbrNum(Math.round(amount * currencyToUsdPrice),1)}}</div>
                  </div>
                  <div class="input-prompt">Item will be on sale until you cancelled</div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-section-filter">
            <div class="modal-section-name">Choose marketplace</div>
            <div class="modal-filter">
              <ul class="filter-ul">
                <li class="filter-li" v-for="marketplace in this.marketplaces" :key="marketplace">
                  <div class="input-checkbox">
                    <input type="checkbox" :id="marketplace.id" v-model="checkedMarketplace" :true-value="marketplace.id" :false-value="null"/>
                    <label :for="marketplace.id">
                      <div class="icon-filter-checkbox" :style="{backgroundImage: `url(${marketplace.logo})`}"></div>
                      <span>{{marketplace.name}}</span>
                      <i class="i-check-line"></i>
                    </label>
                  </div>
                </li>
              </ul>
              
            </div>
          </div>

          <button class="btn btn-modal-main btn-modal-desktop" @click="startVote">Start vote</button>
        </div>
      </div>
            
      <div class="modal-mobile-footer">
        <button class="btn btn-modal-main">Start vote</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import config from '@/config.json';
import { ethers } from 'ethers';
export default {
  data() {
    return {
      item:null,
      marketplaces:null,
      render:false,
      checkedMarketplace:null,
      amount:null,
      currencyToUsdPrice:1
    };
  },
  async mounted(){
    
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    let requestUrl = `${config.backendApiEntryPoint}marketplaces/`;
    let request = await fetch(requestUrl);
    let requestJson = await request.json();
    this.marketplaces = requestJson;
    await this.setCurrencyToUsd();
    this.render = true;
  },
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
    convertToEther(value){
      try{
        return ethers.utils.formatEther(String(value));
      }
      catch{
        console.log('ethers error');
      }
    },
    convertFromEtherToWei(value){
      return value * 10**this.item.currency.decimals;
    },
    async startVote() {
      if (this.amount>0 & this.checkedMarketplace!=null) {
        let signed_message = await this.$store.dispatch('walletsAndProvider/signMessageWithGlobalProvider',
          `${this.checkedMarketplace}-${this.item.id}-${this.item.currency.address}-${this.noExponents(this.amount * 10 ** this.item.currency.decimals)}-${this.item.end_date}`);
        console.log(signed_message);
        let requestLink = `${config.backendApiEntryPoint}voting/`;
        let requestOptions = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            "marketplace_id": this.checkedMarketplace,
            "lot_id": this.item.id,
            "currency": this.item.currency.address,
            "amount": this.noExponents(this.amount * 10 ** this.item.currency.decimals),
            "end_date": this.item.end_date,
            "signed_message": signed_message,
            "type": "SELL"
          })
        };
        let request = await fetch(requestLink, requestOptions);
        let requestJson = await request.json();
        if (requestJson.success) {
          location.reload();
        }
        else {
          alert('Error!');
        }
      }
    },
    noExponents (value) {
      var data = String(value).split(/[eE]/);
      if (data.length == 1) return data[0];

      var z = '',
        sign = value < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

      if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
      }
      mag -= str.length;
      while (mag--) z += '0';
      return str + z;
    }
  }
};
</script>
