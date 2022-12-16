<template>
  <!-- <a class="card card-finished" :class="{'card-inactive' : false}"> -->
  <a class="card" :class="{'card-inactive' : (this.item.marketplace_status=='CLOSED' & (this.item.internal_status=='GATHER'||this.item.internal_status=='OPEN')),'card-finished' : (this.item.marketplace_status=='CLOSED' & this.item.internal_status=='GATHER')}">
    <div class="card-main">
      <!-- <a v-if="item.media" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" class="card-img" :style="{backgroundImage: `url(${item.media})`}" ></a>
      <a v-else :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" class="card-img"  ></a> -->
      <a :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" class="card-img" v-if="item.media">
        <img :src="item.media">
      </a>   
      <div class="card-img" v-else>        
      </div>     
      <div class="card-header">
        <a  class="icon-card-label" target="_blank" :href="linkToMarketplacePage" :style="{backgroundImage: `url(${item.marketplace.logo})`}" v-if="this.item.internal_status!='OWNED'">
        </a>
        <a  class="icon-card-label" :style="{backgroundImage: `url('../../public/favicon.webp')`}" v-else>
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
      <div class="card-footer" 
      v-if="(item.marketplace_status=='OPEN' & item.internal_status=='GATHER')
      ||(item.marketplace_status=='CLOSED' & item.internal_status=='CLOSED')
      ||((item.marketplace_status=='CLOSED') & item.internal_status=='OWNED')
      ||item.internal_status=='SOLD'
      ||item.internal_status=='ON SALE'">
        <div class="card-progress progress" v-if="!(bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0)">
          <div v-if="userProgressValue>0" class="progress-value owner" :style="{ width: userProgressValue + '%' }">
            <span v-if="userProgressValue>=20">{{ userProgressValue }}%</span>
          </div>
          <div class="progress-value" :style="{ width: allProgressValue + '%', 'padding-left' :  userProgressValue + '%' }">
            <span v-if="allProgressValue>=20 && userProgressValue<80">{{ allProgressValue }}%</span>
          </div>
        </div>
        <div class="card-to-buy" v-if="bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0">
          <div class="card-col">
            <span class="card-col-name">{{translatesGet('PART')}}</span>
            <span><strong>{{toFixedIfNecessary(bidOnSale.fraction_amount/item.price*100,1)}}%</strong></span>
          </div>
          <div class="card-col">
            <span class="card-col-name">{{translatesGet('SALE_FOR')}}</span>
            <div class="card-value">
              <div class="icon-value"></div>
              <div class="card-col-value">
                <strong>{{abbrNum(toFixedIfNecessary(convertToEther(bidOnSale.price),6),2)}} ETH</strong>
                <span class="equivalent">≈ $ {{abbrNum(toFixedIfNecessary(convertToEther(bidOnSale.price)*currencyToUsdPrice,6),2)}}</span>
              </div> 
            </div>

          </div>
        </div>
        <div class="card-members btn-more-info" v-if="!(bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0)">
          <button class="card-members-btn "
            @mouseover="showMore = true"
            @mouseout="showMore = false" v-if="item.bids!=null">
            <i class="i-user-fill"></i>  
            {{this.item.bids.length}}
          </button>
          <div v-if="showMore" class="container-more-info">
            <table class="table-more-info">
              <thead>
                <tr>
                  <td>{{translatesGet('OWNER')}}</td>
                  <td class="td td-price">{{translatesGet('PRICE')}}</td>
                  <td >{{translatesGet('PCT')}}</td>
                </tr>
              </thead>
              <tbody>             
                <tr  v-for="element in this.item.bids" :key="element">
                  <td>{{element.address.substring(0,6)+'...'+element.address.substring(38,42)}}</td>
                  <td>
                    <div class="td-wrap-price">
                      <div class="icon-token"></div> 
                      {{abbrNum(toFixedIfNecessary(convertToEther(element.amount),6),2)}}
                    </div>
                    </td>
                  <td>{{userProgressValue}}%</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ######## 1 ######## -->
      <!-- <div class="card-footer">
        <div class="card-to-buy">
          <div class="card-col">
            <span class="card-col-name">Part</span>
            <span><strong>5%</strong></span>

          </div>
          <div class="card-col">
            <span class="card-col-name">Sale for</span>
            <div class="card-value">
              <div class="icon-value"></div>
              <div class="card-col-value">
                <strong>0.01 ETH</strong>
                <span class="equivalent">≈ $ 10</span>
              </div> 
            </div>

          </div>
        </div>
      </div> -->
    </div>
    <div class="card-data">
      <div class="data-table">
        <div class="data-tr data-tr-main"
        v-if="(item.marketplace_status=='OPEN' || item.marketplace_status=='CLOSED') & item.internal_status=='OPEN'"
          >
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div>    
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              >#{{item.token_id}}</div>  
            <a :href="'/collection/'+item.collection.contract_address"><span>{{item.collection.name}}</span></a>
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
        v-if="item.internal_status=='ON SALE'"
          >
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div>    
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              >#{{item.token_id}}</div>  
            <a :href="'/collection/'+item.collection.contract_address"><span>{{item.collection.name}}</span></a>
          </div>
        </div>
        <div class="data-tr data-tr-main"
        v-if="(item.marketplace_status=='CLOSED'||item.marketplace_status=='OPEN') & item.internal_status=='OWNED'"
          >
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div>    
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              >#{{item.token_id}}</div>  
            <a :href="'/collection/'+item.collection.contract_address"><span>{{item.collection.name}}</span></a>
          </div>
          <div class="data-td data-td-value">
          </div>
        </div>
        <div class="data-tr data-tr-main"
        v-if="item.marketplace_status=='CLOSED' & item.internal_status=='CLOSED'"
          >
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div>    
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              >#{{item.token_id}}</div>  
            <a :href="'/collection/'+item.collection.contract_address"><span>{{item.collection.name}}</span></a>
          </div>
          <div class="data-td data-td-value">
            <div class="card-value">
              <div class="icon-value"></div>
              <span><b>{{abbrNum(priceInCurrency,1)}} {{' '}}</b>ETH</span> 
            </div>
            <div class="equivalent">≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}}</div>

          </div>
        </div>
        <div class="data-tr data-tr-main" v-if="item.marketplace_status=='CLOSED' & item.internal_status=='GATHER'">
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div>    
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              >#{{item.token_id}}</div>  
            <a :href="'/collection/'+item.collection.contract_address"><span>{{item.collection.name}}</span></a>
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
          v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'"
          >
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div> 
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              ><span>#{{item.token_id}}</span></div>    
            <div>{{item.collection.name}}</div>
          </div>
          <div class="data-td data-td-value">
            <div class="card-value">
              <div class="icon-value"></div>
              {{abbrNum(toFixedIfNecessary(convertToEther(allBidsAmount),6),1)}}/<span><b>{{abbrNum(priceInCurrency,1)}}{{' '}}</b>ETH</span>              
            </div>
            <div class="equivalent">≈ $ {{abbrNum((convertToEther(allBidsAmount)*currencyToUsdPrice).toFixed(2),1)}}/{{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}}</div>

          </div>
        </div>
        <div class="data-tr data-tr-main"
          v-if="item.internal_status=='SOLD'"
          >
          <div v-if="showFullName && item.token_id.length>8" class="card-id card-id-full">{{item.token_id}}</div> 
          <div class="data-td">
            <div class="card-id"
              @mouseover="showFullName = true"
              @mouseout="showFullName = false"
              ><span>#{{item.token_id}}</span></div>    
            <div>{{item.collection.name}}</div>
          </div>
          <div class="data-td data-td-value">
            <div class="card-value">
              <div class="icon-value"></div>
              <span><b>{{abbrNum(priceInCurrency,1)}}{{' '}}</b>ETH</span>              
            </div>
            <div class="equivalent">≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}}</div>

          </div>
        </div>
        <div class="data-tr data-tr-date" v-if="(remainTimeString!=null & this.item.marketplace_status!='CLOSED' & this.item.internal_status!='SOLD' & this.item.internal_status!='OWNED')" >
          <div>{{translatesGet('ENDS_IN')}} {{remainTimeString}}</div>
        </div>
        <div class="data-tr data-tr-date" v-else-if="this.item.marketplace_status!='CLOSED' & this.item.internal_status!='SOLD' & this.item.internal_status!='OWNED'">
          {{translatesGet('EXPIRED')}}
        </div>
      </div>
      <div class="btn-container">
        <a class="btn" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id"  v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN'">
          {{translatesGet('BUY_TOGETHER')}}
        </a>
        <a class="btn" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id"  v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER' & userBidAmount<=0">
          {{translatesGet('DEPOSIT_PART')}}
        </a>
        <a class="btn" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id"  v-if="item.marketplace_status=='CLOSED' & (item.internal_status=='CLOSED'||item.internal_status=='GATHER') & userBidAmount>0">
          {{translatesGet('CANCEL')}}
        </a>
        <a class="btn" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" v-if="(item.internal_status=='SOLD' & userBidAmount>0)">
          {{translatesGet('CLAIM_REWARD')}}
        </a>
        <a class="btn" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" v-if="bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0">
          {{translatesGet('BUY')}}
        </a>
        <div v-if="(item.marketplace_status=='CLOSED' & item.internal_status=='OWNED' & this.voting==null) & userBidAmount>0 & !userBidOnSale" class="container-btn-part container-btn-part-vote">
          <a class="btn btn-vote" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" >
            {{translatesGet('VOTE')}}
          </a>
          <a class="btn" :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id">
            {{translatesGet('SELL_A_PART')}}
          </a>
        </div>
        <div class="container-btn-part container-btn-part-row" v-if="(userBidAmount>0 & item.marketplace_status=='GATHER')">
            <div class="part-data">               
              {{translatesGet('MY_PART')}}
              <div class="card-value">
                <div class="icon-value"></div>
                <span>{{abbrNum(toFixedIfNecessary(convertToEther(userBidAmount),6),2)}} ETH</span> 
              </div>
            </div>
            <a :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id">
              <div class="btn">
                {{translatesGet('CANCEL')}}                
              </div>
            </a>
        </div>

        <!-- ######## 2 ######## -->
        <div class="container-btn-part" v-if="userBidOnSale & this.item.internal_status!='ON SALE'">
          <div class="card-col">
            <span class="card-col-name">{{translatesGet('PART')}}</span>
            <span><strong>{{toFixedIfNecessary(userBidOnSale.fraction_amount/this.item.price*100,1)}}%</strong></span>
          </div>
          <div class="card-col">
            <span class="card-col-name">{{translatesGet('SALE_FOR')}}</span>
            <div class="card-value">
              <div class="icon-value"></div>
              <div class="card-col-value">
                <strong>{{abbrNum(toFixedIfNecessary(convertToEther(userBidOnSale.fraction_amount),6),1)}} ETH</strong>
                <span class="equivalent">≈ $ {{abbrNum(toFixedIfNecessary(convertToEther(userBidOnSale.fraction_amount)*currencyToUsdPrice,6),1)}}</span>
              </div> 
            </div>
          </div>
        </div>

        <!-- ######## 4 ######## -->
        <div class="container-btn-part" v-if="this.voting & userBidAmount>0">
          <div class="card-col">
            <div class="deposit-label">
              <i class="i-volume-vibrate-line"></i>
              <strong>{{translatesGet('VOTE')}}:</strong>
            </div>
          </div>
          <div class="card-col">
            <strong>{{this.voting.users.length}}/{{this.item.bids.length}}</strong>
          </div>
        </div>

        <!-- ######## 3 ######## -->
         <div class="container-btn-part container-btn-part-row" v-if="this.voting & userBidAmount>0">
          <div class="card-col">            
            <div class="deposit-label">
                  <div class="label-col">
                    <div class="icon-label" :style="{backgroundImage: `url(${this.voting.marketplace.logo})`}"></div>
                    <b>{{abbrNum(toFixedIfNecessary(convertToEther(this.voting.amount),6),1)}} ETH</b>
                    <div>{{translatesGet('PROGRESS')}}: {{toFixedIfNecessary((this.voting.users.length/this.item.bids.length)*100,1)}}%</div>
                  </div>
                </div>
          </div>
          <div class="card-col">
            <a :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" class="btn" v-if="userVoted">{{translatesGet('CONFIRM')}}</a>
          </div>
        </div> 

        <div class="deposit-label" v-if="this.item.internal_status=='ON SALE' & this.voting!=null">
          <i class="i-shopping-bag-line"></i>
          {{translatesGet('ON_SALE')}}: <div class="marketplace"> <span class="icon-market" :style="{backgroundImage: `url(${this.voting.marketplace.logo})`}"></span> {{this.voting.marketplace.name}}</div>
        </div>
        <div class="deposit-value" v-if="this.item.internal_status=='ON SALE' & this.voting!=null">
          <div class="icon-token"></div>
          <span><b>{{abbrNum(toFixedIfNecessary(convertToEther(this.voting.amount),6),2)}} ETH</b></span>
          <span class="equivalent">(≈ $ {{abbrNum(toFixedIfNecessary(convertToEther(this.voting.amount)*currencyToUsdPrice,6),2)}})</span>
        </div>
        <!-- ######## 5 ######## -->
        <!-- <div class="deposit-value">
          <div class="icon-token"></div>
          <span><b>2 ETH</b></span>
          <span class="equivalent">(≈ $ 2K)</span>
        </div> -->

        <!-- ######## 6 ######## -->
        <!-- <div class="deposit-label" >
          <i class="i-shopping-bag-line"></i>
          {{translatesGet('ON_SALE')}}: <div class="marketplace"> <span class="icon-market"></span> LooksRare</div>
        </div> -->

      </div>
    </div>
  </a>
