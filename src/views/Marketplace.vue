<template>
    <div class="page-wrapper">
        <router-view />
    </div>
</template>

<script>
export default{
    methods:{
        async fetchAndSetListingsStartInfo(){
            await this.$store.dispatch('api/fetchAndSetListingsStartInfo');
        },
        async fetchAndSetNftCollections(){
            await this.$store.dispatch('api/fetchAndSetNftCollections');
        },
        async fetchAndSetMarketplaces(){
            await this.$store.dispatch('api/fetchAndSetMarketplaces');
        }
    },
    async mounted(){
        await this.fetchAndSetListingsStartInfo();
        await this.fetchAndSetNftCollections();
        await this.fetchAndSetMarketplaces();
    }
}
</script>