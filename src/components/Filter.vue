<template>
  <div class="filter">
    <div
      class="filter-section"
      :class="{ 'collapse-section': filterSection0 }"
      v-if="
        (this.$route.name == 'Collection' ||
          this.$route.name == 'Marketplace') && !activities &&
          this.$route.path !== '/marketplace/shares'
      "
    >
      <button
        class="filter-section-name"
        @click="filterSection0 = !filterSection0"
      >
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li">
          <div class="input-checkbox input-switcher">
            <input
              :disabled="getIsFilterInProcess"
              type="checkbox"
              id="input-switch"
              v-model="currentlyGathering"
              @change="fetchAndSetListingsStartInfo"
            />
            <label for="input-switch">
              <span>{{ translatesGet("LIVE_GATHER") }}</span>
              <div class="input-switch"></div>
            </label>
          </div>
        </li>
      </ul>
    </div>

    <div class="filter-section" :class="{ 'collapse-section': filterSection2 }" v-if="this.$route.name=='Profile' & (this.onlyFav||(!this.onlyFav & !this.vote & !this.activities))">
      <button class="filter-section-name" @click="filterSection2 = !filterSection2">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li">
          <div class="input-checkbox input-switcher">
            <input
              :disabled="getIsFilterInProcess"
              type="checkbox"
              id="input-switch"
              v-model="currentlyGathering"
              @change="checkedStatus=null;fetchAndSetListingsStartInfo();"
            />
            <label for="input-switch">
              <span>{{ translatesGet("LIVE_GATHER") }}</span>
              <div class="input-switch"></div>
            </label>
          </div>
        </li>
      </ul>
    </div>



    <div
        class="filter-section"
        :class="{ 'collapse-section': filterSection5 }"
        v-if="
        $route.path === '/profile/favorites' || $route.path === '/profile/all'
      "
    >
      <button
          class="filter-section-name"
          @click="filterSection5 = !filterSection5"
      >
        <span>Listing status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="status in statuses" :key="status.name">
          <div class="input-checkbox">
            <input
                type="checkbox"
                :id="status.value"
                :checked="
                $store.getters['marketplace/getSaleStatusFilter'] &&
                $store.getters['marketplace/getSaleStatusFilter'].name ===
                  status.name
              "
                :value="status.value"
                @click="setSaleStatus(status)"
            />
            <label :for="status.value">
              <div class="icon-filter-checkbox"></div>
              <span>{{ status.name }}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>

    <div class="filter-section" :class="{ 'collapse-section': filterSection3 }" v-if="this.vote">
      <button class="filter-section-name" @click="filterSection3 = !filterSection3">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li">
          <div class="input-checkbox input-switcher">
            <input
              type="checkbox"
              id="input-switch"
              v-model="onSale"
              @change="checkedStatus=null;fetchAndSetListingsStartInfo();"
            />
            <label for="input-switch">
              <span>On Sale</span>
              <div class="input-switch"></div>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection4 }" v-if="this.$route.name=='Profile' & !onlyFav & !activities & !vote">
      <button class="filter-section-name" @click="filterSection4 = !filterSection4">
        <span>Bid Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li
          class="filter-li"
          v-for="item in this.config.profilePageBidsStatuses"
          :key="item"
        >
          <div class="input-checkbox">
            <input
              type="checkbox"
              :id="item.codeName"
              v-model="checkedBidStatus"
              :true-value="item.codeName"
              :false-value="null"
              @change="fetchAndSetListingsStartInfo"
            />
            <label :for="item.codeName">
              <div class="icon-filter-checkbox"></div>
              <span>{{ item.name }}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection9 }" v-if="this.$route.name=='Profile' & onlyFav">
      <button class="filter-section-name" @click="filterSection9 = !filterSection9">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li
          class="filter-li"
          v-for="item in this.config.profilePageFavInternalStatuses"
          :key="item"
        >
          <div class="input-checkbox">
            <input
              type="checkbox"
              :id="item.codeName"
              v-model="checkedStatus"
              :true-value="item.codeName"
              :false-value="null"
              @change="currentlyGathering=null;fetchAndSetListingsStartInfo();"
            />
            <label :for="item.codeName">
              <div class="icon-filter-checkbox"></div>
              <span>{{ item.name }}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection10 }" v-if="this.$route.name=='Profile' & vote">
      <button class="filter-section-name" @click="filterSection10 = !filterSection10">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li
          class="filter-li"
          v-for="item in this.config.profilePageVoteInternalStatuses"
          :key="item"
        >
          <div class="input-checkbox">
            <input
              type="checkbox"
              :id="item.codeName"
              v-model="checkedStatus"
              :true-value="item.codeName"
              :false-value="null"
              @change="onSale=null;fetchAndSetListingsStartInfo();"
            />
            <label :for="item.codeName">
              <div class="icon-filter-checkbox"></div>
              <span>{{ item.name }}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection5 }" v-if="this.$route.name=='Marketplace'||this.$route.name=='Profile'">
      <button class="filter-section-name" @click="filterSection5 = !filterSection5">
        <span>Collection</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li
          class="filter-li"
          v-for="item in this.$store.getters['marketplace/getNftCollections']"
          :key="item"
        >
          <div class="input-checkbox">
            <input
              type="checkbox"
              :id="item.contract_address"
              v-model="checkedCollection"
              :true-value="item.contract_address"
              :false-value="null"
              @change="fetchAndSetListingsStartInfo"
            />
            <label :for="item.contract_address">
              <div
                class="icon-filter-checkbox"
                :style="{ backgroundImage: `url(${item.logo})` }"
              ></div>
              <span>{{ item.name }}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection6 }" v-if="!activities & this.$route.path!='/marketplace' & this.$route.path!='/marketplace/all'">
      <button class="filter-section-name" @click="filterSection6 = !filterSection6">
        <span>Marketplace</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li
          class="filter-li"
          v-for="item in this.marketplaces"
          :key="item"
        >
          <div class="input-checkbox">
            <input
              type="checkbox"
              :id="item.id"
              v-model="checkedMarketplace"
              :true-value="item.id"
              :false-value="null"
              @change="fetchAndSetListingsStartInfo"
            />
            <label :for="item.id">
              <div
                class="icon-filter-checkbox"
                :style="{ backgroundImage: `url(${item.logo})` }"
              ></div>
              <span>{{ item.name }}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection7 }" v-if="activities">
      <button class="filter-section-name" @click="filterSection7 = !filterSection7">
        <span>Category</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li
          class="filter-li"
          v-for="item in this.config.activitiesPart"
          :key="item"
        >
          <div class="input-checkbox">
            <input
              type="checkbox"
              :id="item.codeName"
              v-model="checkedActivitiesCategory"
              :true-value="item.codeName"
              :false-value="null"
              @change="fetchAndSetListingsStartInfo"
            />
            <label :for="item.codeName">
              <div
                class="icon-filter-checkbox"
                :style="{ backgroundImage: `url(${null})` }"
              ></div>
              <span>{{ item.name }}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection6 }" v-if="!activities & (this.$route.path=='/marketplace' || this.$route.path=='/marketplace/all')">
      <button class="filter-section-name" @click="filterSection6 = !filterSection6">
        <span>Marketplace</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li
          class="filter-li"
          v-for="item in this.marketplacesWithoutOwnity"
          :key="item"
        >
          <div class="input-checkbox">
            <input
              type="checkbox"
              :id="item.id"
              v-model="checkedMarketplace"
              :true-value="item.id"
              :false-value="null"
              @change="fetchAndSetListingsStartInfo"
            />
            <label :for="item.id">
              <div
                class="icon-filter-checkbox"
                :style="{ backgroundImage: `url(${item.logo})` }"
              ></div>
              <span>{{ item.name }}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection8 }" v-if="!activities">
      <button class="filter-section-name" @click="filterSection8 = !filterSection8">
        <span>Price (ETH)</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="container-enter-price">
        <div class="container-input">
          <div
            class="input-wrapper"
            :style="isError && { border: '1px solid red' }"
          >
            <input
              placeholder="Min"
              ref="input1"
              type="text"
              v-model="this.minPrice"
              @input="checkMinPrice($event)"
              v-on:keydown.enter.prevent="deleteFocus"
              v-on:keydown.enter="fetchAndSetListingsStartInfoMinPrice"
              v-debounce:500ms="fetchAndSetListingsStartInfoMinPrice"
            />
          </div>
        </div>
        <span class="between-inputs">to</span>
        <div class="container-input">
          <div
            class="input-wrapper"
            :style="isError && { border: '1px solid red' }"
          >
            <input
              placeholder="Max"
              ref="input2"
              type="text"
              v-model="this.maxPrice"
              @input="checkMaxPrice"
              v-on:keydown.enter.prevent="deleteFocus"
              v-on:keydown.enter="fetchAndSetListingsStartInfoMinPrice"
              v-debounce:500ms="fetchAndSetListingsStartInfoMaxPrice"
            />
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
import {mapGetters, mapMutations} from "vuex";
export default {
  props:['onlyFav','vote','activities'],

  data() {
    return {
      filterSection0: false,
      filterSection1: false,
      filterSection2: false,
      filterSection3: false,
      filterSection4: false,
      filterSection5: false,
      filterSection6: false,
      filterSection7: false,
      filterSection8: false,
      filterSection9: false,
      filterSection10: false,
      config:config,
      maxPrice:null,
      minPrice:null,
      userAddress:null,
      lang: new MultiLang(this),
      isError: false,
      statuses: [
        {name: 'Listing Sale', value: '&internal_status=ON%20SALE'},
        {name: 'Share Sale', value: '&bid_status=ON%20SALE'},
        {name: 'Reward', value: '&bid_status=REWARDED'},
        {name: 'History', value: '&internal_statuses=SOLD&CLOSED'},
      ],
      marketplaces:[],
      marketplacesWithoutOwnity:[]
    };
  },
  watch: {
      '$route'(){
        if(this.maxPrice || this.minPrice) {
          this.maxPrice = null
          this.minPrice = null
        }
      }
  },
  methods:{
    ...mapMutations(['updateIsFilterInProcess']),
    setSaleStatus(x) {
      if(this.$store.getters['marketplace/getSaleStatusFilter'] && this.$store.getters['marketplace/getSaleStatusFilter'].name === x.name){
        this.$store.commit('marketplace/setSaleStatusFilter', { data: null })
        this.fetchAndSetListingsStartInfo()
      } else {
        this.$store.commit('marketplace/setSaleStatusFilter', { data: x })
        this.fetchAndSetListingsStartInfo()
      }
    },
		deleteFocus(){
      this.$refs.input1.blur()
      this.$refs.input2.blur()
    },

    async fetchAndSetListingsStartInfo() {
      this.updateIsFilterInProcess(true)

      if (this.$route.name == 'Marketplace'){
        if(this.activities){
          await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:null});
        } else{
          if(this.$route.path === '/marketplace/shares'){
            await this.$store.dispatch('marketplace/fetchSharesSale');
          } else {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',null,true);
          }
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
      this.updateIsFilterInProcess(false)
    },
    async fetchAndSetListingsStartInfoMaxPrice() {
      await this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice', this.maxPrice);
      await this.$store.dispatch('marketplace/getAndSetCurrentMinPrice', this.minPrice);
      // if (this.maxPrice!=null){
        if (this.$route.name == 'Marketplace') {

          if(this.$route.path === '/marketplace/shares') {
            await this.$store.dispatch('marketplace/fetchSharesSale');
          } else {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
          }

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

        if (this.$route.name == 'Marketplace') {
          if(this.$route.path === '/marketplace/shares') {
            await this.$store.dispatch('marketplace/fetchSharesSale');
          } else {
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
          }
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
    ...mapGetters(['getIsFilterInProcess']),
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
    checkedStatus:{
      get(){
        return this.$store.getters['marketplace/getCurrentStatus'];
      },
      set(value){
        this.$store.dispatch('marketplace/setCurrentStatus',value)
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
  async mounted(){
    this.userAddress = localStorage.getItem('userAddress');
    let requestUrl = `${config.backendApiEntryPoint}marketplaces/`;
    let request = await fetch(requestUrl);
    this.marketplaces = await request.json();
    let requestUrl2 = `${config.backendApiEntryPoint}marketplaces/`;
    let request2 = await fetch(requestUrl2);
    this.marketplacesWithoutOwnity = await request2.json();
    let k = 0
    for (let element of  this.marketplacesWithoutOwnity){
      // //console.log(element.id);
      if (element.id=='OWNY'){
        // //console.log(element);
        this.marketplacesWithoutOwnity.splice(k,1);
      }
      k+=1;
    }
  }
};
</script>