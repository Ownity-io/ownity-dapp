<template>
  <main>
    <div class="container">
      <section class="section-breadcrumbs">
        <div class="container">
          <Breadcrumbs />
        </div>
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
              Items
            </button>
          </li>
          <li>
            <button @click="activeTab = 1" :class="{ 'active-tab': activeTab == 1 }">
              Activity
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
              <button class="btn-param" @click="filter = !filter">
                <i
                  :class="{ 'i-arrow-left-s-line': filter, 'i-filter-2-line': !filter }"
                ></i>
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
                <span>Sort by</span>
                <i class="i-arrow-down-s-line"></i>
              </button>
              <div class="drop-down">
                <ul>
                  <li>
                    <span>Price low to higt</span>
                  </li>
                  <li>
                    <span>Price higt to low</span>
                  </li>
                  <li>
                    <span>Newest</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="params-block params-block-switch">
            <div class="param-wrap switch">
              <button
                class="btn-param btn-switch"
                @click="switchActive = 0"
                :class="{ 'switch-active': switchActive == 0 }"
              >
                <i class="i-layout-grid-line"></i>
              </button>
              <button
                class="btn-param btn-switch"
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
        <div v-if="filter" class="section-nft-filter">
          <Filter />
        </div>
        <div class="section-nft-list" :class="{'card-collapse' : switchActive == 1}">
          <SelectedFilters v-if="filter" />
          <ListCards v-if="activeTab == 0" />
          <ActivityTable v-if="activeTab == 1" />
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

export default {
  data() {
    return {
      switchActive: 0,
      activeTab: 0,
      testOpenSort: false,
      filter: true,
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
};
</script>
