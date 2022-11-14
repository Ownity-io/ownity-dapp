<template>
    <ConnectWallet v-if="this.$store.getters['appGlobal/getShowConnectWalletModal'] & (this.walletConnected==null||this.walletConnected=='null')"/>
    <!-- <DepositPartStart /> -->
    <DepositPartContinue />
    <!-- <TransSuccess /> -->
    <div class="wrapper-main">
        <HeaderComponent/>
        <RouterView />    
    </div>
    <FooterComponent/>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

// -----------MODAL_WINDOWS----------------
import ConnectWallet from '@/components/modal/ConnectWallet.vue'
import DepositPartStart from '@/components/modal/DepositPartStart.vue'
import DepositPartContinue from '@/components/modal/DepositPartContinue.vue'
import TransSuccess from '@/components/modal/TransSuccess.vue'
// ----------------------------------------

export default {
    components:{
        HeaderComponent,
        FooterComponent,

// -----------MODAL_WINDOWS----------------
        ConnectWallet,
        DepositPartStart,
        DepositPartContinue,
        TransSuccess
// ----------------------------------------
    },
    methods:{
        async checkWalletInLS() {
            let connectedWallet = localStorage.getItem('connectedWallet');
            console.log(connectedWallet);
            switch (connectedWallet) {
                case 'metamask':
                    await this.$store.dispatch('walletsAndProvider/connectToMetamask');
                    break;
                case 'walletconnect':
                    await this.$store.dispatch('walletsAndProvider/connectWithWalletConnect');
                    break;
            };            
        },
        getWalletFromLS() {
            this.walletConnected = localStorage.getItem('connectedWallet');
        }
    },                
    async mounted() {
        this.checkWalletInLS();
        this.getWalletFromLS();
        setInterval(() => {
            this.getWalletFromLS();
            }, 1000);
    },
    data(){
        return{
            walletConnected:1
        }
    }
}
</script>
