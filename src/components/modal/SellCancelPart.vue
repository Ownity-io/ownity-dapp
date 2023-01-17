<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper-close" @click="this.$store.dispatch('appGlobal/setCancellSellVotingModal',false)"></div>
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">{{translatesGet('CANCEL_SELL')}}</div>
        <!-- (Відмінити продаж на маркетплейсі) -->
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setCancellSellVotingModal',false)">
          <i class="i-close-line"></i>
        </button>
      </div>

      <div class="modal-content">
        <div class="modal-container">
          <div class="modal-section-nft-data">
            <div class="modal-nft-data">
              <div class="icon-nft"  :style="{backgroundImage: `url(${item.media})`}"></div>
              <div class="nft-data">
                <div class="nft-id">{{this.item.token_id}}</div>
                <div>{{this.item.collection.name}}</div>
              </div>
            </div>
          </div>

          <div class="modal-section-main-data">
            <div class="modal-main-data-container">
              <div class="modal-data-block modal-nft-block">
                {{translatesGet('LIST_NFT_SELL')}}
                <div class="nft-block">
                  <div class="icon-nft-block" :style="{backgroundImage: `url(${this.voting.marketplace.logo})`}"></div>
                  <span>{{this.voting.marketplace.name}}</span>
                </div>
              </div>
              <div class="modal-data-block modal-data-block-price">
                <div class="price-block">
                  <div class="price-block-title">{{translatesGet('PRICE_PART')}}</div>
                  <div class="price-block-value price-value">
                    <div class="icon-value"></div>
                    <span>{{this.abbrNum(this.toFixedIfNecessary(this.userBidAmount/10**item.currency.decimals,6),1)}} ETH</span>
                  </div>
                  <div class="price-block-equivalent equivalent">≈ $ {{this.toFixedIfNecessary(abbrNum((userBidAmount / (10**this.item.currency.decimals) * currencyToUsdPrice),1),2)}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-section-total">
            <div class="total-block">
              <div class="total-block-row">
                <div class="total-block-name">{{translatesGet('TOTAL')}}:</div>
                <div class="total-block-value">
                  <div class="total-amount">
                    <div class="icon-value"></div>
                    <b>{{this.abbrNum(this.toFixedIfNecessary(this.userBidAmount/10**item.currency.decimals,6),1)}} ETH</b><span>≈ $ {{this.toFixedIfNecessary(abbrNum((userBidAmount / (10**this.item.currency.decimals) * currencyToUsdPrice),1),2)}}</span>
                  </div>
                  <!-- <div class="total-fees">Fees:<span>3%</span></div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="total-block-describe">
            {{translatesGet('TOTAL_DESCRIBE')}}
            <a href="#">{{translatesGet('TERMS_OF_USE')}}</a>
          </div>
          
          <!-- v-if="currentPart "  -->
          <div class="modal-desktop-footer">
            <!-- <button disabled class="btn btn-modal-main">{{translatesGet('CANCEL_SELL')}}</button> -->
            <button class="btn btn-modal-main" @click="startVote">{{translatesGet('CANCEL_SELL')}}</button>
          </div>

          <!-- v-else  -->
          <!-- <div class="modal-desktop-footer">
            <button class="btn btn-modal-main" @click="startVote">{{translatesGet('CANCEL_SELL')}}</button>
            <button class="btn btn-modal-main">
              <svg class="loader" viewBox="0 0 18 18"  xmlns="http://www.w3.org/2000/svg">
                <path d="M15.364 2.63609L13.95 4.05009C12.8049 2.90489 
                11.2982 2.19215 9.6865 2.03333C8.07482 1.87451 
                6.45794 2.27942 5.11134 3.17908C3.76474 4.07874 
                2.77174 5.41748 2.30154 6.9672C1.83134 8.51692 
                1.91302 10.1817 2.53268 11.678C3.15234 13.1742 
                4.27162 14.4093 5.69983 15.1728C7.12803 15.9363 
                8.77679 16.181 10.3652 15.8652C11.9536 15.5493 
                13.3833 14.6925 14.4108 13.4407C15.4382 12.1889 
                15.9999 10.6196 16 9.00009H18C18 11.0823 17.278 13.1001 15.957 14.7096C14.6361 16.3192 12.7979 17.4209 10.7557 17.8271C8.71355 18.2333 6.5937 17.9188 4.75737 16.9373C2.92104 15.9557 1.48187 14.3678 0.685061 12.4441C-0.111747 10.5204 -0.216886 8.37992 0.387558 6.38739C0.992002 4.39486 2.26863 2.67355 3.99992 1.51675C5.73121 0.359959 7.81004 -0.160747 9.88221 0.0433572C11.9544 0.247462 13.8917 1.16375 15.364 2.63609V2.63609Z" fill="white"/>
              </svg>
            </button>
          </div>-->
        </div>
      </div> 
              
      <!-- v-if="currentPart "  -->
      <div  class="modal-mobile-footer">
        <!-- <button disabled class="btn btn-modal-main">{{translatesGet('CANCEL_SELL')}}</button> -->
        <button class="btn btn-modal-main" @click="startVote">{{translatesGet('CANCEL_SELL')}}</button>
      </div>

      <!-- v-else  -->
      <!-- <div   class="modal-mobile-footer">
        <button   class="btn btn-modal-main" @click="startVote">{{translatesGet('CANCEL_SELL')}}</button>
        <button class="btn btn-modal-main">
          <svg class="loader" viewBox="0 0 18 18"  xmlns="http://www.w3.org/2000/svg">
            <path d="M15.364 2.63609L13.95 4.05009C12.8049 2.90489 
            11.2982 2.19215 9.6865 2.03333C8.07482 1.87451 
            6.45794 2.27942 5.11134 3.17908C3.76474 4.07874 
            2.77174 5.41748 2.30154 6.9672C1.83134 8.51692 
            1.91302 10.1817 2.53268 11.678C3.15234 13.1742 
            4.27162 14.4093 5.69983 15.1728C7.12803 15.9363 
            8.77679 16.181 10.3652 15.8652C11.9536 15.5493 
            13.3833 14.6925 14.4108 13.4407C15.4382 12.1889 
            15.9999 10.6196 16 9.00009H18C18 11.0823 17.278 13.1001 15.957 14.7096C14.6361 16.3192 12.7979 17.4209 10.7557 17.8271C8.71355 18.2333 6.5937 17.9188 4.75737 16.9373C2.92104 15.9557 1.48187 14.3678 0.685061 12.4441C-0.111747 10.5204 -0.216886 8.37992 0.387558 6.38739C0.992002 4.39486 2.26863 2.67355 3.99992 1.51675C5.73121 0.359959 7.81004 -0.160747 9.88221 0.0433572C11.9544 0.247462 13.8917 1.16375 15.364 2.63609V2.63609Z" fill="white"/>
          </svg>
        </button>
      </div> -->
      
    </div>
  </div>
</template>

<script>
import config from '@/config.json';
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      selectOpen: false,
      voting:null,
      render:false,
      item:null,
      currencyToUsdPrice:1,
      render:false,
      userBidAmount:null,
      lang: new MultiLang(this),
    };
  },
  async mounted(){
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    this.voting = this.$store.getters['appGlobal/getCurrentVoting'];
    this.setCurrencyToUsd();
    this.setUserBidAmount();
    this.render = true;
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
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
        let signed_message = await this.$store.dispatch('walletsAndProvider/signMessageWithGlobalProvider',
          `${this.item.id}-${this.item.currency.address}-${this.noExponents(this.voting.amount)}-${this.item.end_date}`);
        console.log(signed_message);
        let requestLink = `${config.backendApiEntryPoint}voting-create/`;
        let requestOptions = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            "marketplace_id": [this.voting.marketplace.id],
            "lot_id": this.item.id,
            "currency": this.item.currency.address,
            "amount": this.noExponents(this.voting.amount),
            "end_date": this.item.end_date,
            "signed_message": signed_message,
            "type": "CANCEL",
            "blockchain":this.item.collection.blockchain
          })
        };
        let request = await fetch(requestLink, requestOptions);
        let requestJson = await request.json();
        console.log(requestJson);
        console.log(requestJson.data[0].voting_id);
        if (requestJson.success) {    
          if (parseInt((requestJson.data[0].voting_percentage.replace('%', ''))) >= 51) {
            console.log('ВИКЛИКАЮ finish-voting !!!!!');
            requestLink = `${config.backendApiEntryPoint}finish-voting/`;
            console.log(requestLink);
            requestOptions = {
              method: "POST",
              headers: {
                accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                voting_id: requestJson.data[0].voting_id
              })
            };
            console.log(requestOptions);
            request = await fetch(requestLink, requestOptions);
            requestJson = await request.json();
            console.log(requestJson);
          }
          // location.reload();
        }        
        else {
          await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
          await this.$store.dispatch('appGlobal/setGreenSnack',false)
          await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)
        }
    },
    async setUserBidAmount(){
      let userAddress = localStorage.getItem('userAddress');
      this.userAddress = userAddress;
      if (this.item.bids!=null & userAddress!=null & userAddress!='null'){
        for (let element of this.item.bids){
          if (element.address == userAddress){
            this.userBidAmount = parseInt(element.amount);
            return;
          }
        }
        return
      }
      this.userBidAmount=0;      
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
