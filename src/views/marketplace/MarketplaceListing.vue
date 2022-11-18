<template>
  <main v-if="item!=null">
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
                <div class="collection-img"></div>
                <div class="collection-data">
                  <span class="collection-id collection-label">
                    <span>{{item.collection.name}}</span>
                    <i class="i-checkbox-circle-fill"></i>
                  </span>
                </div>
              </div>
              <div class="listing-additional-options">
                <div class="btn-wrap">
                  <!-- <button class="btn btn-block">
                    <i class="i-heart-3-line"></i>
                  </button> -->
                  <button class="btn btn-block btn-like" 
                    :class="{'liked':testLike}" 
                    @click="testLike = !testLike">
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
            <div class="listing-name">{{item.name}}</div>
            <div class="owned-row">
              Owned by <a :href="config.etherscanAddressUrlStart+item.owner" target="_blank">{{String(item.owner).substring(0,6)+'...'+String(item.owner).substring(38,42)}}</a> <!-- TODO: href to etherscan-->
            </div>
          </section>

          <section class="section-listing-main">
            <!-- <div class="section-deposit" v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN'"> -->
            <div class="section-deposit">
              <div class="section-deposit-data">
                <a  :href='linkToMarketplacePage' class="deposit-img" :style="{backgroundImage: `url(${item.marketplace.logo})`}"></a>
                <div class="deposit-data">
                  <div class="deposit-listened deposit-listened-link"><a :href='linkToMarketplacePage' >Listened on {{item.marketplace.name}} for </a><i class="i-external-link-line"></i></div>
                  <div class="deposit-value" v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN'">
                    <div class="icon-token"></div>
                    <span><b>{{priceInCurrency}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}})</span>
                  </div>
                  <div class="deposit-value" v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'">
                    <div class="icon-token"></div>
                    <span>{{abbrNum(convertToEther(allBidsAmount),1)}} / <b>{{abbrNum(priceInCurrency,1)}}{{' '}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum((convertToEther(allBidsAmount)*currencyToUsdPrice).toFixed(2),1)}}/{{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}})</span>
                  </div>
                  <div class="deposit-part" v-if="false">
                    Your part : <span>20 %</span>
                  </div>
                </div>
              </div>
              <div class="section-deposit-btns">
                <button class="btn btn-deposit" v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN'">Start collecting</button>
                <button class="btn btn-deposit" v-if="item.marketplace_status=='OPEN' &
                item.internal_status=='GATHER' & (
                !(userBidAmount>0) || 
                (((userBidAmount/this.item.price)*100)<20))">Deposit part</button>
                <button class="btn btn-get" v-if="userBidAmount>0">Get part back</button>
              </div>
              <div class="section-deposit-labels" v-if="false">
                <div class="deposit-label">
                  <i class="i-shopping-bag-line"></i>
                  Your part: <span><b>12 ETH</b> (10%)</span>
                </div>
                <div class="deposit-label">
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
              <button class="btn-collapse" @click="collapseMembers = !collapseMembers">
                <div class="actions-row">
                  Actions with their a part
                </div>
                <i class="i-arrow-down-s-line"></i>
              </button>
              <div class="section-unfolded-content">
                <ul class="tabs">
                  <li>
                    <button class='active-tab'>
                      <span>Info</span>
                      <span>Info</span>
                    </button>
                  </li>
                  <li>
                    <button
                      :class="{ 'active-tab': activeTab === 'ListingFractionMarket' }"
                      @click="letsCheck('ListingFractionMarket')"
                      >
                      <span>Fraction market</span>
                      <span>Fraction market</span>
                    </button>
                  </li>
                  <li>
                    <button
                      :class="{ 'active-tab': activeTab === 'ListingVote' }"
                      @click="letsCheck('ListingVote')"
                      >
                      <span>Vote</span>
                      <span>Vote</span>
                    </button>
                  </li>
                </ul>
                <div class="section-table-chart">
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
              <ListingFractionMarket v-if="activeTab === 'ListingFractionMarket'" />
              <ListingVote v-if="activeTab === 'ListingVote'" />
              <ListingActivities v-if="activeTab === 'ListingActivities'" />
              <ListingChat v-if="activeTab === 'ListingChat'" />
            </div>
          </section>
        </div>
      </div>
    </div>
    <section class="section-recommendation">
      <div class="container">
        <RecommendationsList :items="this.$store.dispatch('marketplaceListing/getRecomendations',item.collection.contract_address)"/>
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
import ListingFractionMarket from "@/components/ListingFractionMarket.vue";
import ListingVote from "@/components/listing/ListingVote.vue";
import ListingChat from "@/components/listing/ListingChat.vue";

import Chart from "@/components/listing/chart/Chart.vue";

import { ethers } from "ethers";
import config from '@/config.json';


export default {
  data() {
    return {
      activeTab: "",
      srcTest: "../../assets/images/test-bg.png",
      testLike: false,

      collapseMembers: false,
      item:null,
      priceInCurrency:1,
      currencyToUsdPrice:1,
      linkToMarketplacePage:null,
      allBidsAmount:null,
      userBidAmount:0,
      config:config,
      chartData:[],
      userAddress:null
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
    await this.getAndSetListingInfo();
    this.setPriceInCurrency();
    this.setCurrencyToUsd();
    this.setLinkToMarketplacePage();
    this.setAllBidsAmount();
    this.setUserBidAmount();
    this.setChartData();
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while (true) {
      await delay(1000);
      this.setAllBidsAmount();
      this.setUserBidAmount();
      this.setChartData();
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
    async getAndSetListingInfo(){
      await this.$store.dispatch('marketplaceListing/getAndSetItem',this.$route.params.id);
      this.item = await this.$store.getters['marketplaceListing/getItem'];
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
  },
};
</script>
