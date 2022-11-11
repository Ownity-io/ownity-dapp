<template>
  <div class="filter">
    <div class="filter-section" :class="{ 'collapse-section': filterSection1 }">
      <button class="filter-section-name" @click="filterSection1 = !filterSection1">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="item in this.$store.getters['marketplace/getStatuses']" :key="item">
          <div class="input-checkbox">
            <input type="checkbox" :id="item" v-model="checkedStatus" :true-value="item" :false-value="null" @change="fetchAndSetListingsStartInfo"/>
            <label :for="item">
              <span>{{(item  === 'CLOSED') ? 'Closed' : 'Open' }}</span>
              <!-- "CLOSED", "OPEN -->
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li" >
          <div class="input-checkbox">
            <input type="checkbox"/>
            <label :for="item">
              <div class="i-wrap">
                <i class="i-shopping-bag-line"></i>
              </div>
              <span>Sale</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li" >
          <div class="input-checkbox">
            <input type="checkbox"/>
            <label :for="item">
              <div class="i-wrap">
                <i class="i-price-tag-3-line"></i>
              </div>
              <span>Listing</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li" >
          <div class="input-checkbox">
            <input type="checkbox"/>
            <label :for="item">
              <div class="i-wrap">
                <i class="i-hand-coin-line"></i>
              </div>
              <span>Offer</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li" >
          <div class="input-checkbox">
            <input type="checkbox"/>
            <label :for="item">
              <div class="i-wrap">
                <i class="i-truck-line"></i>
              </div>
              <span>Transfer</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection2 }">
      <button class="filter-section-name" @click="filterSection2 = !filterSection2">
        <span>Collection</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="item in this.$store.getters['marketplace/getNftCollections']" :key="item">
          <div class="input-checkbox">
            <input type="checkbox" :id="item.contract_address" v-model="checkedCollection" :true-value="item.contract_address" :false-value="null" @change="fetchAndSetListingsStartInfo"/>
            <label :for="item.contract_address">
              <div class="icon-filter-checkbox"></div>
              <span>{{item.name}}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection3 }">
      <button class="filter-section-name" @click="filterSection3 = !filterSection3">
        <span>Marketplace</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="item in this.$store.getters['marketplace/getMarketplaces']" :key="item">
          <div class="input-checkbox">
            <input type="checkbox" :id="item.id" v-model="checkedMarketplace" :true-value="item.id" :false-value="null" @change="fetchAndSetListingsStartInfo"/>
            <label :for="item.id">
              <div class="icon-filter-checkbox"></div>
              <span>{{item.name}}</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection4 }">
      <button class="filter-section-name" @click="filterSection4 = !filterSection4">
        <span>Price (ETH)</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="container-enter-price">
        <div class="container-input">
          <div class="input-wrapper">
            <input type="number" placeholder="Min" v-model="minPrice" @input="fetchAndSetListingsStartInfo"/>
          </div>
        </div>
        <span class="between-inputs">to</span>
        <div class="container-input">
          <div class="input-wrapper">
            <input type="number" placeholder="Max" v-model="maxPrice" @input="fetchAndSetListingsStartInfo"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterSection1: false,
      filterSection2: false,
      filterSection3: false,
      filterSection4: false,
    };
  },
  methods:{
    async fetchAndSetListingsStartInfo() {
      await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
    },
  },
  computed:{
    checkedStatus:{
      get(){
        return this.$store.getters['marketplace/getCurrentStatus'];
      },
      set(value){
        this.$store.dispatch('marketplace/getAndSetCurrentStatus',value);
      }
    },
    checkedMarketplace:{
      get(){
        return this.$store.getters['marketplace/getCurrentMarketplaceId'];
      },
      set(value){
        this.$store.dispatch('marketplace/getAndSetCurrentMarketplaceId',value);
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
    minPrice:{
      get(){
        return this.$store.getters['marketplace/getCurrentMinPrice'];
      },
      set(value){
        if (value) {
          this.$store.dispatch('marketplace/getAndSetCurrentMinPrice', value);
        }
        else {
          this.$store.dispatch('marketplace/getAndSetCurrentMinPrice', null);
        }
      }
    },
    maxPrice:{
      get(){
        return this.$store.getters['marketplace/getCurrentMaxPrice'];
      },
      set(value){
        if (value) {
          this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice', value);
        }
        else {
          this.$store.dispatch('marketplace/getAndSetCurrentMaxPrice', null);
        }
      }
    },
  }
};
</script>
