<template>
  <main v-if="render">
    <div class="container">
      <section class="section-breadcrumbs">
        <Breadcrumbs />
      </section>
    </div>
    <div class="container container-listing">
      <div class="card-listing">
        <section class="section-card-img">
          <div class="card-img-wrap">
            <img v-if="!item.media" src="@/assets/images/img-not-found.svg" alt="img" />
            <img v-else :src="item.media" alt="img" />
          </div>
        </section>
        <div class="listing-main">
          <section class="section-listing-header">
            <div class="listing-header">
              <div class="collection-wrap">
                <a class="collection-img" :href="'/collection/'+item.collection.contract_address" :style="{backgroundImage:`url(${item.collection.logo})`}"></a>
                <div class="collection-data">
                  <a target="_blank" rel="nofollow" class="collection-id collection-label" :href="'/collection/'+item.collection.contract_address">
                    <span>{{item.collection.name}}</span>
                    <i class="i-checkbox-circle-fill"></i>
                  </a>
                </div>
              </div>
              <div class="listing-additional-options">
                <div class="btn-wrap">
                  <!-- <button class="btn btn-block">
                    <i class="i-heart-3-line"></i>
                  </button> -->
                  <button class="btn btn-block btn-like" 
                    :class="{'liked':testLike}" 
                    @click="changeLike">
                    <i class="i-heart-3-fill"></i>
                    <i class="i-heart-3-line"></i>
                  </button>
                </div>
                <div class="btn-wrap">
                  <button class="btn btn-block">
                    <i class="i-refresh-line"></i>
                  </button>
                </div>
                <div class="btn-wrap btn-share">
                  <button class="btn btn-block">
                    <i class="i-share-line"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="listing-name">{{item.name}}
              
              <div class="drop-down-mobile">                                
                  <div class="drop-down-container" 
                      :class="{'unfolded' : mobileDropDown }">
                      <button class="btn-drop-down" @click="mobileDropDown = !mobileDropDown">
                          <i class="i-more-2-line"></i>
                      </button>
                      <div class="drop-down">
                          <ul>
                              <li>
                                  <i class="i-pencil-line"></i>
                                  <span>Edit</span>
                              </li>
                              <li>
                                  <i class="i-share-line"></i>
                                  <span>Share</span>
                              </li>
                              <li>
                                  <i class="i-logout-box-line"></i>
                                  <span>Log Out</span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
            </div>
            <div class="owned-row">
              Owned by <a :href="config.etherscanAddressUrlStart+item.owner" target="_blank">{{String(item.owner).substring(0,6)+'...'+String(item.owner).substring(38,42)}}</a> <!-- TODO: href to etherscan-->
            </div>
          </section>

          <!-- MOBILE IMG -->
          
          <section class="section-card-img section-card-img-mobile">
            <div class="card-img-wrap">
              <div class="card-header">
                <!-- <a  class="icon-card-label " :href="linkToMarketplacePage" :style="{backgroundImage: `url(${item.marketplace.logo})`}">
                </a> -->
                <button class="btn-like" :class="{'liked':testLike}" @click="changeLike">
                  <i class="i-heart-3-fill"></i>
                  <i class="i-heart-3-line"></i>
                </button>
              </div>
              <img v-if="!item.media" src="@/assets/images/img-not-found.svg" alt="img" />
              <img v-else :src="item.media" alt="img" />
            </div>
          </section>

          <section class="section-listing-main">
            <!-- <div class="section-deposit" v-if="(item.marketplace_status=='OPEN' || item.marketplace_status=='TEST') & item.internal_status=='OPEN'"> -->
            <div class="section-deposit">
              <div class="section-deposit-data">
                <div class="deposit-img-container">
                  <a  :href='linkToMarketplacePage' class="deposit-img" :style="{backgroundImage: `url(${item.marketplace.logo})`}"></a>
                </div>
                <div class="deposit-data">
                  <div class="deposit-listened deposit-listened-link"><a target="_blank" :href='linkToMarketplacePage' >Listened on {{item.marketplace.name}} for </a><i class="i-external-link-line"></i></div>
                  <div class="deposit-value" v-if="(item.marketplace_status=='OPEN' || item.marketplace_status=='TEST') & item.internal_status=='OPEN'">
                    <div class="icon-token"></div>
                    <span><b>{{priceInCurrency}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}})</span>
                  </div>
                  <div class="deposit-value" v-if="(item.marketplace_status=='OPEN' || item.marketplace_status=='TEST') & item.internal_status=='SOLD'">
                    <div class="icon-token"></div>
                    <span><b>{{priceInCurrency}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}})</span>
                  </div>
                  <div class="deposit-value" v-if="(item.marketplace_status=='OPEN' || item.marketplace_status=='TEST') & item.internal_status=='GATHER'">
                    <div class="icon-token"></div>
                    <span>{{abbrNum(convertToEther(allBidsAmount),1)}} / <b>{{abbrNum(priceInCurrency,1)}}{{' '}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum((convertToEther(allBidsAmount)*currencyToUsdPrice).toFixed(2),1)}}/{{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}})</span>
                  </div>
                  <div class="deposit-part" v-if="userBid!=null & (item.marketplace_status=='OPEN' || item.marketplace_status=='TEST') & item.internal_status=='OWNED'">
                    Your part : <span>{{userBid.fraction}}</span>
                  </div>
                </div>
              </div>
              <div class="section-deposit-btns">
                <!-- <button class="btn btn-deposit" v-if="(item.marketplace_status=='OPEN' || item.marketplace_status=='TEST') & item.internal_status=='OWNED'">Start voting</button> -->
                <!-- <button class="btn btn-deposit" v-if="((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST')||item.marketplace_status=='TEST') & item.internal_status=='OWNED' & this.userBidAmount>0"
                @click="this.$store.dispatch('appGlobal/setShowStartVotingModal',true)">Start voting</button>
                <button class="btn btn-deposit" v-if="((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST')||item.marketplace_status=='TEST') & item.internal_status=='OWNED' & this.userBidAmount<=0">
                  Buy</button>
                <button class="btn btn-get" v-if="((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST')) & item.internal_status=='OWNED' & this.userBidAmount>0">Sell part</button>
                <button class="btn btn-deposit" v-if="((((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST')||item.marketplace_status=='TEST')  & item.internal_status=='OPEN'))|| item.id == 40997"
                @click="this.$store.dispatch('appGlobal/setshowStartCollectingModal',true)">Start collecting</button>
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST')||item.marketplace_status=='TEST')  &
                item.internal_status=='GATHER' & (
                !(userBidAmount>0) || 
                (((userBidAmount/this.item.price)*100)<20)))|| item.id == 40997" 
                 @click="this.$store.dispatch('appGlobal/setshowContinueCollectingModal',true)">Deposit part</button>
                <button class="btn btn-get" v-if="userBidAmount>0">Get part back</button> -->

                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='OPEN' & userAddress!=null)"
                @click="this.$store.dispatch('appGlobal/setshowStartCollectingModal',true)">Start collecting</button>
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='OPEN' & userAddress==null)"
                @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true)">Start collecting</button>
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='GATHER' & userAddress!=null)"
                @click="this.$store.dispatch('appGlobal/setshowContinueCollectingModal',true)">Deposit part</button>
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='GATHER' & userAddress==null)"
                @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true)">Deposit part</button>
                <button class="btn btn-get" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='GATHER' & userAddress!=null & userBidAmount>0)"
                @click="this.$store.dispatch('appGlobal/setshowDepositCancelModal',true)">Cancel</button>
                <button class="btn btn-deposit" v-if="((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST')||item.marketplace_status=='TEST') & item.internal_status=='OWNED' & userAddress!=null & this.userBidAmount>0"
                @click="this.$store.dispatch('appGlobal/setShowStartVotingModal',true)">Start voting</button>
                <button class="btn btn-get" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='OWNED' & userAddress!=null & userBidAmount>0)"
                @click="this.$store.dispatch('appGlobal/setShowSellPartModal',true)">Sell a part</button> 
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='OWNED' & userAddress!=null & userBidBuyedAll)"
                @click="this.$store.dispatch('appGlobal/setShowClaimNftModal',true)">Claim NFT</button> 
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='OWNED' & userAddress!=null & userBidAmount==0 & bidsOnSale)"
                >Buy</button> 
                <button class="btn btn-get" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='ON SALE' & userAddress!=null & userBidAmount>0)"
                >Cancel sale</button> 
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN' || item.marketplace_status=='TEST'))  & item.internal_status=='SOLD' & userAddress!=null & userBidAmount>0)"
                @click="this.$store.dispatch('appGlobal/setShowClaimRewardModal',true)">Claim reward</button> 
              </div>
              <div class="section-deposit-labels" v-if="userBid!=null">
                <div class="deposit-label" v-if="userBid.status == 'ON SALE'">
                  <i class="i-shopping-bag-line"></i>
                  On Sale: <span><b>{{abbrNum(toFixedIfNecessary(convertToEther(userBidAmount),6,2))}} ETH</b> ({{userBid.fraction}})</span>
                </div>
                <div class="deposit-label" v-if="false">
                  <i class="i-volume-vibrate-line"></i>
                  Vote:
                  <div class="label-col">
                    <div class="icon-label" :style="{backgroundImage: `url(${item.marketplace.logo})`}"></div>
                    <div><b>2 ETH</b></div>
                    <div>Progress: 20%</div>
                  </div>
                  <div class="label-col">
                    <div class="icon-label" :style="{backgroundImage: `url(${item.marketplace.logo})`}"></div>
                    <div><b>2.1 ETH</b></div>
                    <div>Progress: 20%</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="section-members"
              :class="{ 'section-unfolded': !collapseMembers }"
              v-if="this.item.bids">
              <button class="btn-collapse" @click="collapseMembers = !collapseMembers">
                <div class="members-row">
                  <i class="i-account-circle-line"></i>
                  Members: <span>{{this.item.bids.length}}</span>
                </div>
                <i class="i-arrow-down-s-line"></i>
              </button>
              <!-- <button class="btn-collapse" @click="collapseMembers = !collapseMembers">
                <div class="actions-row">
                  Actions with their a part
                </div>
                <i class="i-arrow-down-s-line"></i>
              </button> -->
              <div class="section-unfolded-content">
                <ul class="tabs">
                  <li>
                    <button 
                      :class="{ 'active-tab': activeTab2 === 'ListingInfo2' }"
                      @click="letsCheck2('ListingInfo2')"
                      >
                      <span>Info</span>
                      <span>Info</span>
                    </button>
                  </li>
                  <li v-if="(itemWithBidsOnSale)">
                    <button
                      :class="{ 'active-tab': activeTab2 === 'ListingFractionMarket' }"
                      @click="letsCheck2('ListingFractionMarket')"
                      >
                      <span>Fraction market</span>
                      <span>Fraction market</span>
                    </button>
                  </li>
                  <li v-if="(item.marketplace_status=='OPEN' || item.marketplace_status=='TEST') & (item.internal_status=='OWNED'||item.internal_status=='ON SALE') & item.votings!=null">
                  <!-- <li v-if="true"> -->
                    <button
                      :class="{ 'active-tab': activeTab2 === 'ListingVote' }"
                      @click="letsCheck2('ListingVote')"
                      >
                      <span>Vote</span>
                      <span>Vote</span>
                    </button>
                  </li>
                </ul>
              <div class="section-members-info">
                <!-- flow 1 -->
                <div v-if="activeTab2 === 'ListingInfo2'" class="section-table-chart">
                  <div class="chart-wrap">
                    <Chart :chartData='chartData'/>
                  </div>
                  <div class="table-chart-data">
                    <div class="table table-chart">
                      <div class="thead">
                        <div class="td">Owner</div>
                        <div class="td">Pct</div>
                        <div class="td td-price">Price</div>
                      </div>

                      <div class="tr" v-for="bid in this.item.bids" :key="bid">
                        <div class="td td-owner">
                          <a
                            class="td-wrap"
                            :href="`${config.etherscanAddressUrlStart+bid.address}`"
                            target="_blank"
                            rel="nofollow"
                          >
                            <span>{{bid.address.substring(0,6)+'...'+bid.address.substring(38,42)}}</span>
                          </a>
                          <span class="label-owner" v-if="bid.address==userAddress">You</span>
                        </div>
                        <div class="td">
                          <div class="td-wrap">{{bid.fraction}}</div>
                        </div>
                        <div class="td td-price">
                          <div class="td-wrap">
                            <div class="td-wrap-price">
                              <div class="icon-token"></div>
                              <span>{{this.toFixedIfNecessary((bid.amount / (10**this.item.currency.decimals)),6)}} ETH</span>
                              <span class="td-light">≈ $ {{this.toFixedIfNecessary(abbrNum((bid.amount / (10**this.item.currency.decimals) * currencyToUsdPrice),1),2)}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- flow2 -->
                <ListingFractionMarket v-if="activeTab2 === 'ListingFractionMarket'" :item="itemWithBidsOnSale"/>
                <!-- flow3 -->
                <div v-if="activeTab2 === 'ListingVote'" 
                  class="section-votes-wrap">

                  <div class="active-votes">
                    <div class="votes-wrap-title">
                      Active
                    </div>
                    <ListingVote v-for="voting in this.item.votings" :item="this.item" :voting="voting"/>
                  </div>

                  <div class="inactive-votes">
                    <div class="votes-wrap-title">
                      Inactive
                    </div>
                    <ListingVote v-for="voting in this.item.votings" :item="this.item" :voting="voting"/>
                  </div>

                </div>
              </div>
              </div>
            </div>
          </section>

          <section class="section-listing-tabs">
            <ul class="tabs">
              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingInfo' }"
                  @click="letsCheck('ListingInfo')"
                >
                <span>Info</span>
                <span>Info</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingProperties' }"
                  @click="letsCheck('ListingProperties')"
                >
                <span>Properties</span>
                <span>Properties</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingAbout' }"
                  @click="letsCheck('ListingAbout')"
                >
                <span>About Collection</span>
                <span>About Collection</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingActivities' }"
                  @click="letsCheck('ListingActivities')"
                >
                <span>Activities</span>
                <span>Activities</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingChat' }"
                  @click="letsCheck('ListingChat')"
                >
                <span>Chat</span>
                <span>Chat</span>
                </button>
              </li>
            </ul>

            <div class="listing-selected-tab">
              <ListingInfo v-if="activeTab === 'ListingInfo'" :item="item"/>
              <ListingProperties v-if="activeTab === 'ListingProperties'" :item="item" />
              <ListingAbout v-if="activeTab === 'ListingAbout'" :item="item" />
              <ListingActivities v-if="activeTab === 'ListingActivities'" />
              <ListingChat v-if="activeTab === 'ListingChat'" />
            </div>
          </section>
        </div>
      </div>
    </div>
    <section class="section-recommendation" v-if="recommendations">
      <div class="container">
        <RecommendationsList :items="recommendations"/>
      </div>
    </section>
  </main>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import RecommendationsList from "@/components/RecommendationsList.vue";
import ListingInfo from "@/components/listing/ListingInfo.vue";
import ListingProperties from "@/components/listing/ListingProperties.vue";
import ListingAbout from "@/components/listing/ListingAbout.vue";
import ListingActivities from "@/components/listing/ListingActivities.vue";
import ListingFractionMarket from "@/components/listing/ListingFractionMarket.vue";
import ListingVote from "@/components/listing/ListingVote.vue";
import ListingChat from "@/components/listing/ListingChat.vue";

import Chart from "@/components/listing/chart/Chart.vue";

import { ethers } from "ethers";
import config from '@/config.json';


export default {
  data() {
    return {
      activeTab: "",
      activeTab2: "",
      srcTest: "",
      testLike: false,
      mobileDropDown: false,
      collapseMembers: false,
      item:null,
      priceInCurrency:1,
      currencyToUsdPrice:1,
      linkToMarketplacePage:null,
      allBidsAmount:null,
      userBidAmount:0,
      userBid:null,
      config:config,
      chartData:[],
      userAddress:null,
      render:false,
      userBidBuyedAll:false,
      itemWithBidsOnSale:false,
      recommendations:null
    };
  },
  components: {
    Breadcrumbs,
    RecommendationsList,
    ListingInfo,
    ListingProperties,
    ListingAbout,
    ListingActivities,
    ListingFractionMarket,
    ListingVote,
    ListingChat,
    Chart
  },
  async mounted() {
    this.activeTab = "ListingInfo";
    this.activeTab2 = "ListingInfo2";
    await this.getAndSetListingInfo();
    this.setPriceInCurrency();
    this.setCurrencyToUsd();
    this.setLinkToMarketplacePage();
    this.setAllBidsAmount();
    this.setUserBidAmount();
    this.setChartData();
    await this.$store.dispatch('marketplaceListing/checkLike');
    await this.checkLike();
    this.recommendations = await this.$store.dispatch('marketplaceListing/getRecomendations',this.item.collection.contract_address);
    this.render = true;
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while (true) {
      await delay(1000);
      this.setAllBidsAmount();
      this.setUserBidAmount();
      this.setChartData();
      this.checkLike();
    }
  },
  methods: {
    convertToEther(value){
      try{
        return ethers.utils.formatEther(String(value));
      }
      catch{
        console.log('ethers error');
      }
    },
    letsCheck(name) {
      this.activeTab = name;
    },
    letsCheck2(name) {
      this.activeTab2 = name;
    },
    async getAndSetListingInfo(){
      await this.$store.dispatch('marketplaceListing/getAndSetItem',this.$route.params.id);

      this.item = await this.$store.getters['marketplaceListing/getItem'];
      this.itemWithBidsOnSale = await (await fetch(`${config.backendApiEntryPoint}listing-with-on-sale-bids/${this.item.id}`)).json();
    },
    setPriceInCurrency(){
      this.priceInCurrency = this.toFixedIfNecessary((this.item.price / (10**this.item.currency.decimals)),6);
    },
    toFixedIfNecessary(value, dp) {
      return +parseFloat(value).toFixed(dp);
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
      this.userAddress = userAddress;
      if (this.item.bids!=null & userAddress!=null & userAddress!='null'){
        for (let element of this.item.bids){
          if (element.address == userAddress){
            this.userBidAmount = parseInt(element.amount);
            this.userBid = element;
            if (element.status == this.item.price){
              this.userBidBuyedAll = true;
            }
            return;
          }
        }
        return
      }
      this.userBidAmount=0;      
    },
    async setChartData(){
      this.chartData = [];
      if (this.item.bids!=null){
        let tempArray = [{region:'Your Bid',val:'0'}]
        this.chartData = this.chartData.concat(tempArray);
        for (let element of this.item.bids){
          if (element.address!=localStorage.getItem('userAddress')){
            tempArray = [{ region: element.address, val: ((element.amount / this.item.price) * 100).toFixed(0) }]
            this.chartData = this.chartData.concat(tempArray);
          }
          else{
            this.chartData[0]={ region: element.address, val: ((element.amount / this.item.price) * 100).toFixed(0) };
          }
        }
        tempArray = [{region:'Avaliable to buy',val:((this.item.price - this.allBidsAmount)/this.item.price)*100 }]
        this.chartData = this.chartData.concat(tempArray);
        return;
      }
    },
    async checkLike(){
      await this.$store.dispatch('marketplaceListing/checkLike');
      this.testLike = this.$store.getters['marketplaceListing/getLike'];
    },
    async changeLike(){      
      if (localStorage.getItem("token") != null) {
      await this.$store.dispatch('marketplaceListing/changeLike');
      this.testLike = this.$store.getters['marketplaceListing/getLike'];
      }
      else{
        await this.$store.dispatch('appGlobal/setShowConnectWalletModal',true);
        this.testLike = false;
      }
    }
  },
};
</script>
