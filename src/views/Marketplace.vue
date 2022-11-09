<template>
    <div class="page-wrapper">
        <router-view />
    </div>
</template>

<script>
export default{
    methods:{
        async fetchAndSetListingsStartInfo(){
            await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
        },
        async fetchAndSetNftCollections(){
            await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
        },
        async fetchAndSetMarketplaces(){
            await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
        }
    },
    async mounted(){
        await this.fetchAndSetListingsStartInfo();
        await this.fetchAndSetNftCollections();
        await this.fetchAndSetMarketplaces();
    }
}
</script>