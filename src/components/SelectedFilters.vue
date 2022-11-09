<template>
    <div class="selected-filters">
        <ul>
            <li v-if="this.$store.getters['api/getCurrentStatus']!=null" @click="this.$store.dispatch('api/getAndSetCurrentStatus',null);">
                <button class="btn btn-selected-filter">
                    <span>{{this.$store.getters['api/getCurrentStatus']}}</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li>
                <button class="btn btn-selected-filter">
                    <div class="icon-selected-filter"></div>
                    <span>Mutant Ape Yacht Club</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li>
                <button class="btn btn-selected-filter">
                    <span>Min 1 ETH</span>
                    <i class="i-close-line"></i>
                </button>
            </li>
            <li>
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