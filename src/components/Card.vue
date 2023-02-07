<template>
  <!-- <a class="card card-finished" :class="{'card-inactive' : false}"> -->
  <img :src="item.media" alt="forLoadCheck" @load="onImgLoad" style="display: none;">
  <div v-if="render" class="card"  ref="wrpCard" :class="{'card-inactive' : ((this.item.marketplace_status=='CLOSED' & (this.item.internal_status=='GATHER'||this.item.internal_status=='OPEN'))||(this.item.internal_status=='CLAIMED')||bidRewarded),'card-finished' : (this.item.marketplace_status=='CLOSED' & this.item.internal_status=='GATHER'), 'hides': hidesClass}">
    <div class="card-main">
      <div class="loading"></div> <!--  used when loading-->

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
        <a  class="icon-card-label" :style="{backgroundImage: `url('/favicon.png')`}" v-else>
        </a>
        <button class="btn-like" :class="{'liked':testLike}" @click.prevent="changeLike">
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
           @mouseover="showMore = true"
           @mouseout="showMore = false"
      v-if="((item.marketplace_status=='OPEN' & item.internal_status=='GATHER')
      ||(item.marketplace_status=='CLOSED' & item.internal_status=='CLOSED')
      ||((item.marketplace_status=='CLOSED') & item.internal_status=='OWNED')
      ||item.internal_status=='SOLD'
      ||item.internal_status=='ON SALE') & !bidRewarded">
        <div class="card-progress progress" v-if="!(bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0)">
          <div v-if="userProgressValue>0" class="progress-value owner" :style="{ width: userProgressValue + '%' }">
            <span v-if="userProgressValue>=20">{{ userProgressValue }}%</span>
          </div>
          <div class="progress-value" :style="{ width: allProgressValue + '%', 'padding-left' :  userProgressValue + '%' }">
            <span v-if="allProgressValue>=20 && userProgressValue<80">{{ allProgressValue - userProgressValue}}%</span>
          </div>    
        </div>
        <div class="card-to-buy" v-if="bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0">
          <div class="card-col">
            <span class="card-col-name">{{translatesGet('PART')}}</span>
            <span><strong>{{useHelpers.toFixedIfNecessary(bidOnSale.fraction_amount/10**18,1)}}%</strong></span>
          </div>
          <div class="card-col">
            <span class="card-col-name">{{translatesGet('SALE_FOR')}}</span>
            <div class="card-value">
              <div class="icon-value"></div>
              <div class="card-col-value">
                <strong>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(bidOnSale.price),4),2)}} ETH</strong>
                <span class="equivalent">≈ $ {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(bidOnSale.price)*currencyToUsdPrice,2),2,2)}}</span>
              </div> 
            </div>

          </div>
        </div>
        <div class="card-members btn-more-info" v-if="!(bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0)">
          <button class="card-members-btn" v-if="item.bids!=null">
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
                      <div class="icon-token eth"></div> 
                      {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(element.amount),4),2)}}
                    </div>
                    </td>
                  <td>{{useHelpers.toFixedIfNecessary(element.amount/this.item.price*100,0) }}%</td>
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
              <span><b>{{useHelpers.abbrNum(priceInCurrency,1)}} {{' '}}</b>ETH</span>
            </div>
            <div class="equivalent">≈ $ {{useHelpers.abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1,2)}}</div>

          </div>
        </div>
        <div class="data-tr data-tr-main"
        v-if="item.internal_status=='CLAIMED'"
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
              <span><b>{{useHelpers.abbrNum(priceInCurrency,1)}} {{' '}}</b>ETH</span>
            </div>
            <div class="equivalent">≈ $ {{useHelpers.abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1,2)}}</div>

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
              <span><b>{{useHelpers.abbrNum(priceInCurrency,1)}} {{' '}}</b>ETH</span>
            </div>
            <div class="equivalent">≈ $ {{useHelpers.abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1,2)}}</div>

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
              <span><b>{{useHelpers.abbrNum(priceInCurrency,1)}} {{' '}}</b>ETH</span>
            </div>
            <div class="equivalent">≈ $ {{useHelpers.abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1,2)}}</div>

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
              <a :href="'/collection/'+item.collection.contract_address"><span>{{item.collection.name}}</span></a>
          </div>
          <div class="data-td data-td-value">
            <div class="card-value">
              <div class="icon-value"></div>
              {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(allBidsAmount),4),1)}}/<span><b>{{useHelpers.abbrNum(priceInCurrency,1)}}{{' '}}</b>ETH</span>
            </div>
            <div class="equivalent">≈ $ {{useHelpers.abbrNum((useHelpers.convertToEther(allBidsAmount)*currencyToUsdPrice).toFixed(2),1,2)}}/{{useHelpers.abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1,2)}}</div>

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
            <a :href="'/collection/'+item.collection.contract_address"><span>{{item.collection.name}}</span></a>
          </div>
          <div class="data-td data-td-value">
            <div class="card-value">
              <div class="icon-value"></div>
              <span><b>{{useHelpers.abbrNum(priceInCurrency,1)}}{{' '}}</b>ETH</span>
            </div>
            <div class="equivalent">≈ $ {{useHelpers.abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1,2)}}</div>

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
        <button class="btn" v-if="this.$route.name=='Listing'" @click="pushToNewListing">
          {{translatesGet('BUY_TOGETHER')}}
        </button>
        <router-link @click="this.$store.dispatch('marketplaceListing/setModalToShowAtStart','appGlobal/setshowStartCollectingModal');" class="btn" :to="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id"  v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN' & userAddress!=false & this.$route.name!='Listing'">
          {{translatesGet('BUY_TOGETHER')}}
        </router-link>
        <button class="btn" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true)"  v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN' & !userAddress & this.$route.name!='Listing'">
          {{translatesGet('BUY_TOGETHER')}}
        </button>
        <router-link @click="this.$store.dispatch('marketplaceListing/setModalToShowAtStart','appGlobal/setshowContinueCollectingModal');" class="btn" :to="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id"  v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'  & userAddress!=false & this.$route.name!='Listing'">
          {{translatesGet('DEPOSIT_PART')}}
        </router-link>        
        <button class="btn"  @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true)" v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER' & !userAddress">
          {{translatesGet('DEPOSIT_PART')}}
        </button>
        <router-link @click="this.$store.dispatch('marketplaceListing/setModalToShowAtStart','appGlobal/setshowDepositCancelModal');" class="btn" :to="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id"  v-if="item.marketplace_status=='CLOSED' & (item.internal_status=='CLOSED'||item.internal_status=='GATHER') & userBidAmount>0">
          {{translatesGet('CANCEL')}}
        </router-link>
        <router-link @click="this.$store.dispatch('marketplaceListing/setModalToShowAtStart','appGlobal/setShowClaimRewardModal');" class="btn" :to="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" v-if="(item.internal_status=='SOLD' & userBidAmount>0 & !bidRewarded)">
          {{translatesGet('CLAIM_REWARD')}}
        </router-link>
        <router-link @click="this.$store.dispatch('marketplaceListing/setModalToShowAtStart','FractionMarket');" class="btn" :to="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" v-if="bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0  & userAddress!=false">
          {{translatesGet('BUY')}}
        </router-link>
        <button class="btn"  @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true)" v-if="bidOnSale!=null & item.internal_status=='OWNED' & userBidAmount<=0  & !userAddress">
          {{translatesGet('BUY')}}
        </button>
        <!-- <div v-if="((item.marketplace_status=='CLOSED'||item.marketplace_status=='OPEN') & item.internal_status=='OWNED' & this.voting==null) & userBidAmount>0 & !userBidOnSale" class="container-btn-part container-btn-part-vote"> -->
          <div v-if="((item.marketplace_status=='CLOSED'||item.marketplace_status=='OPEN') & item.internal_status=='OWNED') & userBidAmount>0 & !userBidOnSale" class="container-btn-part container-btn-part-vote">
          <router-link @click="this.$store.dispatch('marketplaceListing/setModalToShowAtStart','appGlobal/setShowStartVotingModal');" class="btn btn-vote" :to="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" >
            {{translatesGet('VOTE')}}
          </router-link>
          <router-link @click="this.$store.dispatch('marketplaceListing/setModalToShowAtStart','appGlobal/setShowSellPartModal');" class="btn" :to="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id">
            {{translatesGet('SELL_A_PART')}}
          </router-link>
        </div>
        <div class="container-btn-part container-btn-part-row" v-if="(userBidAmount>0 & item.marketplace_status=='GATHER')">
            <div class="part-data">               
              {{translatesGet('MY_PART')}}
              <div class="card-value">
                <div class="icon-value"></div>
                <span>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(userBidAmount),4),2)}} ETH</span>
              </div>
            </div>
            <router-link @click="this.$store.dispatch('marketplaceListing/setModalToShowAtStart','appGlobal/setshowDepositCancelModal');" :to="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id">
              <div class="btn">
                {{translatesGet('CANCEL')}}                
              </div>
            </router-link>
        </div>

        <!-- ######## 2 ######## -->
        <div class="container-btn-part" v-if="userBidOnSale!=null & item.internal_status=='OWNED'">
          <div class="card-col">
            <span class="card-col-name">{{translatesGet('PART')}}</span>
            <span><strong>{{useHelpers.toFixedIfNecessary(userBidOnSale.fraction_amount/10**18,1)}}%</strong></span>
          </div>
          <div class="card-col">
            <span class="card-col-name">{{translatesGet('SALE_FOR')}}</span>
            <div class="card-value">
              <div class="icon-value"></div>
              <div class="card-col-value">
                <strong>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(userBidOnSale.price),4),1)}} ETH</strong>
                <span class="equivalent">≈ $ {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(userBidOnSale.price)*currencyToUsdPrice,2),1,2)}}</span>
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
                <b>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.voting.amount),4),1)}} ETH</b>
                <div>{{translatesGet('PROGRESS')}}: {{useHelpers.toFixedIfNecessary((this.voting.users.length/this.item.bids.length)*100,1)}}%</div>
              </div>
            </div>
          </div>
          <div class="card-col">
            <a :href="'/listing/'+item.collection.contract_address+'/'+item.token_id+'&'+item.id" class="btn" v-if="userVoted">{{translatesGet('CONFIRM')}}</a>
          </div>
        </div> 

        <div class="deposit-label" v-if="this.item.internal_status=='ON SALE' & this.voting!=null">
          <div class="shopping">
            <i class="i-shopping-bag-line"></i>
            {{translatesGet('ON_SALE')}}: 
          </div>
          <div class="marketplace" v-for="voting in votingsOnSale"> 
            <span class="icon-market" :style="{backgroundImage: `url(${voting.marketplace.logo})`}"></span> 
            <!-- {{voting.marketplace.name}} -->
          </div>
        </div>

        <div class="deposit-value" v-if="this.item.internal_status=='ON SALE' & this.voting!=null">
          <div class="icon-token eth"></div>
          <span><b>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.voting.amount),4),2)}} ETH</b></span>
          <span class="equivalent">(≈ $ {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.voting.amount)*currencyToUsdPrice,2),2,2)}})</span>
        </div>
        <!-- ######## 5 ######## -->
        <!-- <div class="deposit-value">
          <div class="icon-token eth"></div>
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
  </div>
  <SkeletonCard v-else/>
