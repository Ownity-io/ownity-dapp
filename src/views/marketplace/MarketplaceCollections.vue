<template>
  <main>
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
            <div class="collection-img"></div>
            <div class="collection-data">
              <span class="collection-id collection-label">
                <!-- <span>{{ item.collection.name }}</span> -->
                <span>item.collection.name</span>
                <i class="i-checkbox-circle-fill"></i>
              </span>
              <div class="links-wrap">
                <div class="collection-data-link">
                  <a href="#">0xBC4C...f13D</a><i class="i-external-link-line"></i>
                </div>
                <div class="collection-data-link">
                  <a href="#">Official Site</a><i class="i-external-link-line"></i>
                </div>
              </div>
            </div>
          </div>

          <ul class="collection-statistics">
            <li>
              <div class="name">Floor price</div>
              <div class="token-value">
                <div class="icon-value"></div>
                <span>58.40 ETH</span>
              </div>
            </li>
            <li>
              <div class="name">Volume 24h</div>
              <div class="token-value">
                <div class="icon-value"></div>
                <span>1.076K ETH</span>
              </div>
            </li>
            <li>
              <div class="name">Volume all time</div>
              <div class="token-value">
                <div class="icon-value"></div>
                <span>56.79K ETH</span>
              </div>
            </li>
            <li>
              <div class="name">Holders</div>
              <div>
                <span>6.4K</span>
              </div>
            </li>
            <li>
              <div class="name">Supply</div>
              <div>
                <span>10K</span>
              </div>
            </li>
            <li>
              <div class="name">Royalty</div>
              <div>
                <span>2.5%</span>
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
        <div class="section-nft-list" :class="{ 'card-collapse': switchActive == 1 }">
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

export default {
  data() {
    return {
      switchActive: 0,
      activeTab: 0,
      testOpenSort: false,
      filter: true,
      filterMobile: false,
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