</template>

<script>
import { ethers } from 'ethers';
import config from "@/config.json";
import MultiLang from "@/core/multilang";
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
      likeChecked: false,
      voting:null,
      userVoted:false,
      itemWithBidsOnSale:null,
      bidOnSale:null,
      render:false,
      userBidOnSale:null,
      lang: new MultiLang(this),
    };
  },
  props:[
    'item'
  ],
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
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
      return ethers.utils.formatEther(String(value));
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
        await this.$store.dispatch('appGlobal/setShowConnectWalletModal',true);
        this.testLike = false;
      }
    },
    setMaxVoting(){
      if (this.item.votings & this.item.internal_status!='ON SALE'){
        for (let element of this.item.votings){
          if (this.voting){
            if (element.users.length > this.voting.users.length & element.type=='SELL') {
              this.voting = element;
            }
          }  
          else if (element.type=='SELL'){
            this.voting = element;
          }        
        }

        for (let element of this.item.votings){
          console.log('--------');
          console.log(element.address);
          console.log(localStorage.getItem('userAddress'));
          if (element.users.address == localStorage.getItem('userAddress')){
            this.userVoted = true;
            return;
          }
        }
      }      
      else if (this.itemWithBidsOnSale.votings){
        for (let element of this.itemWithBidsOnSale.votings){
            if (element.status=='FULFILLED') {
              this.voting = element;
              return
            }
        }
      }
    },
    setBidOnSale(){
      if (this.itemWithBidsOnSale.bids){
          this.bidOnSale = this.itemWithBidsOnSale.bids[0];          
          console.log('founded');
          for (let element of this.itemWithBidsOnSale.bids){
            if (element.address == localStorage.getItem('userAddress')){
              this.userBidOnSale = element;
              return
            }
          }
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
    this.itemWithBidsOnSale = await (await fetch(`${config.backendApiEntryPoint}listing-with-on-sale-bids/${this.item.id}`)).json();
    this.setBidOnSale();
    await this.checkLike();
    if (localStorage.getItem('userAddress')!=null&localStorage.getItem('userAddress')!="null"){
      this.setMaxVoting();
    }
    console.log(this.voting);
    console.log(this.userVoted);
    this.render=true;
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
