<template>
  <!-- <a class="card card-finished" :class="{'card-inactive' : false}"> -->
  <a class="card" :class="{'card-inactive' : false}">
    <div class="card-main">
      <a :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" class="card-img" :style="{backgroundImage: `url(${item.media})`}" ></a>
      <div class="card-header">
        <a  class="icon-card-label " :href="linkToMarketplacePage" :style="{backgroundImage: `url(${item.marketplace.logo})`}">
        </a>
        <button class="btn-like" :class="{'liked':testLike}" @click="changeLike">
          <i class="i-heart-3-fill"></i>
          <i class="i-heart-3-line"></i>
        </button>
      </div>
      <!-- <div class="card-footer">
        <div class="card-progress progress" >
          <div v-if="userProgressValue>0" class="progress-value owner" :style="{ width: userProgressValue + '%' }">
            <span v-if="userProgressValue>=20">{{ userProgressValue }}%</span>
          </div>
          <div class="progress-value" :style="{ width: allProgressValue + '%', 'padding-left' :  userProgressValue + '%' }">
            <span v-if="allProgressValue>=20 && userProgressValue<80">{{ allProgressValue }}%</span>
          </div>
        </div>
        <div class="card-members" >
          <button class="card-members-btn ">
            8/10
          </button>
        </div>
      </div> -->
      <div class="card-footer" v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'">
        <div class="card-progress progress" >
          <div v-if="userProgressValue>0" class="progress-value owner" :style="{ width: userProgressValue + '%' }">
            <span v-if="userProgressValue>=20">{{ userProgressValue }}%</span>
          </div>
          <div class="progress-value" :style="{ width: allProgressValue + '%', 'padding-left' :  userProgressValue + '%' }">
            <span v-if="allProgressValue>=20 && userProgressValue<80">{{ allProgressValue }}%</span>
          </div>
        </div>
        <div class="card-members btn-more-info">
          <button class="card-members-btn "
            @mouseover="showMore = true"
            @mouseout="showMore = false">
            <i class="i-user-fill"></i>  
            {{this.item.bids.length}}
          </button>
          <div v-if="showMore" class="container-more-info">
            <table class="table-more-info">
              <thead>
                <tr>
                  <td >Owner</td>
                  <td class="td td-price">Price</td>
                  <td >Pct</td>
                </tr>
              </thead>
              <tbody>             
                <tr  v-for="element in this.item.bids" :key="element">
                  <td>{{element.address.substring(0,6)+'...'+element.address.substring(38,42)}}</td>
                  <td>
                    <div class="td-wrap-price">
                      <div class="icon-token"></div> 
                      {{convertToEther(element.amount)}}
                    </div>
                    </td>
                  <td>{{userProgressValue}}%</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="card-data">
      <div class="data-table">
        <div class="data-tr data-tr-main"
          v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN' & (this.$route.name=='Marketplace' || this.$route.name=='Listing' || this.$route.name=='Collection')"
          >
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div>    
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              >#{{item.token_id}}</div>  
            <a :href="'/collection/'+item.collection.contract_address">{{item.collection.name}}</a>
          </div>
          <div class="data-td data-td-value">
            <div class="card-value">
              <div class="icon-value"></div>
              <span><b>{{abbrNum(priceInCurrency,1)}} {{' '}}</b>ETH</span> 
            </div>
            <div class="equivalent">≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}}</div>

          </div>
        </div>
        <div class="data-tr data-tr-main"
          v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER' & (this.$route.name=='Marketplace' || this.$route.name=='Listing' || this.$route.name=='Collection')"
          >
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div> 
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              >#{{item.token_id}}</div>    
            <div>{{item.collection.name}}</div>
          </div>
          <div class="data-td data-td-value"  v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER' & (this.$route.name=='Marketplace' || this.$route.name=='Listing')">
            <div class="card-value">
              <div class="icon-value"></div>
              {{abbrNum(convertToEther(allBidsAmount),1)}}/<span><b>{{abbrNum(priceInCurrency,1)}}{{' '}}</b>ETH</span>              
            </div>
            <div class="equivalent">≈ $ {{abbrNum((convertToEther(allBidsAmount)*currencyToUsdPrice).toFixed(2),1)}}/{{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}}</div>

          </div>
        </div>
        <div class="data-tr data-tr-date" v-if="remainTimeString!=null">
          <div>Ends in {{remainTimeString}}</div>
        </div>
        <div class="data-tr data-tr-date" v-else>
          <div>Expired</div>
        </div>
      </div>
      <div class="btn-container">
        <a class="btn" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id">
          <div 
          v-if="item.marketplace_status=='OPEN' & 
          item.internal_status=='OPEN' 
          & (this.$route.name=='Marketplace' || this.$route.name=='Listing' || this.$route.name=='Collection')">
            Start collecting
          </div>
          <div
          v-if="item.marketplace_status=='OPEN' & 
          item.internal_status=='GATHER' 
          & (this.$route.name=='Marketplace' || this.$route.name=='Listing' || this.$route.name=='Collection')
          & userBidAmount<=0">Deposit part
          </div>
        </a>
        <!-- <button class="btn" 
        >Vote
        </button> -->

        <!-- <div class="btn btn-card-completed">Completed</div> -->

        <div class="container-btn-part" v-if="userBidAmount>0">
            <div class="part-data">
              Моя частка 
              <div class="card-value">
                <div class="icon-value"></div>
                <span>{{convertToEther(userBidAmount)}} ETH</span> 
              </div>
            </div>
            <a :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id">
              <div class="btn">Cancel</div>
            </a>
        </div>

      </div>
    </div>
  </a>
