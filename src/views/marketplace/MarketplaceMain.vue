<template>
  <main>
    <div v-if="filterMobile" class="filter-mobile-wrap">
      <FilterMobile v-if="filterMobile" />
      <!-- <div class="filter-mobile-container">
        <div class="filter-mobile-header">
            <div>{{translatesGet('FILTERS')}}</div>
            <button class="btn-close" @click="filterMobile=false">
                <i class="i-close-line"></i>
            </button>
        </div>
        <Filter :activities = "activeTab == 1"/>
        <div class="filter-mobile-footer">
            <button class="btn btn-clear">{{translatesGet('CLEAR_ALL')}}</button>
            <button class="btn btn-submit">{{translatesGet('APPLY')}}</button>
        </div>
      </div> -->
    </div>
    <div class="container">
      <section class="section-breadcrumbs">
        <Breadcrumbs />
      </section>
    </div>
    <section class="section-header">
      <div class="container">
        <h1 class="section-name-h1">{{translatesGet('MARKETPLACE_SECTION_TITLE')}}</h1>
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
                <button class="btn-param btn-param-mobile"  @click="filterMobile=true">
                    <i class="i-filter-2-line" ></i>
              <span>{{translatesGet('FILTER')}}</span>
              </button>
            </div>
          </div>
          <div class="params-block params-block-search">
            <Search />
          </div>
          <SortBar :activeTab="activeTab"/>
          <div class="params-block params-block-switch" v-if="activeTab == 0">
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
        <div v-if="filter" class="section-nft-filter" :class="{'filter-mobile':filterMobile}">
          <Filter :activities = "activeTab == 1"/>
        </div>
        <div class="section-nft-list" :class="{'card-collapse' : switchActive == 1}">
          <SelectedFilters v-if="filter" :activities = "activeTab == 1"/>
          <ListCards v-if="activeTab == 0" />
          <ActivityTable v-if="activeTab == 1" />
          <button v-if="activeTab == 0" class="btn-filter-mobile" @click="filterMobile=true">
            <i class="i-filter-2-line" ></i>
            <span>{{translatesGet('FILTER')}}</span>
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import Search from "@/components/Search.vue";
import Filter from "@/components/Filter.vue";
import FilterMobile from "@/components/FilterMobile.vue";
import ListCards from "@/components/ListCards.vue";
import ActivityTable from "@/components/ActivityTable.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import SelectedFilters from "@/components/SelectedFilters.vue";
import SortBar from '@/components/SortBar.vue'
import MultiLang from "@/core/multilang";
import config from '@/config.json';

export default {
  data() {
    return {
      switchActive: 0,
      activeTab: 0,
      testOpenSort: false,
      filter: true,
      filterMobile: false,
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
    await this.initInfo();
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
    async initInfo(){
      if (this.activeTab == 1) {
        await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:null});
      }
      else {
        await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
        await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
        await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
      }      
    }
  },
  computed:{
        selectedSort:{
            get(){
                return this.$store.getters['marketplace/getSelectedSort'];
            },
            async set(value){
                console.log(value);
                this.$store.dispatch('marketplace/setSelectedSort',value);
                console.log(await this.$store.getters['marketplace/getSelectedSort']);
            }
        }
    }
};
</script>
