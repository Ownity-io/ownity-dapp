<template>
  <div class="filter">
    <div class="filter-section" :class="{ 'collapse-section': filterSection1 }">
      <button class="filter-section-name" @click="filterSection1 = !filterSection1">
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li" v-for="item in this.$store.getters['api/getStatuses']" :key="item">
          <div class="input-checkbox">
            <input type="checkbox" :id="item" v-model="checkedStatus" :true-value="item" :false-value="null" @change="fetchAndSetListingsStartInfo"/>
            <label :for="item">
              <span>{{(item  === 'CLOSED') ? 'Closed' : 'Open' }}</span>
              <!-- "CLOSED", "OPEN -->
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
        <li class="filter-li" v-for="item in this.$store.getters['api/getNftCollections']" :key="item">
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
        <li class="filter-li" v-for="item in this.$store.getters['api/getMarketplaces']" :key="item">
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
            <input type="number" placeholder="Min" />
          </div>
        </div>
        <span class="between-inputs">to</span>
        <div class="container-input">
          <div class="input-wrapper">
            <input type="number" placeholder="Max" />
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
      await this.$store.dispatch('api/fetchAndSetListingsStartInfo');
    },
  },
  computed:{
    checkedStatus:{
      get(){
        return this.$store.getters['api/getCurrentStatus'];
      },
      set(value){
        this.$store.dispatch('api/getAndSetCurrentStatus',value);
      }
    },
    checkedMarketplace:{
      get(){
        return this.$store.getters['api/getCurrentMarketplaceId'];
      },
      set(value){
        this.$store.dispatch('api/getAndSetCurrentMarketplaceId',value);
      }
    },
    checkedCollection:{
      get(){
        return this.$store.getters['api/getCurrentCollectionContractAddress'];
      },
      set(value){
        this.$store.dispatch('api/getAndSetCurrentCollectionContractAddress',value);
      }
    },
  }
};
</script>