</template>

<script>
import { ethers } from 'ethers';
import config from "@/config.json";
export default {
  data() {
    return {
      testLike: false,
      allProgressValue: 0,
      userProgressValue:0,
      currencyToUsdPrice: 1,
      priceInCurrency: 1,
      showMore: false,
      showFullName:false,
      allBidsAmount:0,
      userBidAmount:0,
      linkToMarketplacePage:null,
      remainTimeString:null,
      likeChecked: false
    };
  },
  props:[
    'item'
  ],
  methods:{
    setPriceInCurrency(){
      this.priceInCurrency = this.toFixedIfNecessary((this.item.price / (10**this.item.currency.decimals)),6);
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
    convertToEther(value){
      return ethers.utils.formatEther(value);
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
    setLinkToMarketplacePage(){
      let exampleStr = this.item.marketplace.listing_link;
      let collection_address = this.item.collection.contract_address;
      let token_id = this.item.token_id;

      this.linkToMarketplacePage = eval('`'+exampleStr+'`');
    },
    toFixedIfNecessary(value, dp) {
      return +parseFloat(value).toFixed(dp);
    },
    updateTimeString(){
      let timeNow = Date.now() / 1000;
      let remTimeInSeconds = this.item.end_date - timeNow;
      var sec_num = parseInt(remTimeInSeconds, 10);
      var days = Math.floor(sec_num / 86400);
      var hours = Math.floor((sec_num - (days * 86400)) / 3600);
      var minutes = Math.floor((sec_num - ((days * 86400) + (hours * 3600))) / 60);
      var seconds = sec_num - (days * 86400) - (hours * 3600) - (minutes * 60);
      if (days < 10) { days = "0" + days; }
      if (hours < 10) { hours = "0" + hours; }
      if (minutes < 10) { minutes = "0" + minutes; }
      if (seconds < 10) { seconds = "0" + seconds; }
      if (days > 0) {
        this.remainTimeString =  days + 'd:' + hours + 'h:' + minutes + 'm';
      } else {
        this.remainTimeString = hours + 'h:' + minutes + 'm:' + seconds + 's';
      }
    },
    async checkLike(context){
      if (localStorage.getItem("token") != null & localStorage.getItem("token") != 'null'){
        if (!this.likeChecked){
        console.log('check...');
        let requestLink = `${config.backendApiEntryPoint}is-favorite/?lot=${this.item.id}`;
        let requestOptions = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        let request = await fetch(requestLink, requestOptions);
        if (request.ok){
        let requestJson = await request.json();
        this.testLike = requestJson.data.favorite;}
        this.likeChecked = true;}
      }
      else{
        this.testLike = false;
        this.likeChecked = false;
      }
    },
    async changeLike(context){
      if (localStorage.getItem("token") != null) {
        let requestLink = `${config.backendApiEntryPoint}favorite/`;
        let requestOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            'lot': this.item.id,
            'favorite': !this.testLike,
          }), 
        };
        let request = await fetch(requestLink, requestOptions);
        let requestJson = await request.json();
        this.testLike = !this.testLike;
          
      }else{
        context.commit('appGlobal/setShowConnectWalletModal',true,{root:true});
        this.testLike = false;
      }
    }
  },  
  async mounted(){
    this.setPriceInCurrency();
    this.setLinkToMarketplacePage();
    await this.setCurrencyToUsd();
    this.setAllBidsAmount();
    this.setUserBidAmount();
    this.allProgressValue = (this.allBidsAmount/this.item.price)*100;
    this.userProgressValue = (this.userBidAmount/this.item.price)*100;
    this.updateTimeString();
    await this.checkLike();
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while(true){
      await delay(1000);
      this.updateTimeString();
      this.setAllBidsAmount();
      this.setUserBidAmount();
      this.allProgressValue = (this.allBidsAmount / this.item.price) * 100;
      this.userProgressValue = (this.userBidAmount / this.item.price) * 100;
      await this.checkLike();
    }
  }
};
</script>
