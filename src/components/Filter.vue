<template>
  <div class="filter">
    <div class="filter-section" :class="{ 'collapse-section': filterSection0 }" v-if="(this.$route.name=='Collection' ||this.$route.name=='Marketplace') & !activities">
      <button class="filter-section-name" @click="filterSection0 = !filterSection0">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" >
          <div class="input-checkbox input-switcher">
            <input type="checkbox" id="input-switch" v-model="currentlyGathering" @change="fetchAndSetListingsStartInfo"/>
            <label for="input-switch">
              <span>{{translatesGet('LIVE_GATHER')}}</span>
              <div class="input-switch"></div>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection0 }" v-if="this.$route.name=='Profile' & (this.onlyFav||(!this.onlyFav & !this.vote & !this.activities))">
      <button class="filter-section-name" @click="filterSection0 = !filterSection0">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" >
          <div class="input-checkbox input-switcher">
            <input type="checkbox" id="input-switch" v-model="currentlyGathering" @change="fetchAndSetListingsStartInfo"/>
            <label for="input-switch">
              <span>{{translatesGet('LIVE_GATHER')}}</span>
              <div class="input-switch"></div>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection0 }" v-if="this.vote">
      <button class="filter-section-name" @click="filterSection0 = !filterSection0">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" >
          <div class="input-checkbox input-switcher">
            <input type="checkbox" id="input-switch" v-model="onSale" @change="fetchAndSetListingsStartInfo"/>
            <label for="input-switch">
              <span>On Sale</span>
              <div class="input-switch"></div>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection2 }" v-if="this.$route.name=='Profile' & onlyFav">
      <button class="filter-section-name" @click="filterSection2 = !filterSection2">
        <span>[Bid Status]</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="item in this.config.profilePageBidsStatuses" :key="item">
          <div class="input-checkbox">
            <input type="checkbox" :id="item.codeName" v-model="checkedBidStatus" :true-value="item.codeName" :false-value="null" @change="fetchAndSetListingsStartInfo"/>
            <label :for="item.codeName">
              <div class="icon-filter-checkbox"></div>
              <span>{{item.name}}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection2 }" v-if="this.$route.name=='Marketplace'||this.$route.name=='Profile'">
      <button class="filter-section-name" @click="filterSection2 = !filterSection2">
        <span>Collection</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="item in this.$store.getters['marketplace/getNftCollections']" :key="item">
          <div class="input-checkbox">
            <input type="checkbox" :id="item.contract_address" v-model="checkedCollection" :true-value="item.contract_address" :false-value="null" @change="fetchAndSetListingsStartInfo"/>
            <label :for="item.contract_address">
              <div class="icon-filter-checkbox" :style="{backgroundImage: `url(${item.logo})`}"></div>
              <span>{{item.name}}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection3 }" v-if="!activities">
      <button class="filter-section-name" @click="filterSection3 = !filterSection3">
        <span>Marketplace</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="item in this.$store.getters['marketplace/getMarketplaces']" :key="item">
          <div class="input-checkbox">
            <input type="checkbox" :id="item.id" v-model="checkedMarketplace" :true-value="item.id" :false-value="null" @change="fetchAndSetListingsStartInfo"/>
            <label :for="item.id">
              <div class="icon-filter-checkbox" :style="{backgroundImage: `url(${item.logo})`}"></div>
              <span>{{item.name}}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection3 }" v-if="activities">
      <button class="filter-section-name" @click="filterSection3 = !filterSection3">
        <span>Category</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="item in this.config.activitiesPart" :key="item">
          <div class="input-checkbox">
            <input type="checkbox" :id="item.codeName" v-model="checkedActivitiesCategory" :true-value="item.codeName" :false-value="null" @change="fetchAndSetListingsStartInfo"/>
            <label :for="item.codeName">
              <div class="icon-filter-checkbox" :style="{backgroundImage: `url(${null})`}"></div>
              <span>{{item.name}}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection4 }" v-if="!activities">
      <button class="filter-section-name" @click="filterSection4 = !filterSection4">
        <span>Price (ETH)</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="container-enter-price">
        <div class="container-input">
          <div class="input-wrapper" :style="isError && { border: '1px solid red'}">
            <input placeholder="Min" ref="input1"  type="text" v-model="this.minPrice" @input="checkMinPrice($event)" v-on:keydown.enter.prevent='deleteFocus'  v-on:keydown.enter='fetchAndSetListingsStartInfoMinPrice'  v-debounce:500ms="fetchAndSetListingsStartInfoMinPrice"/>
          </div>
        </div>
        <span class="between-inputs">to</span>
        <div class="container-input">
          <div class="input-wrapper" :style="isError && { border: '1px solid red'}">
            <input placeholder="Max" ref="input2" type="text" v-model="this.maxPrice" @input="checkMaxPrice" v-on:keydown.enter.prevent='deleteFocus'  v-on:keydown.enter='fetchAndSetListingsStartInfoMinPrice'  v-debounce:500ms="fetchAndSetListingsStartInfoMaxPrice"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.json';
