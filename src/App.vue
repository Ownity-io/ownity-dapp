<template>
    <!-- <SnackBar /> -->
    <!-- <Cookies /> -->
    <ConnectWallet v-if="this.$store.getters['appGlobal/getShowConnectWalletModal'] & (this.walletConnected==null||this.walletConnected=='null')"/>

    <RouterView />  
</template>

<script>

import ConnectWallet from '@/components/modal/ConnectWallet.vue'
import SnackBar from '@/components/SnackBar.vue'
import Cookies from '@/components/Cookies.vue'


export default {
    components:{

        ConnectWallet,
        SnackBar,
        Cookies
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
        // this.checkWalletInLS();
        this.getWalletFromLS();
        const delay = (delayInms) => {
            return new Promise(resolve => setTimeout(resolve, delayInms));
        }
        while (true) {
            await delay(1000);
            this.getWalletFromLS();
        }
    },
    data(){
        return{
            walletConnected:1
        }
    }
}
</script>
