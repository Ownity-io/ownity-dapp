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
                                  <span>
                                    {{translatesGet('EDIT')}}
                                  </span>
                              </li>
                              <li>
                                  <i class="i-share-line"></i>
                                  <span>
                                    {{translatesGet('SHARE')}}
                                  </span>
                              </li>
                              <li>
                                  <i class="i-logout-box-line"></i>
                                  <span>
                                    {{translatesGet('LOG_OUT')}}
                                  </span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
            </div>
            <div class="owned-row">
              {{translatesGet('OWNED_BY')}} <a :href="config.etherscanAddressUrlStart+item.owner" target="_blank">{{String(item.owner).substring(0,6)+'...'+String(item.owner).substring(38,42)}}</a> <!-- TODO: href to etherscan-->
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

          <section class="section-listing-main" v-if="this.item.internal_status!='CLAIMED'">
            <!-- <div class="section-deposit" v-if="item.marketplace_status=='OPEN' & item.internal_status=='OPEN'"> -->
            <div class="section-deposit">
              <div class="section-deposit-data">
                <div class="deposit-img-container">
                  <a  :href='linkToMarketplacePage' class="deposit-img" :style="{backgroundImage: `url(${item.marketplace.logo})`}"
                  v-if="this.item.internal_status!='OWNED' & this.item.internal_status!='ON SALE'"></a>
                  <a  :href='linkToMarketplacePage' class="deposit-img" :style="{backgroundImage: `url('../../public/favicon.webp')`}"
                  v-else-if="this.item.internal_status=='OWNED'"></a>
                  <a  :href='linkToMarketplacePageFromVoting' class="deposit-img" :style="{backgroundImage: `url(${this.voting.marketplace.logo})`}"
                  v-else-if="this.item.internal_status=='ON SALE'"></a>
                </div>
                <div class="deposit-data">
                  <div class="deposit-listened deposit-listened-link" v-if="this.item.internal_status=='SOLD'"><a target="_blank" :href='linkToMarketplacePage' >
                    Solded on {{item.marketplace.name}}
                    {{translatesGet('FOR')}} </a><i class="i-external-link-line"></i></div>
                  <div class="deposit-listened deposit-listened-link" v-else-if="this.item.internal_status!='OWNED' & this.item.internal_status!='ON SALE'"><a target="_blank" :href='linkToMarketplacePage' >
                    {{translatesGet('AVAILABLE_ON')}} {{item.marketplace.name}}
                    {{translatesGet('FOR')}} </a><i class="i-external-link-line"></i></div>
                  <div class="deposit-listened deposit-listened-link" v-else-if="this.item.internal_status=='OWNED'" ><a target="_blank" :href='linkToMarketplacePage' 
                    >
                    {{translatesGet('BOUGHT_ON')}} {{item.marketplace.name}} 
                    {{translatesGet('FOR')}} </a><i class="i-external-link-line"></i></div>
                  <div class="deposit-listened deposit-listened-link" v-if="this.item.internal_status=='ON SALE'"><a target="_blank" :href='linkToMarketplacePageFromVoting' >
                    {{translatesGet('AVAILABLE_ON')}} {{voting.marketplace.name}} 
                    {{translatesGet('FOR')}} </a><i class="i-external-link-line"></i></div>                
                  <div class="deposit-value" v-if="(item.marketplace_status=='OPEN' & item.internal_status=='OPEN')||this.item.internal_status=='OWNED'">
                    <div class="icon-token eth"></div>
                    <span><b>{{priceInCurrency}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}})</span>
                  </div>
                  <div class="deposit-value" v-if="(item.internal_status=='ON SALE')">
                    <div class="icon-token eth"></div>
                    <span><b>{{abbrNum(toFixedIfNecessary(convertToEther(this.voting.amount),6),2)}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum(toFixedIfNecessary(convertToEther(this.voting.amount) *currencyToUsdPrice,2),2)}})</span>
                  </div>
                  <div class="deposit-value" v-if="item.marketplace_status=='CLOSED' & item.internal_status=='SOLD'">
                    <div class="icon-token eth"></div>
                    <span><b>{{priceInCurrency}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}})</span>
                  </div>
                  <div class="deposit-value" v-if="item.marketplace_status=='OPEN' & item.internal_status=='GATHER'">
                    <div class="icon-token eth"></div>
                    <span>{{abbrNum(this.toFixedIfNecessary(convertToEther(allBidsAmount),6),1)}} / <b>{{abbrNum(priceInCurrency,1)}}{{' '}} ETH</b></span>
                    <span class="equivalent">(≈ $ {{abbrNum((convertToEther(allBidsAmount)*currencyToUsdPrice).toFixed(2),1)}}/{{abbrNum(Math.round(priceInCurrency * currencyToUsdPrice),1)}})</span>
                  </div>
                  <div class="deposit-part" v-if="userBid!=null & item.marketplace_status=='CLOSED' & item.internal_status=='OWNED'">
                    {{translatesGet('YOUR_PART')}}: <span>{{userBid.fraction}}</span>
                  </div>
                </div>
              </div>
              <div class="section-deposit-btns">
                <button class="btn btn-deposit" v-if="((item.marketplace_status=='OPEN')  & item.internal_status=='OPEN' & userAddress!=null)"
                  @click="this.$store.dispatch('appGlobal/setshowStartCollectingModal',true)">
                  {{translatesGet('BUY_TOGETHER')}}
                </button>
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN'))  & item.internal_status=='OPEN' & userAddress==null)"
                  @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true)">
                  {{translatesGet('BUY_TOGETHER')}}
                </button>
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN'))  & item.internal_status=='GATHER' & userAddress!=null)"
                  @click="this.$store.dispatch('appGlobal/setshowContinueCollectingModal',true)">
                  {{translatesGet('DEPOSIT_PART')}}
                </button>
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='OPEN'))  & item.internal_status=='GATHER' & userAddress==null)"
                  @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true)">
                  {{translatesGet('DEPOSIT_PART')}}
                </button>
                <button class="btn btn-get" v-if="(((item.marketplace_status=='OPEN' ||item.marketplace_status=='CLOSED'))  & item.internal_status=='GATHER' & userAddress!=null & userBidAmount>0)"
                  @click="this.$store.dispatch('appGlobal/setshowDepositCancelModal',true)">
                  {{translatesGet('CANCEL')}}
                </button>
                <button class="btn btn-deposit" v-if="((item.marketplace_status=='CLOSED')) & item.internal_status=='OWNED' & userAddress!=null & this.userBidAmount>0 & !this.userBidBuyedAll"
                  @click="this.$store.dispatch('appGlobal/setShowStartVotingModal',true)">
                  {{translatesGet('START_VOTING')}}
                </button>
                <button class="btn btn-deposit" v-if="((item.marketplace_status=='CLOSED')) & item.internal_status=='OWNED' & userAddress!=null & this.userBidBuyedAll"
                  @click="this.$store.dispatch('appGlobal/setShowStartVotingModal',true)">
                  {{translatesGet('SELL_NFT')}}
                </button>
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='CLOSED'))  & item.internal_status=='OWNED' & userAddress!=null & userBidBuyedAll)"
                  @click="this.$store.dispatch('appGlobal/setShowClaimNftModal',true)">
                  {{translatesGet('CLAIM_NFT')}}
                </button> 
                <button class="btn btn-get" v-if="(((item.marketplace_status=='CLOSED'))  & item.internal_status=='OWNED' & userAddress!=null & userBidAmount>0)"
                  @click="this.$store.dispatch('appGlobal/setShowSellPartModal',true)">
                  {{translatesGet('SELL_A_PART')}}
                </button> 
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='CLOSED'))  & item.internal_status=='OWNED' & userAddress!=null & userBidAmount==0 & bidsOnSale)">
                  {{translatesGet('BUY')}}
                </button> 
                <a class="btn btn-get" v-if="(((item.marketplace_status=='CLOSED'))  & item.internal_status=='ON SALE' & userAddress!=null & userBidAmount>0 & this.item.votings)"
                @click="letsCheck2('ListingVote')" href="#votes">
                  {{translatesGet('CANCEL_SELL')}}
                </a> 
                <button class="btn btn-get" v-if="(((item.marketplace_status=='CLOSED'))  & item.internal_status=='ON SALE' & userAddress!=null & userBidAmount>0 & !this.item.votings)"
                  @click="this.$store.dispatch('appGlobal/setCurrentVoting',this.voting);this.$store.dispatch('appGlobal/setCancellSellVotingModal',true)">
                  {{translatesGet('CANCEL_SELL')}}
                </button> 
                <button class="btn btn-deposit" v-if="(((item.marketplace_status=='CLOSED'))  & item.internal_status=='SOLD' & userAddress!=null & userBidAmount>0)"
                @click="this.$store.dispatch('appGlobal/setShowClaimRewardModal',true)">Claim reward</button> 
              </div>
              <div class="section-deposit-labels" v-if="userBid!=null">
                <div class="deposit-label" v-if="userBid.status == 'ON SALE'">
                  <i class="i-shopping-bag-line"></i>
                  {{translatesGet('ON_SALE')}}:
                  <span><b>{{abbrNum(toFixedIfNecessary(convertToEther(userBidAmount),6,2))}} ETH</b> ({{userBid.fraction}})</span>
                </div>
                <div class="deposit-label" v-if="false">
                  <i class="i-volume-vibrate-line"></i>
                  {{translatesGet('VOTE')}}:
                  <div class="label-col">
                    <div class="icon-label" :style="{backgroundImage: `url(${item.marketplace.logo})`}"></div>
                    <div><b>2 ETH</b></div>
                    <div>{{translatesGet('PROGRESS')}}: 20%</div>
                  </div>
                  <div class="label-col">
                    <div class="icon-label" :style="{backgroundImage: `url(${item.marketplace.logo})`}"></div>
                    <div><b>2.1 ETH</b></div>
                    <div>{{translatesGet('PROGRESS')}}: 20%</div>
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
                  {{translatesGet('MEMBERS')}}: <span>{{this.item.bids.length}}</span>
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
                      <span>{{translatesGet('INFO')}}</span>
                      <span>{{translatesGet('INFO')}}</span>
                    </button>
                  </li>
                  <li  v-if="itemWithBidsOnSale.bids!=null">
                    <button
                      :class="{ 'active-tab': activeTab2 === 'ListingFractionMarket' }"
                      @click="letsCheck2('ListingFractionMarket')"
                     >
                      <span>{{translatesGet('FRACTION_MARKET')}}</span>
                      <span>{{translatesGet('FRACTION_MARKET')}}</span>
                    </button>
                  </li>
                  <li v-if="(item.marketplace_status=='OPEN' || item.marketplace_status=='CLOSED' ) & (item.internal_status=='OWNED'||item.internal_status=='ON SALE') & item.votings!=null">
                  <!-- <li v-if="true"> -->
                    <button
                      :class="{ 'active-tab': activeTab2 === 'ListingVote' }"
                      @click="letsCheck2('ListingVote')"
                      >
                      <span>{{translatesGet('VOTE')}}</span>
                      <span>{{translatesGet('VOTE')}}</span>
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
                    <div :class="{'members-hide' : this.item.bids.length>5}"></div>
                    <div class="table table-chart">
                      <div class="thead">
                        <div class="td">{{translatesGet('OWNER')}}</div>
                        <div class="td">{{translatesGet('PCT')}}</div>
                        <div class="td td-price">{{translatesGet('PRICE')}}</div>
                      </div>
                      <div class="tbody" :class="{'members' : this.item.bids.length>5}">
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
                          <span class="label-owner" v-if="bid.address==userAddress">{{translatesGet('YOU')}}</span>
                        </div>
                        <div class="td">
                          <div class="td-wrap">{{bid.fraction}}</div>
                        </div>
                        <div class="td td-price">
                          <div class="td-wrap">
                            <div class="td-wrap-price">
                              <div class="icon-token eth"></div>
                              <span>{{abbrNum(this.toFixedIfNecessary((bid.amount / (10**this.item.currency.decimals)),6),2)}} ETH</span>
                              <span class="td-light">≈ $ {{this.toFixedIfNecessary(abbrNum((bid.amount / (10**this.item.currency.decimals) * currencyToUsdPrice),1),2)}}</span>
                            </div>
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

                  <div class="active-votes" id="votes">
                    <div class="votes-wrap-title">
                      {{translatesGet('ACTIVE')}}
                    </div>
                    <ListingVote v-for="voting in this.item.votings" :item="this.item" :voting="voting"/>
                  </div>

                  <!-- <div class="inactive-votes">
                    <div class="votes-wrap-title">
                      Inactive
                    </div>
                    <ListingVote v-for="voting in this.item.votings" :item="this.item" :voting="voting"/>
                  </div> -->

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
                  <span>{{translatesGet('INFO')}}</span>
                  <span>{{translatesGet('INFO')}}</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingProperties' }"
                  @click="letsCheck('ListingProperties')"
                >
                  <span>{{translatesGet('PROPERTIES')}}</span>
                  <span>{{translatesGet('PROPERTIES')}}</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingAbout' }"
                  @click="letsCheck('ListingAbout')"
                >
                  <span>{{translatesGet('ABOUT_COLLECTION')}}</span>
                  <span>{{translatesGet('ABOUT_COLLECTION')}}</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingActivities' }"
                  @click="letsCheck('ListingActivities')"
                >
                  <span>{{translatesGet('ACTIVITIES')}}</span>
                  <span>{{translatesGet('ACTIVITIES')}}</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingChat' }"
                  @click="letsCheck('ListingChat')"
                >
                  <span>{{translatesGet('CHAT')}}</span>
                  <span>{{translatesGet('CHAT')}}</span>
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