import MultiLang from "@/core/multilang";
import { vue3Debounce } from 'vue-debounce';
export default {
  props:['onlyFav','vote','activities'],

  data() {
    return {
      filterSection0: false,
      filterSection1: false,
      filterSection2: false,
      filterSection3: false,
      filterSection4: false,
      config:config,
      maxPrice:null,
      minPrice:null,
      userAddress:null,
      lang: new MultiLang(this),
      isError: false
    };
  },
  methods:{
		deleteFocus(){
      this.$refs.input1.blur()
      this.$refs.input2.blur()
    },

    async fetchAndSetListingsStartInfo() {
      if (this.$route.name == 'Marketplace'){
        if(this.activities){
          await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:null});
        }
        else{
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',null,true);
        }
      }
      else if (this.$route.name == 'Collection'){
        if(this.activities){
          await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:this.$route.params.contract_address});
        }
        else{
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address,true);
        }        
      }
      else if (this.$route.name == 'Profile'){
        if (this.onlyFav){          
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
        }
        else if(this.vote){
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
        }
        else if(this.activities){
          await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:this.userAddress,collectionAddress:null});
        }
        else{
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
        }        
      }      
    },
    async fetchAndSetListingsStartInfoMaxPrice() {
      await this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice', this.maxPrice);
      await this.$store.dispatch('marketplace/getAndSetCurrentMinPrice', this.minPrice);
      // if (this.maxPrice!=null){
        if (this.$route.name == 'Marketplace') {
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
        }
        else if (this.$route.name == 'Collection') {
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo', this.$route.params.contract_address);
        }
        else if (this.$route.name == 'Profile') {
          if (this.onlyFav) {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
          }
          else if (this.vote) {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
          }
          else {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
          }
        }
      // }
    },
    checkMaxPrice(){
      if (this.maxPrice === '') {
        this.maxPrice = null;
      }
      else if (isNaN(this.maxPrice)) {
        this.maxPrice = parseInt(this.maxPrice);
        if (isNaN(this.maxPrice)){
          this.maxPrice = null;
        }
      }
      this.isError = this.maxPrice < this.minPrice && this.maxPrice && this.minPrice;
      this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice', this.maxPrice); 
        
    },
    async fetchAndSetListingsStartInfoMinPrice() {
      await this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice', this.maxPrice);
      await this.$store.dispatch('marketplace/getAndSetCurrentMinPrice', this.minPrice);
      // if (this.minPrice!=null){
        if (this.$route.name == 'Marketplace') {
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
        }
        else if (this.$route.name == 'Collection') {
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo', this.$route.params.contract_address);
        }
        else if (this.$route.name == 'Profile') {
          if (this.onlyFav) {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
          }
          else if (this.vote) {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
          }
          else {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
          }
        }
      // }
    },
    async checkMinPrice(e) {
      if (this.minPrice === '') {
        this.minPrice = null;
      }

      else if (isNaN(this.minPrice)) {
        this.minPrice = parseInt(this.minPrice);
        if (isNaN(this.minPrice)){
          this.minPrice = null;
        }
      }
      this.isError = this.maxPrice < this.minPrice && this.maxPrice && this.minPrice;
      this.$store.dispatch('marketplace/getAndSetCurrentMinPrice', this.minPrice);
    },
    translatesGet(key) {
      return this.lang.get(key);
    },
  },
  computed:{
    checkedMarketplace:{
      get(){
        return this.$store.getters['marketplace/getCurrentMarketplaceId'];
      },
      set(value){
        this.$store.dispatch('marketplace/getAndSetCurrentMarketplaceId',value);
      }
    },
    checkedActivitiesCategory:{
      get(){
        return this.$store.getters['marketplace/getCurrentActivitiesCategory'];
      },
      set(value){
        this.$store.dispatch('marketplace/getAndSetCurrentActivitiesCategory',value);
      }
    },
    checkedCollection:{
      get(){
        return this.$store.getters['marketplace/getCurrentCollectionContractAddress'];
      },
      set(value){
        this.$store.dispatch('marketplace/getAndSetCurrentCollectionContractAddress',value);
      }
    },
    currentlyGathering:{
      get(){
        return this.$store.getters['marketplace/getCurrentlyGathering'];
      },
      set(value){
        this.$store.dispatch('marketplace/setCurrentlyGathering',value)
      }
    },
    checkedBidStatus:{
      get(){
        return this.$store.getters['marketplace/getCurrentBidStatus'];
      },
      set(value){
        this.$store.dispatch('marketplace/setCurrentBidStatus',value)
      }
    },
    onSale:{
      get(){
        return this.$store.getters['marketplace/getOnSale'];
      },
      set(value){
        this.$store.dispatch('marketplace/setOnSale',value);
      }
    },
  },
  directives: {
    debounce: vue3Debounce({ lock: true })
  },
  mounted(){
    this.userAddress = localStorage.getItem('userAddress');
  }
};
</script>
