<template>
    <div class="wrapper-main">
    <HeaderComponent/>
        <RouterView />    
    </div>
    <FooterComponent/>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
    components:{
        HeaderComponent,
        FooterComponent,
    },
    methods:{
        async getListings(){
            await this.$store.dispatch('api/fetchAndSetListingsInfo');
        }
    },
    async mounted(){
        await this.getListings();
    }
}
</script>
