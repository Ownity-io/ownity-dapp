<template>
    <ConnectWallet v-if="this.$store.getters['appGlobal/getShowConnectWalletModal'] & (this.walletConnected==null||this.walletConnected=='null')"/>
    <!-- <DepositPartStart /> -->
    <!-- <DepositPartContinue /> -->
    <!-- <DepositCancel /> -->
    <!-- <SellPart /> -->
    <!-- <SellCancelPart /> -->
    <!-- <SellCancel /> -->
    <!-- <Claim /> -->
    <!-- <ClaimReward /> -->
    <!-- <PriceChanged /> -->
    <VoteConfirm v-if="this.$store.getters['appGlobal/getVoteConfirmModal'] & (this.walletConnected!=null & this.walletConnected!='null')"/>
    <VoteStart v-if="this.$store.getters['appGlobal/getShowStartVotingModal'] & (this.walletConnected!=null & this.walletConnected!='null')" />
    <!-- <TransSuccess /> -->
    <!-- <BuyPart />  -->

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
import DepositCancel from '@/components/modal/DepositCancel.vue'
import SellPart from '@/components/modal/SellPart.vue'
import SellCancelPart from '@/components/modal/SellCancelPart.vue'
import SellCancel from '@/components/modal/SellCancel.vue'
import Claim from '@/components/modal/Claim.vue'
import ClaimReward from '@/components/modal/ClaimReward.vue'
import PriceChanged from '@/components/modal/PriceChanged.vue'
import VoteStart from '@/components/modal/VoteStart.vue'
import VoteConfirm from '@/components/modal/VoteConfirm.vue'
import BuyPart from '@/components/modal/BuyPart.vue'
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
        DepositCancel,
        SellPart,
        SellCancelPart,
        SellCancel,
        Claim,
        ClaimReward,
        PriceChanged,
        VoteStart,
        VoteConfirm,
        BuyPart,
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
