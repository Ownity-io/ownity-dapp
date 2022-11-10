<template>
  <div class="card">
    <div class="card-main">
      <div class="card-img" :style="{backgroundImage: `url(${item.media})`}" ></div>
      <div class="card-header">
        <div class="icon-card-label" :style="{backgroundImage: `url(${item.marketplace.logo})`}"></div>
        <button class="btn-like" @click="testLike = !testLike">
          <i :class="{ 'i-heart-3-fill': testLike, 'i-heart-3-line': !testLike }"></i>
        </button>
      </div>
      <div class="card-footer">
        <div class="card-progress progress" v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'">
          <div v-if="userProgressValue>0" class="progress-value owner" :style="{ width: userProgressValue + '%' }">
            <span v-if="userProgressValue>=20">{{ userProgressValue }}%</span>
          </div>
          <div class="progress-value" :style="{ width: allProgressValue + '%', 'padding-left' :  userProgressValue + '%' }">
            <span v-if="allProgressValue>=20 && userProgressValue<80">{{ allProgressValue }}%</span>
          </div>
        </div>
        <div class="card-members btn-more-info" v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'">
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
        <div class="data-tr data-tr-main">
          <div class="card-id"
            @mouseover="showFullName = true"
            @mouseout="showFullName = false"
            >#{{item.token_id}}</div>
          <div v-if="showFullName" class="card-id card-id-full">{{item.name}}</div>
          <div class="card-value" v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN'">
            <div class="icon-value"></div>
            <span><b>{{abbrNum(priceInCurrency,1)}} {{' '}}</b>ETH</span> 
          </div>
          <div class="card-value" v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'">
            <div class="icon-value"></div>
            {{abbrNum(convertToEther(allBidsAmount),1)}}/<span><b>{{abbrNum(priceInCurrency,1)}}{{' '}}</b>ETH</span> 
          </div>
        </div>
        <div class="data-tr" v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN'">
          <div>{{item.collection.name}}</div>
          <div>≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}}</div>
        </div>
        <div class="data-tr" v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'">
          <div>{{item.collection.name}}</div>
          <div>≈ $ {{abbrNum((convertToEther(allBidsAmount)*currencyToUsdPrice).toFixed(2),1)}}/{{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}}</div>
        </div>
        <div class="data-tr data-tr-date">
          <div>Ends in {{remainTimeString}}</div>
        </div>
      </div>
      <div class="btn-container">

        <button class="btn" 
        v-if="item.marketplace_status=='OPEN' & 
        item.internal_status=='OPEN'">Start collecting
        </button>

        <button class="btn" 
        v-if="item.marketplace_status=='OPEN' & 
        item.internal_status=='GATHER'">Deposit part
        </button>

        <div class="container-btn-part">
            <div class="part-data">
              Моя частка 
              <div class="card-value">
                <div class="icon-value"></div>
                <span>0.05 ETH</span> 
              </div>
            </div>
            <button class="btn">Відмінити</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from 'ethers';
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
      remainTimeString:null,
    };
  },
  props:[
    'item'
  ],
  methods:{
    getPriceInCurrency(){
      this.priceInCurrency = this.item.price / (10**this.item.currency.decimals);
    },
    async getPriceInUsd(){
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
    decPlaces = Math.pow(10,decPlaces);
    var abbrev = [ "k", "m", "b", "t" ];
    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
             number = Math.round(number*decPlaces/size)/decPlaces;
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }
             number += abbrev[i];
             break;
        }
    }

    return number;
}
  },
  
  async mounted(){
    this.getPriceInCurrency();
    await this.getPriceInUsd();
    this.setAllBidsAmount();
    this.setUserBidAmount();
    this.allProgressValue = (this.allBidsAmount/this.item.price)*100;
    this.userProgressValue = (this.userBidAmount/this.item.price)*100;
    setInterval(()=>{
      this.setAllBidsAmount();
      this.setUserBidAmount();
      this.allProgressValue = (this.allBidsAmount/this.item.price)*100;
      this.userProgressValue = (this.userBidAmount/this.item.price)*100;
      // console.log(Date.parse(this.item.end_date));
      // console.log(Date.now());
      this.remainTimeString = new Date( (this.item.end_date - Date.now())).toISOString().substring(11, 19);
    },1000);
  }
};
</script>
