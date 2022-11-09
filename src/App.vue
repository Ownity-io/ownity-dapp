<template>
    <ConnectWallet v-if="this.$store.getters['appGlobal/getShowConnectWalletModal']"/>
    <div class="wrapper-main">
        <HeaderComponent/>
        <RouterView />    
    </div>
    <FooterComponent/>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

import ConnectWallet from '@/components/modal/ConnectWallet.vue'

export default {
    components:{
        HeaderComponent,
        FooterComponent,

        ConnectWallet
    },
}
</script>
