<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper-close" @click="this.$store.dispatch('appGlobal/setShowSellPartModal',false);this.waitingForTransaction = false;"></div>
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">{{translatesGet('SELL_YOUR_NFT')}}</div>
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setShowSellPartModal',false);this.waitingForTransaction = false;">
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
            <!--when 1%-->

            <div class="procent">
              <p>1% ≈ </p>
              <div class="procent-val">                            
                <p>{{String(useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.item.price/100),6),2)).replace('≈','')}} ETH </p>
                <div class="val-icon"></div>    
              </div>
            </div>

            <!--end when 1%-->



          </div>

          <div class="modal-section-main-data resize">
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
                    <input maxlength="8" type="text" placeholder="Input amount" v-model="priceForPart" @input="setSellFractionFee" >
                    <div class="input-equivalent equivalent" v-if="priceForPart>0">≈ $ {{useHelpers.abbrNum(Math.round(priceForPart * currencyToUsdPrice),1,2)}}</div>
                  </div>
                  <div class="input-prompt">{{translatesGet('ITEM_UNTIL_CANCELLED')}}</div>
                </div>
              </div>
              <div class="modal-data-block modal-select-part">
                <div class="input-select-block">
                  <div class="input-select-title">{{translatesGet('CHOOSE_PART')}}</div>
                  <div class="input-wrapper input-percent">
                    <input type="text"
                    placeholder="0%" v-model="this.currentPart" @input="checkCurrentPart"> 
                  </div>
                  <div class="input-select-prompt">
                    {{translatesGet('INPUT_MIN')}}
                    1%
                    {{translatesGet('TO')}}
                    {{translatesGet('INPUT_MAX')}}
                    {{useHelpers.toFixedIfNecessary(this.userBidAmount/this.item.price*100,0) - this.userBidOnSaleAmount}}%
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
                    <b>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.noExponents(this.noExponents(this.convertFromEtherToWei(this.priceForPart))-parseInt(this.sellFractionFee))),6),2)}} ETH</b><span>≈ $ {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.noExponents(this.noExponents(this.convertFromEtherToWei(this.priceForPart))-parseInt(this.sellFractionFee)))*currencyToUsdPrice,6),2,2)}}</span>
                  </div>
                  <div class="total-fees">{{translatesGet('FEES')}}: <span>{{this.contractConfig[0].sell_fraction_fee/100}}%</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="total-block-describe">
            There’s a small fee Ownity charges for fraction purchases.
            <a href="#">Learn more.</a>
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
import {mapGetters} from "vuex";
import helpers from "@/helpers/helpers";
export default {
  data() {
    return {
      useHelpers: helpers,
      selectOpen: false,
      currentPart:null,
      priceForPart:0,
      item:null,
      partVariants:[0,1,2,3,4,5,10,15,20,49,50,100],
      provider:null,
      render:false,
      userBidAmount:0,
      config:config,
      ABI:ABI,
      buttonWaiting:false,
      lang: new MultiLang(this),
      contractConfig:null,
      sellFractionFee:0,
      itemWithBidsOnSale:null,
      userBidOnSaleAmount:0,
      waitingForTransaction:false
    };
  },
  computed: {
    ...mapGetters(['getUsdRate']),
    currencyToUsdPrice() {
      return this.getUsdRate ? this.getUsdRate[`${this.item.currency.ticker}`] : 0
    }
  },
  methods:{
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
      try{
      this.buttonWaiting=true;
      let prov = toRaw(this.provider);
      let chainSettings = toRaw(this.config.evmChains[this.item.collection.blockchain])
      try{
        await prov.send('wallet_switchEthereumChain',[{chainId: chainSettings.chainId}]);
      }
      catch{
        try{
          await prov.send('wallet_addEthereumChain',[chainSettings]);  
        }
        catch{
          await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
          await this.$store.dispatch('appGlobal/setGreenSnack',false)
          await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',10)
        }
      }     
      const contract = new ethers.Contract(this.config.contractAddress, this.ABI.abi,await prov.getSigner());  
      // console.log(`amount:${this.noExponents(this.useHelpers.toFixedIfNecessary(this.item.price/100*this.currentPart,0))}`);
      // console.log(`price:${ this.noExponents(this.convertFromEtherToWei(this.priceForPart))}`);
      // console.log(`total:${this.noExponents(this.noExponents(this.convertFromEtherToWei(this.priceForPart))-parseInt(this.sellFractionFee))}`);
      let sellFraction = await contract.sellFraction(this.item.id, this.noExponents(this.currentPart*10**18), this.noExponents(this.convertFromEtherToWei(this.priceForPart)),
      {gasLimit:'1000000'});

      let trx = await prov.waitForTransaction(sellFraction.hash);
      if (trx.status == 1) {
        let forceReq = await (await fetch(
            `${config.backendApiEntryPoint}force-scanner/`,
            {
              body:JSON.stringify({
                scanner:'on_sale_bids',
                block:trx.blockNumber,
                blockchain: this.item.blockchain
              }),
              headers: {
                accept: "application/json",
                'Content-Type': 'application/json',
              },
              method:'POST'
            })).json();
        if (this.waitingForTransaction) {
          await this.$store.dispatch('appGlobal/setLastTransSuccess', true)
          await this.$store.dispatch('appGlobal/setLastTransactionHash', sellFraction.hash);
          await this.$store.dispatch('appGlobal/setShowSellPartModal', false);
          await this.$store.dispatch('appGlobal/setShowTransSuccessModal', true);
        }        
      }
      else{
        if (this.waitingForTransaction) {
          await this.$store.dispatch('appGlobal/setLastTransSuccess', false)
          await this.$store.dispatch('appGlobal/setLastTransactionHash', sellFraction.hash);
          await this.$store.dispatch('appGlobal/setShowSellPartModal', false);
          await this.$store.dispatch('appGlobal/setShowTransSuccessModal', true);
          this.buttonWaiting = false;
          await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
          await this.$store.dispatch('appGlobal/setGreenSnack', false)
          await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 10)
        }        
      }
    }
    catch{
      if (this.waitingForTransaction) {
        await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
        await this.$store.dispatch('appGlobal/setGreenSnack', false)
        await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 10)
        this.buttonWaiting = false;
      }
    }
    },
    translatesGet(key) {
            return this.lang.get(key);
    },
    setSellFractionFee(){
      if (this.priceForPart == '') {
        this.priceForPart = null
      }
      else if (isNaN(this.priceForPart)){
          this.priceForPart = parseInt(this.priceForPart) 
          if (isNaN(this.priceForPart)){
            this.priceForPart = null
          }
      }
      this.sellFractionFee = this.noExponents((this.contractConfig[0].sell_fraction_fee/100)/100*this.noExponents(this.convertFromEtherToWei(this.priceForPart)));
    },
    checkCurrentPart(){      
      if (this.currentPart == '') {
        this.currentPart = null
      }
      else if (this.currentPart < 1) {
        this.currentPart = 1
        if (this.currentPart > (this.useHelpers.toFixedIfNecessary(this.userBidAmount/this.item.price*100,0) - this.userBidOnSaleAmount)){
          this.currentPart = 0;
        }

      }
      else if (this.currentPart > (this.useHelpers.toFixedIfNecessary(this.userBidAmount/this.item.price*100,0) - this.userBidOnSaleAmount)){
        this.currentPart = this.useHelpers.toFixedIfNecessary(this.userBidAmount/this.item.price*100,0) - this.userBidOnSaleAmount;
      }
      else if (this.currentPart > (this.useHelpers.toFixedIfNecessary(this.userBidAmount/this.item.price*100,0))) {
        this.currentPart = this.useHelpers.toFixedIfNecessary(this.userBidAmount/this.item.price*100,0)
      }
      else if (isNaN(parseInt(this.currentPart))){
          this.currentPart = null    
      }
      else{
        this.currentPart = parseInt(this.currentPart);
      }
    },
    setBidOnSaleAmount(){
      if (this.itemWithBidsOnSale.bids){      
          for (let element of this.itemWithBidsOnSale.bids){
            if (element.address == localStorage.getItem('userAddress')){
              this.userBidOnSaleAmount += (element.fraction_amount/10**18);
            }
          }
      } 

    }
  },
  async mounted(){
    this.waitingForTransaction = true;
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    this.itemWithBidsOnSale = await (await fetch(`${config.backendApiEntryPoint}listing-with-on-sale-bids/${this.item.id}`)).json();
    this.setBidOnSaleAmount();
    this.provider = await this.$store.getters['walletsAndProvider/getGlobalProvider'];
    this.setUserBidAmount();
    this.contractConfig = await this.$store.getters['marketplaceListing/getContractConfig'];
    this.setSellFractionFee();
    this.render = true;
  },
  watch: { 
  '$route': {
    handler: function() {
      console.log('route changed');
      this.waitingForTransaction = false;
    },
    deep: true,
    immediate: true
  }
}
};
</script>
