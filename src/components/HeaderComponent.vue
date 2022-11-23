<template>
    <header>
        <div class="container">
            <div class="header-wrapper">
                <div class="header-logo">Marketplace</div>
                <div class="header-search">
                    <Search />
                </div>
                <div class="header-nav">
                    <nav>
                        <ul class="">
                            <li>
                                <router-link :class="active" :to="{name: 'Marketplace'}">
                                    <span>Marketplace</span>
                                    <span>Marketplace</span>
                                </router-link>
                            </li>
                            <li>
                                <a>
                                    <span>Collections</span>
                                    <span>Collections</span>
                                </a>
                            </li>
                            <li>
                                <router-link :class="active" :to="{name: 'Marketplace'}">
                                    <span>Help</span>
                                    <span>Help</span>
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                    <div class="btn-container" v-if="walletConnected==null||walletConnected=='null'">
                        <button class="btn btn-connect" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true);">
                            Connect Wallet
                        </button>
                    </div>
                    <div class="btn-container" v-else>
                        <button class="btn btn-address" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',false);clearLocalStorage()">
                            <div class="icon-address"
                                :style="bs"
                            ></div>
                            <span>{{this.$store.getters['walletsAndProvider/getUserShortAddress']}}</span>
                        </button>
                    </div>
                </div>
                <div class="header-mobile">
                    <button class="btn-mob-header">
                        <i class="i-search-line"></i>
                    </button>
                    <button class="btn-mob-header">
                        <i class="i-menu-line"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

import Search from '@/components/Search.vue'

export default {
    data(){
        return{
            // headerItemActive1:true,
            // headerItemActive2:false,
            // headerItemActive3:false,
            walletConnected:1
        }
    },
    components: {
        Search,
    },
    methods:{
        getWalletFromLS() {
            this.walletConnected = localStorage.getItem('connectedWallet');
        },
        clearLocalStorage(){
            localStorage.clear();
        }
    },
    async mounted(){
        this.getWalletFromLS();
        const delay = (delayInms) => {
            return new Promise(resolve => setTimeout(resolve, delayInms));
        }
        while (true) {
            await delay(1000);
            this.getWalletFromLS();
        }
    }
}
</script>