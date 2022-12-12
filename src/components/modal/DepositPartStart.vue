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
                  <div class="input-wrapper input-percent">
                    <input type="text" v-model="partComputed"
                    placeholder="0%"
                    onkeypress="return (event.charCode >= 48 && event.charCode <=57 && ((this.value<100 && this.value>=1 )|| this.value==''))"
                    > 
                  </div>
                  <!--  <div class="input-select-wrap" :class="{ 'unfolded': selectOpen }">
                    <input type="text" class="input-selected" v-model="partComputed"
                    onkeypress="return (event.charCode >= 48 && event.charCode <=57 && ((this.value<100 && this.value>=1 )|| this.value==''))"
                    >                    
                   <button
                      class="input-selected"
                      @click="selectOpen = !selectOpen"
                    >
                      <span>{{currentPart}}%</span>
                      <i class="i-arrow-down-s-line"></i>
                    </button> -->
                    <!-- <div class="drop-down">
                      <ul>
                        <li v-for="value in partVariants" :key="value" @click="this.currentPart = value;selectOpen = !selectOpen">
                          <span>{{value}}%</span>
                        </li>
                      </ul>
                    </div> 
                  </div>-->
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

          <!-- v-if="currentPart "  -->
          <div v-if="!buttonWaiting" class="modal-desktop-footer">
            <button disabled class="btn btn-modal-main" v-if="!(currentPart>0 & currentPart!='')">Deposit part</button>
            <button class="btn btn-modal-main" @click="buyLot" v-else>Deposit part</button>
          </div>

          <!-- v-else  -->
          <div v-if="(buttonWaiting)" class="modal-desktop-footer" >
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
      <div v-if="(currentPart>0 & currentPart!='')" class="modal-mobile-footer">
        <!-- <button disabled class="btn btn-modal-main">Deposit part</button> -->
        <button class="btn btn-modal-main" @click="buyLot">Deposit part</button>
      </div>

      <!-- v-else 
      <div v-if="(currentPart>0 & currentPart!='')" class="modal-mobile-footer">
        <button  @click="this.buyLot()" class="btn btn-modal-main">Deposit part</button>
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
      currentPart:null,
      currencyToUsdPrice:1,
      allBidsAmount:0,
      buttonDisabled:false,
      buttonWaiting:false
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
  methods:{
    async buyLot(){ 
      this.buttonWaiting = true; 
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
        let trx = await (toRaw(this.provider)).waitForTransaction(buyLot.hash);
        if (trx.status==1){
          await this.$store.dispatch('appGlobal/setLastTransactionHash',buyLot.hash);
          await this.$store.dispatch('appGlobal/setshowStartCollectingModal',false)
          await this.$store.dispatch('appGlobal/setShowTransSuccessModal',true);
          // show succesModal and set transactionHash
          // location.reload();
        }
        else{
          this.buttonWaiting = false; 
          alert('Error!')
        }          
      }
      catch{
        this.buttonWaiting = false; 
        alert('Error!');
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
