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
        async fetchAndSetListingsStartInfo(){
            await this.$store.dispatch('api/fetchAndSetListingsStartInfo');
        }
    },
    async mounted(){
        await this.fetchAndSetListingsStartInfo();
    }
}
</script>
