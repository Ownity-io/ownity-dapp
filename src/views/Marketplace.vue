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
        }
    },
    async mounted(){
        await this.fetchAndSetListingsStartInfo();
    }
}
</script>