import MultiLang from "@/core/multilang";
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
      recommendations:null,
      voting:null,
      lang: new MultiLang(this),
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
    window.scrollTo(0, 0);
    this.activeTab = "ListingInfo";
    this.activeTab2 = "ListingInfo2";
    await this.getAndSetListingInfo();
    this.setPriceInCurrency();
    this.setCurrencyToUsd();
    this.setLinkToMarketplacePage();
    await this.setMaxVoting();
    this.setLinkToMarketplacePageFromVotingOnSale();
    this.setAllBidsAmount();
    this.setUserBidAmount();
    this.setChartData();
    await this.$store.dispatch('marketplaceListing/checkLike');
    await this.checkLike();
    this.$store.dispatch('marketplaceListing/fetchAndSetContractConfig');
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
    translatesGet(key) {
      return this.lang.get(key);
    },
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
      let token_id = this.item.token_id;
      let collection_address = this.item.collection.contract_address;      
      exampleStr = exampleStr.replace('${collection_address}',collection_address);
      exampleStr = exampleStr.replace('${token_id}',token_id);
      this.linkToMarketplacePage = exampleStr;
    },
    setLinkToMarketplacePageFromVotingOnSale(){
      if (this.voting){
        let exampleStr = this.voting.marketplace.listing_link;
        let token_id = this.item.token_id;
        let collection_address = this.item.collection.contract_address;
        exampleStr = exampleStr.replace('${collection_address}', collection_address);
        exampleStr = exampleStr.replace('${token_id}', token_id);
        this.linkToMarketplacePageFromVoting = exampleStr;
      }      
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
    },
    setMaxVoting(){  
      if (this.itemWithBidsOnSale.votings){
        for (let element of this.itemWithBidsOnSale.votings){
            if (element.status=='FULFILLED') {
              this.voting = element;
              return
            }
        }
      }
    },
  },
};
</script>

<style>
  .members {
      max-height: 316px;
      overflow-y: scroll;
      position: relative;
  }
  
  
  .members-hide {
      width: 100%;
      height: 76px;
      position: absolute;
      z-index: 2;
      bottom: 0;
      background: linear-gradient(360deg, #FFFFFF 46.88%, rgba(255, 255, 255, 0) 100%);
  }

</style>
