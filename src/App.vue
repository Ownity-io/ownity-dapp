<template>
    <SnackBar v-if="this.$store.getters['appGlobal/getShowSnackBar']"/>
    <!-- <Cookies /> -->
    <ConnectWallet v-if="this.$store.getters['appGlobal/getShowConnectWalletModal'] && (!this.walletConnected || this.walletConnected === 'null')"/>

    <RouterView />  
</template>

<script>

import ConnectWallet from '@/components/modal/ConnectWallet.vue'
import SnackBar from '@/components/SnackBar.vue'
import Cookies from '@/components/Cookies.vue'
import {mapActions} from "vuex";


export default {
    data(){
      return{
        walletConnected: 1,
      }
    },
    components:{
        ConnectWallet,
        SnackBar,
        Cookies
    },
    methods:{
        ...mapActions([
          'fetchUsdRate'
        ]),
        async checkWalletInLS() {
            let connectedWallet = localStorage.getItem('connectedWallet');
            // //console.log(connectedWallet);
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
      this.fetchUsdRate({rates: ['eth','weth']})
      setInterval(()=>{
          this.fetchUsdRate({rates: ['eth','weth']})
        }, 600000)

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
}
</script>

<style>
.loadingTime {
  position: relative;
}
.loadingTime:before {
    width: inherit;
    height: inherit;
    background-color: #2F80ED;
}
</style>