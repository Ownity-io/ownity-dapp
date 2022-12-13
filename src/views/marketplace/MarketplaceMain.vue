<template>
  <main>
    <div v-if="filterMobile" class="filter-mobile-wrap">
      <div class="filter-mobile-header">
        <div>Filters</div>
        <button class="btn-close" @click="filterMobile=false">
          <i class="i-close-line"></i>
        </button>
      </div>
      <Filter />
    </div>
    <div class="container">
      <section class="section-breadcrumbs">
        <Breadcrumbs />
      </section>
    </div>
    <section class="section-header">
      <div class="container">
        <h1 class="section-name-h1">Marketplace NFT</h1>
      </div>
    </section>
    <section class="section-tabs">
      <div class="container">
        <ul class="tabs">
          <li>
            <button @click="activeTab = 0" :class="{ 'active-tab': activeTab == 0 }">
              <span>Items</span>
              <span>Items</span>
            </button>
          </li>
          <li>
            <button @click="activeTab = 1" :class="{ 'active-tab': activeTab == 1 }">
              <span>Activity</span>
              <span>Activity</span>
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
                <span>Filter</span>
                </button>
                <button class="btn-param btn-param-mobile"  @click="filterMobile=true">
                    <i class="i-filter-2-line" ></i>
                <span>Filter</span>
              </button>
            </div>
          </div>
          <div class="params-block params-block-search">
            <Search />
          </div>
          <div class="params-block params-block-sort">
            <div class="param-wrap sort" :class="{ unfolded: testOpenSort }">
              <button class="btn-param btn-sort" @click="testOpenSort = !testOpenSort">
                <span v-if="this.selectedSort == null">Sort by</span>
                <span v-else>{{this.selectedSort.name}}</span>
                <i class="i-arrow-down-s-line"></i>
              </button>
              <div class="drop-down">
                <ul>
                  <li v-for="element in config.sortParams" :key="element"
                    @click="testOpenSort = !testOpenSort;selectedSort=element;initInfo();">
                    <span>{{element.name}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="params-block params-block-switch">
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
          <Filter />
        </div>
        <div class="section-nft-list" :class="{'card-collapse' : switchActive == 1}">
          <SelectedFilters v-if="filter" />
          <ListCards v-if="activeTab == 0" />
          <ActivityTable v-if="activeTab == 1" />
          <button v-if="activeTab == 0" class="btn-filter-mobile" @click="filterMobile=true">
            <i class="i-filter-2-line" ></i>
            <span>Filter</span>
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import Search from "@/components/Search.vue";
import Filter from "@/components/Filter.vue";
import ListCards from "@/components/ListCards.vue";
import ActivityTable from "@/components/ActivityTable.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import SelectedFilters from "@/components/SelectedFilters.vue";
import config from '@/config.json';

export default {
  data() {
    return {
      switchActive: 0,
      activeTab: 0,
      testOpenSort: false,
      filter: true,
      filterMobile: false,
      config:config
    };
  },
  components: {
    Search,
    Filter,
    ListCards,
    ActivityTable,
    Breadcrumbs,
    SelectedFilters,
  },
  async mounted(){
    await this.initInfo();
  },
  methods:{
    async initInfo(){
      await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
      await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
      await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
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
