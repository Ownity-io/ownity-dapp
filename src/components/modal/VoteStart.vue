<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper-close" @click="this.$store.dispatch('appGlobal/setShowStartVotingModal',false)"></div>
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">{{translatesGet('TAKE_VOTE')}}</div>
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
                    <div>{{translatesGet('LISTING_PRICE_TO')}}</div>
                    <div class="price-value">
                      <div class="icon-value"></div>
                      <span>ETH</span>
                    </div>
                  </div>
                  <div class="input-wrapper input-wrapper-amount">
                    <input type="text" placeholder="Input amount" v-model="amount"  @input="setSellLotFee" onkeypress="return (event.charCode >= 48 && event.charCode <=57 || event.charCode == 46 || event.charCode == 44 || this.amount=='')" :disabled="blockPrice">
                    <div class="input-equivalent equivalent" v-if="amount>0">≈ $ {{useHelpers.abbrNum(Math.round(amount * currencyToUsdPrice),1,2)}}</div>
                  </div>
                  <div class="input-prompt">{{translatesGet('ITEM_UNTIL_VOTE')}}</div>
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
                    <input type="checkbox" :id="marketplace.id" @change="setMarketplace(marketplace.id)" :disabled="checkMarketplaceInMarketplacesId(marketplace.id)" :checked="checkMarketplaceInMarketplacesId(marketplace.id)">
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
                    <b>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.noExponents(this.noExponents(this.convertFromEtherToWei(this.amount))-parseInt(this.sellLotFee))),6),2)}} ETH</b><span>≈ $ {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.noExponents(this.noExponents(this.convertFromEtherToWei(this.amount))-parseInt(this.sellLotFee)))*currencyToUsdPrice,6),2,2)}}</span>
                  </div>
                  <div class="total-fees">{{translatesGet('FEES')}}: <span>{{this.contractConfig[0].sell_lot_fee/100}}%</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- v-if="currentPart "  -->
          <div class="modal-desktop-footer" v-if="!buttonWaiting">
            <button class="btn btn-modal-main" @click="startVote" v-if="(this.amount>0 & this.checkedMarketplaces.length>0)">{{translatesGet('START_VOTE')}}</button>
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
        <button class="btn btn-modal-main" @click="startVote" v-if="(this.amount>0 & this.checkedMarketplaces.length>0)">{{translatesGet('START_VOTE')}}</button>
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
import {mapGetters} from "vuex";
import helpers from "@/helpers/helpers";