</template>

<script>
import config from "@/config.json";
import MultiLang from "@/core/multilang";
import {mapGetters} from "vuex";
import helpers from "@/helpers/helpers";
import SkeletonCard from "./Skeleton/SkeletonCard.vue";
export default {
  props:[
    'item'
  ],
  data() {
    return {
      useHelpers: helpers,
      testLike: false,
      allProgressValue: 0,
      userProgressValue:0,
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
      showUserBidOnSale:false,
      userAddress:false,
      bidRewarded:false,
      votingsOnSale:[],
      isLoaded:false,
      hidesClass:false
    };
  },
  computed: {
    ...mapGetters(['getUsdRate']),
    currencyToUsdPrice() {
      return this.getUsdRate ? this.getUsdRate[`${this.item.currency.ticker}`] : 0
      }
  },
  components:{
    SkeletonCard
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
    setPriceInCurrency(){
      this.priceInCurrency = this.useHelpers.toFixedIfNecessary((this.item.price / (10**this.item.currency.decimals)),4);
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
            this.userBid = element;
            if (element.amount == this.item.price){
              this.userBidBuyedAll = true;
            }
            return;
          }
        }
        return
      }
      this.userBidAmount=0;      
    },
    setLinkToMarketplacePage(){
      let exampleStr = this.item.marketplace.listing_link;
      let token_id = this.item.token_id;
      let collection_address = this.item.collection.contract_address;      
      exampleStr = exampleStr.replace('${collection_address}',collection_address);
      exampleStr = exampleStr.replace('${token_id}',token_id);
      this.linkToMarketplacePage = exampleStr;
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
          if (element.users.address == localStorage.getItem('userAddress')){
            this.userVoted = true;
            return;
          }
        }
      }      
      else if (this.itemWithBidsOnSale.votings){
        let tempVotingsOnSale = [];
        for (let element of this.itemWithBidsOnSale.votings){
            if (element.status=='ON SALE') {
              tempVotingsOnSale.push(element);
              this.voting = element;
            }
        }
        this.votingsOnSale = tempVotingsOnSale;
      }
    },
    setBidOnSale(){
      if (this.itemWithBidsOnSale.bids){
          this.bidOnSale = this.itemWithBidsOnSale.bids[0];          
          for (let element of this.itemWithBidsOnSale.bids){
            if (element.address == localStorage.getItem('userAddress')){
              this.userBidOnSale = element;
              return
            }
          }
      } 

    },
    async onImgLoad(){
      const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while(true){
      await delay(1000);
      if(this.render){
        break;
      }
    }
      this.isLoaded=true;
    },
    async pushToNewListing(){
      await this.$store.dispatch('marketplaceListing/getAndSetItem',this.item.id);
      this.$store.dispatch('marketplaceListing/setModalToShowAtStart','appGlobal/setshowStartCollectingModal');
      this.$router.push(`/listing/${this.item.collection.contract_address}/${this.item.token_id}&${this.item.id}`);
      this.$emit('updateListingPage');
    }
  },
  async mounted(){
    if (this.$route.name == 'Marketplace'){
        this.hidesClass = !this.hidesClass
			}

    if(this.$route.path === '/marketplace/shares'){
      this.hidesClass = false
    }
    let userAddress = localStorage.getItem('userAddress');
    if (userAddress!=null & userAddress!='null'){
      this.userAddress = userAddress;
    }
    this.setPriceInCurrency();
    this.setLinkToMarketplacePage();
    this.setAllBidsAmount();
    this.setUserBidAmount();
    this.allProgressValue = this.useHelpers.toFixedIfNecessary((this.allBidsAmount/this.item.price)*100,0);
    this.userProgressValue = this.useHelpers.toFixedIfNecessary((this.userBidAmount/this.item.price)*100,0);
    this.updateTimeString();
    this.itemWithBidsOnSale = await (await fetch(`${config.backendApiEntryPoint}listing-with-on-sale-bids/${this.item.id}`)).json();
    this.setBidOnSale();
    // await this.checkLike();
    if (localStorage.getItem('userAddress')!=null&localStorage.getItem('userAddress')!="null"){
      this.setMaxVoting();
    }
    // this.showUserBidOnSale = userBidOnSale & this.item.internal_status!='ON SALE';
    if (this.userBidOnSale){
      if (this.item.internal_status!='ON SALE'){
        this.showUserBidOnSale=true;
      }
    }
    if (this.userBid){
      if (this.userBid.status=='REWARDED'){
        this.bidRewarded=true;
      }
    }
    await this.checkLike();
    this.render=true;
    
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while(true){
      await delay(1000);
      this.updateTimeString();
      this.setAllBidsAmount();
      this.setUserBidAmount();
      this.allProgressValue = this.useHelpers.toFixedIfNecessary((this.allBidsAmount / this.item.price) * 100, 0);
      this.userProgressValue = this.useHelpers.toFixedIfNecessary((this.userBidAmount / this.item.price) * 100, 0);
      await this.checkLike();
    }
  }
};
</script>
