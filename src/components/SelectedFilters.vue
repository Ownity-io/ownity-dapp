<template>
    <div class="selected-filters">
        <ul v-if="this.$store.getters['api/getFiltersCount']>0">
            <li v-if="this.$store.getters['api/getCurrentStatus']!=null" @click="this.$store.dispatch('api/getAndSetCurrentStatus',null);this.$store.dispatch('api/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <span>{{this.$store.getters['api/getCurrentStatus']}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li  v-if="this.$store.getters['api/getCurrentCollectionContractAddress']!=null" @click="this.$store.dispatch('api/getAndSetCurrentCollectionContractAddress',null);this.$store.dispatch('api/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter"></div>
                    <span>{{this.$store.getters['api/getCurrentNftCollection'].name}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li  v-if="this.$store.getters['api/getCurrentMarketplaceId']!=null" @click="this.$store.dispatch('api/getAndSetCurrentMarketplaceId',null);this.$store.dispatch('api/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter"></div>
                    <span>{{this.$store.getters['api/getCurrentMarketplace'].name}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-if="this.$store.getters['api/getCurrentMinPrice']!=null" @click="this.$store.dispatch('api/getAndSetCurrentMinPrice',null);this.$store.dispatch('api/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <span>Min {{this.$store.getters['api/getCurrentMinPrice']}} ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li v-if="this.$store.getters['api/getCurrentMaxPrice']!=null" @click="this.$store.dispatch('api/getAndSetCurrentMaxPrice',null);this.$store.dispatch('api/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter">
                    <span>Max {{this.$store.getters['api/getCurrentMaxPrice']}} ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li @click="this.$store.dispatch('api/setAllFiltersToNull');this.$store.dispatch('api/fetchAndSetListingsStartInfo')">
                <button class="btn btn-selected-filter btn-reset">
                    <span>Clear all</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
        </ul>
    </div>
    
</template>
<script>
export default {
    data() {
        
    },
}
</script>