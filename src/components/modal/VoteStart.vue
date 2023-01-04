<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">{{translatesGet('VOTE')}}</div>
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
                    <div>{{translatesGet('PRICE')}}</div>
                    <div class="price-value">
                      <div class="icon-value"></div>
                      <span>ETH</span>
                    </div>
                  </div>
                  <div class="input-wrapper input-wrapper-amount">
                    <input type="text" placeholder="Input amount" v-model="amount"  @input="setSellLotFee" onkeypress="return (event.charCode >= 48 && event.charCode <=57 || event.charCode == 46 || event.charCode == 44 || this.amount=='')">
                    <div class="input-equivalent equivalent" v-if="amount>0">≈ $ {{abbrNum(Math.round(amount * currencyToUsdPrice),1)}}</div>
                  </div>
                  <div class="input-prompt">{{translatesGet('ITEM_UNTIL_CANCELLED')}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-section-filter">
            <div class="modal-section-name">{{translatesGet('CHOOSE_MARKETPLACE')}}</div>
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

          <div class="modal-section-total">
            <div class="total-block">
              <div class="total-block-row">
                <div class="total-block-name">Total:</div>
                <div class="total-block-value">
                  <div class="total-amount">
                    <div class="icon-value"></div>
                    <b>{{abbrNum(toFixedIfNecessary(this.convertToEther(this.noExponents(this.noExponents(this.convertFromEtherToWei(this.amount))-parseInt(this.sellLotFee))),6),2)}} ETH</b><span>≈ $ {{abbrNum(toFixedIfNecessary(this.convertToEther(this.noExponents(this.noExponents(this.convertFromEtherToWei(this.amount))-parseInt(this.sellLotFee)))*currencyToUsdPrice,6),2)}}</span>
                  </div>
                  <div class="total-fees">{{translatesGet('FEES')}}: <span>{{this.contractConfig[0].sell_lot_fee/100}}%</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- v-if="currentPart "  -->
          <div class="modal-desktop-footer" v-if="!buttonWaiting">
            <button class="btn btn-modal-main" @click="startVote" v-if="(this.amount>0 & this.checkedMarketplace!=null)">{{translatesGet('START_VOTE')}}</button>
            <button disabled class="btn btn-modal-main" v-else>{{translatesGet('START_VOTE')}}</button>
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
        <button class="btn btn-modal-main" @click="startVote" v-if="(this.amount>0 & this.checkedMarketplace!=null)">{{translatesGet('START_VOTE')}}</button>
        <button disabled class="btn btn-modal-main" v-else>{{translatesGet('START_VOTE')}}</button>
      </div>

      <!-- v-else  -->
      <div   class="modal-mobile-footer" v-if="buttonWaiting">
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
import config from '@/config.json';
import ABI from '@/abi.json';
import { ethers } from 'ethers';
import { toRaw } from '@vue/reactivity';
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      item:null,
      marketplaces:null,
      render:false,
      checkedMarketplace:null,
      amount:null,
      currencyToUsdPrice:1,
      config:config,
      ABI:ABI,
      provider:null,
      buttonWaiting:false,
      lang: new MultiLang(this),
      contractConfig:null,
      sellLotFee:0
    };
  },
  async mounted(){    
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    let requestUrl = `${config.backendApiEntryPoint}marketplaces/`;
    let request = await fetch(requestUrl);
    let requestJson = await request.json();
    let marketplacesTemp = requestJson;
    this.contractConfig = await this.$store.getters['marketplaceListing/getContractConfig'];
    this.setSellLotFee();
    console.log(marketplacesTemp);
    let k = 0
    // for (let element of marketplacesTemp){
    //   console.log(element.id);
    //   if (element.id=='LORA'){
    //     console.log(element);
    //     marketplacesTemp = marketplacesTemp.splice(k+1,2);
    //   }
    //   k+=1;
    // }
    this.marketplaces = marketplacesTemp;
    this.provider = await this.$store.getters['walletsAndProvider/getGlobalProvider'];
    this.render = true;
    await this.setCurrencyToUsd();    
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
      this.buttonWaiting=true;
      if (this.amount>0 & this.checkedMarketplace!=null) {
        try {
          let signed_message = await this.$store.dispatch('walletsAndProvider/signMessageWithGlobalProvider',
            `${this.checkedMarketplace}-${this.item.id}-${this.item.currency.address}-${this.noExponents(this.amount * 10 ** this.item.currency.decimals)}-${this.item.end_date}`);
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
              "marketplace_id": this.checkedMarketplace,
              "lot_id": this.item.id,
              "currency": this.item.currency.address,
              "amount": this.noExponents(this.amount * 10 ** this.item.currency.decimals),
              "end_date": this.item.end_date,
              "signed_message": signed_message,
              "type": "SELL",
              "blockchain": this.item.collection.blockchain
            })
          };
          let request = await fetch(requestLink, requestOptions);
          let requestJson = await request.json();
          console.log(requestJson);
          if (requestJson.success) {
            console.log('OK');
            if (parseInt((requestJson.voting_percentage.replace('%', ''))) >= 51) {
              console.log('OK2');
              console.log(requestJson.voting_id);
              try{
                await this.sellLot(requestJson.voting_id)
              }
              catch{
                this.buttonWaiting=false;
                await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
                await this.$store.dispatch('appGlobal/setGreenSnack', false)
                await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 2)
              }
            }
            else {
              location.reload();
            }
          }
          else {
            this.buttonWaiting = false;
            await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
            await this.$store.dispatch('appGlobal/setGreenSnack', false)
            await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 2)
          }
        }
        catch{
          this.buttonWaiting=false;
          await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
          await this.$store.dispatch('appGlobal/setGreenSnack',false)
          await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)
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
    },
    async sellLot(_voting_Id) {
      try{
      console.log(this.config.contractAddress);
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
          await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)
        }
      }     
      const contract = new ethers.Contract(this.config.contractAddress, this.ABI.abi,await prov.getSigner());      
      let requestLink = `${config.backendApiEntryPoint}finish-voting/`;
      let requestOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body:JSON.stringify({
            voting_id: _voting_Id
          })
        };
      let request = await fetch(requestLink,requestOptions);
      let requestJson = await request.json();
      console.log(requestJson);
      
      let markeplaceId = ethers.utils.formatBytes32String(requestJson.data.marketplace).substring(0, 10);
      console.log(`price:${String(requestJson.data.lot.price)}`);
      console.log(`totalWithoutFee:${String(requestJson.data.lot.price - parseInt(this.sellLotFee))}`);
      console.log(`totalFee:${String((this.sellLotFee))}`);
      let lot = {
          tokenAddress: requestJson.data.lot.currency,
          decimals: String(requestJson.data.lot.decimals),
          price: String(requestJson.data.lot.price),
          collected: '0',
          occupancy: '0',
          tokenContractAddress: requestJson.data.lot.collection,
          tokenId: requestJson.data.lot.token_id,
          tokenAmount: requestJson.data.lot.token_amount,
          status: '0',
        };
      console.log(lot);
      let sellLot = await contract.sellLot(
        markeplaceId,
        requestJson.data.lot.id,
        lot,
        requestJson.data.signature,
        { gasLimit: '1000000' }
      
      );
      console.log(sellLot);
      let trx = await prov.waitForTransaction(sellLot.hash);
      if (trx.status == 1) {
        await this.$store.dispatch('appGlobal/setLastTransSuccess',true)
        await this.$store.dispatch('appGlobal/setLastTransactionHash', sellLot.hash);
        await this.$store.dispatch('appGlobal/setShowStartVotingModal', false);
        await this.$store.dispatch('appGlobal/setShowTransSuccessModal', true);
      }
      else{
        await this.$store.dispatch('appGlobal/setLastTransSuccess',false)
        await this.$store.dispatch('appGlobal/setLastTransactionHash', sellLot.hash);
        await this.$store.dispatch('appGlobal/setShowStartVotingModal', false);
        await this.$store.dispatch('appGlobal/setShowTransSuccessModal', true);
        this.buttonWaiting = false;
        await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
        await this.$store.dispatch('appGlobal/setGreenSnack', false)
        await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 2)    
      }
    }
    catch{
        this.buttonWaiting = false;
        await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
        await this.$store.dispatch('appGlobal/setGreenSnack', false)
        await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 2)
    }
      
    },
    setSellLotFee(){
      this.sellLotFee = this.noExponents((this.contractConfig[0].sell_lot_fee/100)/100*this.noExponents(this.convertFromEtherToWei(this.amount)));
    }
  }
};
</script>
