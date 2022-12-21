<template>
    <div class="selected-filters">
        <ul v-if="this.$store.getters['marketplace/getFiltersCount']>0">
            <li  v-if="this.$store.getters['marketplace/getCurrentCollectionContractAddress']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentCollectionContractAddress',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter"></div>
                    <span>{{this.$store.getters['marketplace/getCurrentNftCollection'].name}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li  v-if="this.$store.getters['marketplace/getCurrentMarketplaceId']!=null" @click="this.$store.dispatch('marketplace/getAndSetCurrentMarketplaceId',null);this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter"></div>
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
            <li v-if="this.$route.name!='Profile'" @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter btn-reset">
                    <span>{{translatesGet('CLEAR_ALL')}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-else @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')">
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
    };
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
};
</script>