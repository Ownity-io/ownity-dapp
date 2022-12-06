<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Deposit part</div>
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setshowStartCollectingModal',false)">
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
              <div class="modal-data-block modal-select-part">
                <div class="input-select-block">
                  <div class="input-select-title">Choose part</div>
                  <div class="input-select-wrap" :class="{ 'unfolded': selectOpen }">
                    <button
                      class="input-selected"
                      @click="selectOpen = !selectOpen"
                    >
                      <span>{{currentPart}}%</span>
                      <i class="i-arrow-down-s-line"></i>
                    </button>
                    <div class="drop-down">
                      <ul>
                        <li v-for="value in partVariants" :key="value" @click="this.currentPart = value;selectOpen = !selectOpen">
                          <span>{{value}}%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="input-select-prompt">Min 1% to Max 10%</div>
                </div>
              </div>
              <div class="modal-data-block modal-data-block-price">
                <div class="price-block">
                  <div class="price-block-title">Min 5% to Max 20%</div>
                  <div class="price-block-value price-value">
                    <div class="icon-value"></div>
                    <span>{{abbrNum(((this.item.price/100)*currentPart)/(10**item.currency.decimals),1)}} ETH</span>
                  </div>
                  <div class="price-block-equivalent equivalent">≈ $ {{abbrNum(toFixedIfNecessary(((this.item.price/100)*currentPart)/(10**item.currency.decimals)*currencyToUsdPrice,6),1)}}</div>
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
                    <b>{{abbrNum(((this.item.price/100)*currentPart)/(10**item.currency.decimals),1)}} ETH</b><span>≈ $ {{abbrNum(toFixedIfNecessary(((this.item.price/100)*currentPart)/(10**item.currency.decimals)*currencyToUsdPrice,6),1)}}</span>
                  </div>
                  <div class="total-fees">Fees:<span>3%</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="total-block-describe">
            The marketplace charges a fee for each transaction.
            <a href="#">Terms of Use</a>
          </div>
          <button class="btn btn-modal-main btn-modal-desktop" @click="this.buyLot()" v-if="currentPart>0">Deposit part</button>
        </div>
      </div>
            
      <div class="modal-mobile-footer">
        <button class="btn btn-modal-main" @click="this.buyLot()" v-if="currentPart>0">Deposit part</button>
      </div>
      
    </div>
  </div>
</template>
<script>
import { ethers } from 'ethers';
import ABI from '@/abi.json';
import config from '@/config.json';
import { toRaw } from '@vue/reactivity';
export default {
  data() {
    return {
      selectOpen: false,
      item:null,
      ABI:ABI,
      render:false,
      config:config,
      provider:null,
      signer:null,
      partVariants:[0,2,3,4,5,10,15,20],
      currentPart:0,
      currencyToUsdPrice:1,
      allBidsAmount:0
    };
  },
  async mounted(){
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    this.provider = await this.$store.getters['walletsAndProvider/getGlobalProvider'];
    this.signer = await this.$store.getters['walletsAndProvider/getSigner'];
    this.setCurrencyToUsd();
    this.setAllBidsAmount();
    this.render = true;
  },
  methods:{
    async buyLot(){  
      // console.log(await this.signer.getAddress());    
      // console.log(typeof(this.signer));
      // console.log(toRaw(this.signer));
      const contract = new ethers.Contract(this.config.contractAddress, this.ABI.abi,await (toRaw(this.provider)).getSigner());
      let markeplaceId = ethers.utils.formatBytes32String(this.item.marketplace.id).substring(0, 10);
      let options = {};
      let valueToBuy = (ethers.BigNumber.from(String((this.item.price/100)*this.currentPart))).toString();
      if (valueToBuy>(this.item.price-this.allBidsAmount)){
        console.log('Part is too big');
        valueToBuy = this.item.price-this.allBidsAmount;
      }
      if (this.item.currency.address == '0x0000000000000000000000000000000000000000'){
        options.value = valueToBuy;
      }      
      options.gasLimit ='600000' ;
      let requestUrl = `${config.backendApiEntryPoint}buy-nft/`;
      let requestOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body:JSON.stringify({
            "blockchain":this.item.collection.bockchain,
            "marketplace": this.item.marketplace.id,
            "collection": this.item.collection.contract_address,
            "token_id": this.item.token_id
          })
        };
      let request = await fetch(requestUrl,requestOptions);
      let requestJson = await request.json();
      let inputData = requestJson.data.data;
      // console.log(requestJson);
      requestUrl = `${config.backendApiEntryPoint}sign/`;
      requestOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body:JSON.stringify({
            lot_id: this.item.id
          })
        };
      request = await fetch(requestUrl,requestOptions);
      requestJson = await request.json();
      // console.log(requestJson);
      let signature = requestJson.data.signature;
      // let part = (ethers.BigNumber.from(String((this.item.price/100)*this.currentPart))).toString();
      try{
        console.log('-----------------');
        console.log(`Marketplace ID: ${markeplaceId}`);
        console.log(`Lot ID: ${this.item.id}`);
        console.log(`Amount: ${valueToBuy}`);
        console.log('--------LOT_DATA--------');
        console.log(`tokenAddress: ${this.item.currency.address}`);
        console.log(`Decimals: ${this.item.currency.decimals}`);
        console.log(`price: ${this.item.price}`);
        console.log(`tokenContractAddress: ${this.item.collection.contract_address}`);
        console.log(`tokenId: ${this.item.token_id}`);
        console.log(`tokenAmount: ${this.item.amount}`);
        console.log('--------LOT_DATA--------');
        console.log(`Input data: ${inputData}`);
        console.log(`Signature: ${signature}`);
        // console.log(`Options: ${options.value}`);
        console.log('-----------------');
        let buyLot = await contract.buyLot(
          markeplaceId,
          this.item.id,
          valueToBuy,
          {
            tokenAddress: this.item.currency.address,
            decimals: this.item.currency.decimals,
            price: this.item.price,
            collected: '0',
            occupancy: '0',
            tokenContractAddress: this.item.collection.contract_address,
            tokenId: this.item.token_id,
            tokenAmount: this.item.amount,
            status: '0',
          },
          inputData,
          signature,
          options
        );
        location.reload();
      }
      catch{
        alert('Error');
      }
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
    setAllBidsAmount(){
      this.allBidsAmount=0;
      if (this.item.bids!=null){
        for (let element of this.item.bids){
          this.allBidsAmount+=parseInt(element.amount);
        }
        return;
      }
    },
  }
};
</script>