export default {
  data() {
    return {
      useHelpers: helpers,
      item:null,
      marketplaces:null,
      render:false,
      checkedMarketplaces:[],
      amount:null,
      config:config,
      ABI:ABI,
      provider:null,
      buttonWaiting:false,
      lang: new MultiLang(this),
      contractConfig:null,
      sellLotFee:0,
      markeplacesId:[],
      blockPrice:false
    };
  },
  computed: {
    ...mapGetters(['getUsdRate']),
    currencyToUsdPrice() {
      return this.getUsdRate ? this.getUsdRate[`${this.item.currency.ticker}`] : 0
    }
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
    convertFromEtherToWei(value){
      return value * 10**this.item.currency.decimals;
    },
    async startVote() {
      this.buttonWaiting=true;
      if (this.amount>0 & this.checkedMarketplaces.length>0) {
        // try {
          let signed_message = await this.$store.dispatch('walletsAndProvider/signMessageWithGlobalProvider',
            `${this.item.id}-${this.item.currency.address}-${this.noExponents(this.amount * 10 ** this.item.currency.decimals)}-${this.item.end_date}`);
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
              "marketplace_id": this.checkedMarketplaces,
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
          if (requestJson.success) {
            if (parseInt((requestJson.data[0].voting_percentage.replace('%', ''))) >= 51 & this.item.internal_status!='ON SALE') {
              try{
                await this.sellLot(requestJson.data)
              }
              catch{
                this.buttonWaiting=false;
                await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
                await this.$store.dispatch('appGlobal/setGreenSnack', false)
                await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 2)
              }
            }
            else {
              let requestLinkTemp = null;
              let requestOptionsTemp = null;
              let requestTemp = null;
              let requestJsonTemp = null;
              for (let element of requestJson.data) {
                requestLinkTemp = `${config.backendApiEntryPoint}finish-voting/`;
                requestOptionsTemp = {
                  method: "POST",
                  headers: {
                    accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify({
                    voting_id: element.voting_id
                  })
                };
                requestTemp = await fetch(requestLinkTemp, requestOptionsTemp);
                requestJsonTemp = await requestTemp.json();
                this.checkSell();
              }
              location.reload();
            }
          }
          else {
            this.buttonWaiting = false;
            await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
            await this.$store.dispatch('appGlobal/setGreenSnack', false)
            await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 2)
          }
        // }
        // catch{
        //   this.buttonWaiting=false;
        //   console.log(333)
        //   await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
        //   await this.$store.dispatch('appGlobal/setGreenSnack',false)
        //   await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)
        // }
        
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
    async sellLot(_voting_Ids) {
      try{
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
          console.log(444)
          await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
          await this.$store.dispatch('appGlobal/setGreenSnack',false)
          await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)
        }
      }     
      const contract = new ethers.Contract(this.config.contractAddress, this.ABI.abi,await prov.getSigner()); 
      let requestLink = null;
      let requestOptions = null;
      let request =null;
      let requestJson = null;
        for (let element of _voting_Ids) {
          requestLink = `${config.backendApiEntryPoint}finish-voting/`;
          requestOptions = {
            method: "POST",
            headers: {
              accept: "application/json",
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              voting_id: element.voting_id
            })
          };
          request = await fetch(requestLink, requestOptions);
          requestJson = await request.json();
        }     
      
      let markeplaceId = ethers.utils.formatBytes32String(requestJson.data.marketplace).substring(0, 10);
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
      let sellLot = await contract.sellLot(
        markeplaceId,
        requestJson.data.lot.id,
        lot,
        requestJson.data.signature,
        { gasLimit: '1000000' }
      
      );
      let trx = await prov.waitForTransaction(sellLot.hash);
      if (trx.status == 1) {
        let forceReq = await (await fetch(
            `${config.backendApiEntryPoint}force-scanner/`,
            {
              body:JSON.stringify({
                scanner:'sell_lot',
                block:trx.blockNumber,
                blockchain: this.item.blockchain
              }),
              headers: {
                accept: "application/json",
                'Content-Type': 'application/json',
              },
              method:'POST'
            })).json();
        await this.checkSell();
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
    },
    setMarketplace(markeplaceId){      
      let existFlag = false;
      let index = 0;
      let checkedMarketplacesTemp = this.checkedMarketplaces;
      for (let element of checkedMarketplacesTemp){
        if (element == markeplaceId){
          existFlag = true;
          checkedMarketplacesTemp.splice(index,1)
          break
        }
        index+=1;
      }
      this.checkedMarketplaces = checkedMarketplacesTemp;
      if (!existFlag){
        this.checkedMarketplaces.push(markeplaceId);
      }
    },
    setMaxVoting(){
      if (this.item.votings){
        for (let element of this.item.votings){
            if ((element.status=='ON SALE'||element.status=='FULFILLED')&element.type!='CANCEL') {
              this.voting = element;
              this.markeplacesId.push(element.marketplace.id);
              this.blockPrice = true;   
              this.amount = (this.useHelpers.toFixedIfNecessary(this.useHelpers.convertToEther(this.voting.amount),6));
            }
        }
      }
    },
    checkMarketplaceInMarketplacesId(id){
      for (let element of this.markeplacesId){
        if (id == element){
          return true;
        }
      }
      return false;
    },
    async checkSell() {
      for (let element of this.item.votings) {
        if (element.status == 'FULFILLED' & element.type != 'CANCEL') {
          let requestLink = `${config.backendApiEntryPoint}/check-sell-nft/?voting=${element.id}`;
          let requestOptions = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };
          let request = await fetch(requestLink,requestOptions);
          let requestJson = await request.json();
          if (requestJson.success == false){
            //wait 2 sec
            request = await fetch(requestLink, requestOptions);
            requestJson = await request.json();
            if (requestJson.success == false){
              //show contact us modal
              console.log('show contact us modal');
            }
          }
        }
      }
    }
  },
  async mounted(){
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    let requestUrl = `${config.backendApiEntryPoint}marketplaces/`;
    let request = await fetch(requestUrl);
    let requestJson = await request.json();
    let marketplacesTemp = requestJson;
    this.contractConfig = await this.$store.getters['marketplaceListing/getContractConfig'];
    this.setSellLotFee();
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
    this.setMaxVoting();
    this.render = true;
  }
};
</script>
