<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Cancel sell (Відмінити продаж на маркетплейсі)</div>
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
                List your NFT to sell on
                <div class="nft-block">
                  <div class="icon-nft-block" :style="{backgroundImage: `url(${this.voting.marketplace.logo})`}"></div>
                  <span>{{this.voting.marketplace.name}}</span>
                </div>
              </div>
              <div class="modal-data-block modal-data-block-price">
                <div class="price-block">
                  <div class="price-block-title">Price of your part</div>
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
                <div class="total-block-name">Total:</div>
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
            The marketplace charges a fee for each transaction.
            <a href="#">Terms of Use</a>
          </div>
          <button class="btn btn-modal-main" @click="vote">Cancel sell</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.json'
export default {
  data() {
    return {
      selectOpen: false,
      voting:null,
      render:false,
      item:null,
      currencyToUsdPrice:1,
      render:false,
      userBidAmount:null
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
    async vote() {
        let signed_message = await this.$store.dispatch('walletsAndProvider/signMessageWithGlobalProvider',
          `${this.voting.marketplace.id}-${this.item.id}-${this.item.currency.address}-${this.voting.amount}-${this.voting.end_date}`);
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
            "marketplace_id": this.voting.marketplace.id,
            "lot_id": this.item.id,
            "currency": this.item.currency.address,
            "amount":this.voting.amount,
            "end_date":this.voting.end_date,
            "signed_message": signed_message,
            "type": 'CANCEL'
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
    }
  }
};
</script>
