<template>
    <div class="selected-filters">
        <ul v-if="this.$store.getters['marketplace/getFiltersCount']>0 & this.$route.name=='Marketplace'">
            <li  v-if="this.$store.getters['marketplace/getCurrentCollectionContractAddress']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentCollectionContractAddress',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter" :style="{backgroundImage: `url(${this.$store.getters['marketplace/getCurrentNftCollection'].logo})`}"></div>
                    <span>{{this.$store.getters['marketplace/getCurrentNftCollection'].name}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li  v-if="this.$store.getters['marketplace/getCurrentMarketplaceId']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMarketplaceId',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter" :style="{backgroundImage: `url(${this.$store.getters['marketplace/getCurrentMarketplace'].logo})`}"></div>
                    <span>{{this.$store.getters['marketplace/getCurrentMarketplace'].name}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-if="this.$store.getters['marketplace/getCurrentMinPrice']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMinPrice',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <span>{{translatesGet('MIN')}} {{this.$store.getters['marketplace/getCurrentMinPrice']}} ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-if="this.$store.getters['marketplace/getCurrentMaxPrice']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <span>{{translatesGet('MAX')}} {{this.$store.getters['marketplace/getCurrentMaxPrice']}} ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-if="this.$store.getters['marketplace/getCurrentlyGathering']!=false" @click="this.$store.dispatch('marketplace/setCurrentlyGathering',false);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <span>Live gather</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')" v-if="!activities">
                <button class="btn btn-selected-filter btn-reset">
                    <span>{{translatesGet('CLEAR_ALL')}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:null})" v-if="activities">
                <button class="btn btn-selected-filter btn-reset">
                    <span>{{translatesGet('CLEAR_ALL')}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
        </ul>
        <ul v-if="this.$store.getters['marketplace/getFiltersCount']>0 & this.$route.name=='Profile'">   
            <li v-if="this.$store.getters['marketplace/getCurrentlyGathering']!=false" @click="this.$store.dispatch('marketplace/setCurrentlyGathering',false);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')">
                <button class="btn btn-selected-filter">
                    <span>Live gather</span>
                    <i class="i-close-line"></i>
                </button>
            </li> 
            <li v-if="this.$store.getters['marketplace/getCurrentBidStatus']!=null" @click="this.$store.dispatch('marketplace/setCurrentlyGathering',false);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')">
                <button class="btn btn-selected-filter">
                    <span>Bid: {{ this.$store.getters['marketplace/getCurrentBidStatus'] }}</span>
                    <i class="i-close-line"></i>
                </button>
            </li> 
            <li v-if="this.$store.getters['marketplace/getOnSale']!=false" @click="this.$store.dispatch('marketplace/setOnSale',false);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')">
                <button class="btn btn-selected-filter">
                    <span>On Sale</span>
                    <i class="i-close-line"></i>
                </button>
            </li> 
            <li  v-if="this.$store.getters['marketplace/getCurrentMarketplaceId']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMarketplaceId',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter" :style="{backgroundImage: `url(${this.$store.getters['marketplace/getCurrentMarketplace'].logo})`}"></div>
                    <span>{{this.$store.getters['marketplace/getCurrentMarketplace'].name}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>    
            <li  v-if="this.$store.getters['marketplace/getCurrentCollectionContractAddress']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentCollectionContractAddress',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter" :style="{backgroundImage: `url(${this.$store.getters['marketplace/getCurrentNftCollection'].logo})`}"></div>
                    <span>{{this.$store.getters['marketplace/getCurrentNftCollection'].name}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-if="this.$store.getters['marketplace/getCurrentMinPrice']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMinPrice',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')">
                <button class="btn btn-selected-filter">
                    <span>{{translatesGet('MIN')}} {{this.$store.getters['marketplace/getCurrentMinPrice']}} ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-if="this.$store.getters['marketplace/getCurrentMaxPrice']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')">
                <button class="btn btn-selected-filter">
                    <span>{{translatesGet('MAX')}} {{this.$store.getters['marketplace/getCurrentMaxPrice']}} ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')" v-if="!activities">
                <button class="btn btn-selected-filter btn-reset">
                    <span>{{translatesGet('CLEAR_ALL')}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:this.userAddress,collectionAddress:null})" v-if="activities">
                <button class="btn btn-selected-filter btn-reset">
                    <span>{{translatesGet('CLEAR_ALL')}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
        </ul>
        <ul v-if="this.$store.getters['marketplace/getFiltersCount']>0 & this.$route.name=='Collection'">   
            <li v-if="this.$store.getters['marketplace/getCurrentlyGathering']!=false" @click="this.$store.dispatch('marketplace/setCurrentlyGathering',false);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address)">
                <button class="btn btn-selected-filter">
                    <span>Live gather</span>
                    <i class="i-close-line"></i>
                </button>
            </li> 
            <li  v-if="this.$store.getters['marketplace/getCurrentMarketplaceId']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMarketplaceId',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address)">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter" :style="{backgroundImage: `url(${this.$store.getters['marketplace/getCurrentMarketplace'].logo})`}"></div>
                    <span>{{this.$store.getters['marketplace/getCurrentMarketplace'].name}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>    
            <li v-if="this.$store.getters['marketplace/getCurrentMinPrice']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMinPrice',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address)">
                <button class="btn btn-selected-filter">
                    <span>{{translatesGet('MIN')}} {{this.$store.getters['marketplace/getCurrentMinPrice']}} ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-if="this.$store.getters['marketplace/getCurrentMaxPrice']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address)">
                <button class="btn btn-selected-filter">
                    <span>{{translatesGet('MAX')}} {{this.$store.getters['marketplace/getCurrentMaxPrice']}} ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address)" v-if="!activities">
                <button class="btn btn-selected-filter btn-reset">
                    <span>{{translatesGet('CLEAR_ALL')}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:this.$route.params.contract_address})" v-if="activities">
                <button class="btn btn-selected-filter btn-reset">
                    <span>{{translatesGet('CLEAR_ALL')}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
        </ul>
    </div>
    
</template>

<script>
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      lang: new MultiLang(this),
      userAddress:null
    };
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
  },
  props:['activities'],
  mounted(){
    this.userAddress = localStorage.getItem('userAddress');
  }
};
</script>