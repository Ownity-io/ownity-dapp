<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">{{translatesGet('SELL_YOUR_NFT')}}</div>
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setShowSellPartModal',false)">
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
            <div class="modal-main-data-container modal-main-input-select">
              <div class="modal-data-block modal-data-block-price">
                <div class="modal-input container-input">
                  <div class="input-header">
                    <div>Price</div>
                    <div class="price-value">
                      <div class="icon-value"></div>
                      <span>ETH</span>
                    </div>
                  </div>
                  <div class="input-wrapper input-wrapper-amount">
                    <input type="text" placeholder="Input amount" v-model="priceForPart">
                    <div class="input-equivalent equivalent" v-if="priceForPart>0">≈ $ {{abbrNum(Math.round(priceForPart * currencyToUsdPrice),1)}}</div>
                  </div>
                  <div class="input-prompt">{{translatesGet('ITEM_UNTIL_CANCELLED')}}</div>
                </div>
              </div>
              <div class="modal-data-block modal-select-part">
                <div class="input-select-block">
                  <div class="input-select-title">{{translatesGet('CHOOSE_PART')}}</div>
                  <div class="input-wrapper input-percent">
                    <input type="text" v-model="partComputed"
                    placeholder="0%"
                    onkeypress="return (event.charCode >= 48 && event.charCode <=57 && ((this.value<100 && this.value>=1 )|| this.value==''))"
                    > 
                  </div>
                  <div class="input-select-prompt">
                    {{translatesGet('INPUT_MIN')}}
                    1%
                    {{translatesGet('TO')}}
                    {{translatesGet('INPUT_MAX')}}
                    100%
                    <!-- Min 1% to Max 100% -->
                  </div>
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
                    <b>{{abbrNum(toFixedIfNecessary(convertToEther((item.price/100)*currentPart),6),2)}} ETH</b><span>≈ $ {{abbrNum(toFixedIfNecessary(convertToEther((item.price/100)*currentPart)*currencyToUsdPrice,2),2)}}</span>
                  </div>
                  <div class="total-fees">{{translatesGet('FEES')}}:<span>3%</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="total-block-describe">
            {{translatesGet('TOTAL_DESCRIBE')}}
            <a href="#">{{translatesGet('TERMS_OF_USE')}}</a>
          </div>
      
          <!-- v-if="currentPart "  -->
          <div class="modal-desktop-footer" v-if="!buttonWaiting">
            <button disabled class="btn btn-modal-main" v-if="!(currentPart>0 & priceForPart>0)">Sell</button>
            <button class="btn btn-modal-main" @click="sellPart" v-else>Sell</button>
          </div>

          <!-- v-else  -->
          <div class="modal-desktop-footer" v-if="buttonWaiting">
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
          </div>

        </div>
      </div>
            
      <!-- v-if="currentPart "  -->
      <div  class="modal-mobile-footer" v-if="!buttonWaiting">
        <button disabled class="btn btn-modal-main" v-if="!(currentPart>0 & priceForPart>0)">Sell</button>
            <button class="btn btn-modal-main" @click="sellPart" v-else>Sell</button>
      </div>

      <!-- v-else  -->
      <div   class="modal-mobile-footer" v-if="buttonWaiting">
        <button   class="btn btn-modal-main">{{translatesGet('DEPOSIT_PART')}}</button>
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
      </div>
      
    </div>
  </div>
</template>

<script>
import ABI from '@/abi.json';
import { ethers } from 'ethers';
import { toRaw } from '@vue/reactivity';
import config from '@/config';
import MultiLang from "@/core/multilang";
export default {
  data() {
    return {
      selectOpen: false,
      currentPart:0,
      priceForPart:0,
      item:null,
      partVariants:[0,1,2,3,4,5,10,15,20,49,50,100],
      provider:null,
      currencyToUsdPrice:1,
      render:false,
      userBidAmount:0,
      config:config,
      ABI:ABI,
      buttonWaiting:false,
      lang: new MultiLang(this),
      contractConfig:null
    };
  },
  async mounted(){
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    this.provider = await this.$store.getters['walletsAndProvider/getGlobalProvider'];
    this.setCurrencyToUsd();
    this.setUserBidAmount();
    this.contractConfig = await this.$store.getters['marketplaceListing/getContractConfig'];
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
      return String(value * 10**this.item.currency.decimals);
    },
    setUserBidAmount(){
      let userAddress = localStorage.getItem('userAddress');
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
    async sellPart(){
      this.buttonWaiting=true;
      const contract = new ethers.Contract(this.config.contractAddress, this.ABI.abi,await (toRaw(this.provider)).getSigner());  
      let sellFraction = await contract.sellFraction(this.item.id, String(this.item.price/100*this.currentPart), String(this.convertFromEtherToWei(this.priceForPart)));
      console.log(sellFraction);
      let trx = await (toRaw(this.provider)).waitForTransaction(sellFraction.hash);
      if (trx.status == 1) {
        await this.$store.dispatch('appGlobal/setLastTransactionHash', sellFraction.hash);
        await this.$store.dispatch('appGlobal/setShowSellPartModal', false);
        await this.$store.dispatch('appGlobal/setShowTransSuccessModal', true);
      }
      else{
        this.buttonWaiting = false;
        console.log('Error in contract');
      }
    },
    translatesGet(key) {
            return this.lang.get(key);
    },
  },
  computed:{
    partComputed:{
      get(){
        return this.currentPart
      },
      set(value){
        if (parseInt(value)>=100){
          this.currentPart=100
        }
        else if(parseInt(value)<=1){
          this.currentPart=1
        }
        else if(value == ''){
          this.currentPart=null
        }
        else{
          this.currentPart = value
        }
        
      }
    }
  },
};
</script>
