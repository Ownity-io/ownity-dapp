<template>
  <main v-if="collection">
    <FilterMobile v-if="getFilterMobile" :activities = "activeTab == 1" />
    <!-- <div v-if="getFilterMobile" class="filter-mobile-wrap">
      <div class="filter-mobile-container">
        <div class="filter-mobile-header">
            <div>{{translatesGet('FILTERS')}}</div>
            <button class="btn-close" @click="getFilterMobile=false">
                <i class="i-close-line"></i>
            </button>
        </div>
        <Filter :activities = "activeTab == 1"/>
        <div class="filter-mobile-footer">
            <button class="btn btn-clear">{{translatesGet('CLEAR_ALL')}}</button>
            <button class="btn btn-submit">{{translatesGet('APPLY')}}</button>
        </div>
      </div>
    </div> -->
    <div class="container">
      <section class="section-breadcrumbs">
        <Breadcrumbs />
      </section>
    </div>
    <!-- <section class="section-header">
      <div class="container">
        <h1 class="section-name-h1">Marketplace NFT</h1>
      </div>
    </section> -->

    <section class="section-collection">
      <div class="container">
        <div class="collection">
          <div class="collection-wrap">
            <div class="collection-img" :style="{backgroundImage: `url(${collection.logo})`}"></div>
            <div class="collection-data">
              <a target="_blank" rel="nofollow" class="collection-id collection-label">
                <!-- <span>{{ item.collection.name }}</span> -->
                <span>{{collection.name}}</span>
                <i class="i-checkbox-circle-fill"></i>
              </a>
              <div class="links-wrap">
                <div class="collection-data-link">
                  <a target="_blank" rel="nofollow" :href="config.etherscanAddressUrlStart+collection.contract_address">{{collection.contract_address.substring(0,6)+'...'+collection.contract_address.substring(38,42)}}</a><i class="i-external-link-line"></i>
                </div>
                <div class="collection-data-link">
                  <a target="_blank" rel="nofollow" :href="collection.web">
                    {{translatesGet('OFFICIAL_SITE')}}
                  </a>
                  <i class="i-external-link-line"></i>
                </div>
              </div>
            </div>
          </div>

          <ul class="collection-statistics">
            <li>
              <div class="name">{{translatesGet('FLOOR_PRICE')}}</div>
              <div class="token-value">
                <div class="icon-value"></div>
                <span>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(collection.floor_price,2),0)}} ETH</span>
              </div>
            </li>
            <li>
              <div class="name">{{translatesGet('VOLUME_24')}}</div>
              <div class="token-value">
                <div class="icon-value"></div>
                <span>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(collection.volume_24h,2),0)}} ETH</span>
              </div>
            </li>
            <li>
              <div class="name">{{translatesGet('VOLUME_ALL_TIME')}}</div>
              <div class="token-value">
                <div class="icon-value"></div>
                <span>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(collection.volume_all,2),0)}} ETH</span>
              </div>
            </li>
            <li>
              <div class="name">{{translatesGet('HOLDERS')}}</div>
              <div>
                <span>{{useHelpers.abbrNum(collection.holders,0)}}</span>
              </div>
            </li>
            <li>
              <div class="name">{{translatesGet('SUPPLY')}}</div>
              <div>
                <span>{{useHelpers.abbrNum(collection.total_supply,1)}}</span>
              </div>
            </li>
            <li>
              <div class="name">{{translatesGet('ROYALTY')}}</div>
              <div>
                <span>{{collection.royalty}}%</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section-tabs">
      <div class="container">
        <ul class="tabs">
          <li>
            <button @click="activeTab = 0;this.$store.dispatch('marketplace/setAllFiltersToNull');initInfo()" :class="{ 'active-tab': activeTab == 0 }">
              <span>{{translatesGet('ITEMS')}}</span>
              <span>{{translatesGet('ITEMS')}}</span>
            </button>
          </li>
          <li>
            <button @click="activeTab = 1;this.$store.dispatch('marketplace/setAllFiltersToNull');initInfo()" :class="{ 'active-tab': activeTab == 1 }">
              <span>{{translatesGet('ACTIVITY')}}</span>
              <span>{{translatesGet('ACTIVITY')}}</span>
            </button>
          </li>
        </ul>
      </div>
    </section>
    <section class="section-params">
      <div class="container">
        <div class="params">
          <div class="params-block params-block-filter">
            <div class="param-wrap">
                <button class="btn-param btn-param-desktop" @click="filter = !filter">
                  <i
                      :class="{ 'i-arrow-left-s-line': filter, 'i-filter-2-line': !filter }"
                  ></i>
                  <span>{{translatesGet('FILTER')}}</span>
                </button>
                <button class="btn-param btn-param-mobile"  @click="updateFilterMobile(true)">
                  <i class="i-filter-2-line" ></i>
                  <span>{{translatesGet('FILTER')}}</span>
                </button>
            </div>
          </div>
          <div class="params-block params-block-search">
            <Search />
          </div>
          <SortBar :activeTab="activeTab"/>
          <div class="params-block params-block-switch" v-if="activeTab != 1">
            <div class="param-wrap switch">
              <button
                class="btn btn-param btn-switch"
                @click="switchActive = 0"
                :class="{ 'switch-active': switchActive == 0 }"
              >
                <i class="i-layout-grid-line"></i>
              </button>
              <button
                class="btn btn-param btn-switch"
                @click="switchActive = 1"
                :class="{ 'switch-active': switchActive == 1 }"
              >
                <i class="i-layout-2-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <section class="section-nft" :class="{ 'with-filter': filter }">
        <div v-if="filter" class="section-nft-filter" :class="{'filter-mobile':getFilterMobile}">
          <Filter :activities = "activeTab == 1"/>
        </div>
        <div class="section-nft-list" :class="{ 'card-collapse': switchActive == 1 }">
          <SelectedFilters v-if="filter" :activities = "activeTab == 1"/>
          <ListCards v-if="activeTab == 0" />
          <ActivityTable v-if="activeTab == 1" />
          <button v-if="activeTab == 0" class="btn-filter-mobile" @click="updateFilterMobile(true)">
              <i class="i-filter-2-line" ></i>
              <span>{{translatesGet('FILTER')}}</span>
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import config from '@/config.json'
import Search from "@/components/Search.vue";
import FilterMobile from "@/components/FilterMobile.vue";
import Filter from "@/components/Filter.vue";
import ListCards from "@/components/ListCards.vue";
import ActivityTable from "@/components/ActivityTable.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import SelectedFilters from "@/components/SelectedFilters.vue"; 
import MultiLang from "@/core/multilang";
import SortBar from '@/components/SortBar.vue';
import helpers from "@/helpers/helpers";
import {mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      useHelpers: helpers,
      switchActive: 0,
      activeTab: 0,
      testOpenSort: false,
      filter: true,
      collection:null,
      config:config,
      lang: new MultiLang(this),
    };
  },
  components: {
    Search,
    Filter,
    FilterMobile,
    ListCards,
    ActivityTable,
    Breadcrumbs,
    SelectedFilters,
    SortBar
  },
  async mounted(){
    window.scrollTo(0, 0);
    let result = await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address);
    if(!result) {
      await this.$router.push('/404')
    }
    await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
    await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
    await this.getAndSetCollection();
  },
  methods:{
    ...mapMutations(['updateFilterMobile']),
    translatesGet(key) {
      return this.lang.get(key);
    },
    async getAndSetCollection(){
      let requestUrl = `${config.backendApiEntryPoint}nft-collections/?contract_address=${this.$route.params.contract_address}`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      this.collection = requestJson[0];
    },
    convertToEther(value) {
      try {
        return ethers.utils.formatEther(String(value));
      }
      catch {
        //console.log('ethers error');
      }
    },
    async initInfo(){
      if (this.activeTab == 1) {
        await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:this.$route.params.contract_address});          
      }
      else {
        await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo', this.$route.params.contract_address);
        await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
        await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
      }
    }
  },
  computed:{
        ...mapGetters(['getFilterMobile']),
        selectedSort:{
            get(){
                return this.$store.getters['marketplace/getSelectedSort'];
            },
            async set(value){
                //console.log(value);
                this.$store.dispatch('marketplace/setSelectedSort',value);
                //console.log(await this.$store.getters['marketplace/getSelectedSort']);
            }
        }
    }

};
</script>
