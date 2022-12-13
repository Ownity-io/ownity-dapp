<template>
    <MobileMenu :class="{show: (mobileMenu==true)}" :walletConnected="(walletConnected=walletConnected)"/>
    <header>
        <div class="container">
            <div class="header-wrapper">
                <div v-if="$route.fullPath ==='/'" @click="goToTop()" class="header-logo"></div>
                <router-link :to="{name: 'Main'}" v-else class="header-logo"></router-link>
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
                        <router-link :to="{name:'Profile'}" class="btn btn-address">
                            <div class="icon-address"></div>
                            <span>{{this.$store.getters['walletsAndProvider/getUserShortAddress']}}</span>
                        </router-link>
                    </div>
                </div>
                <div class="header-mobile">
                    <button class="btn-mob-header">
                        <i class="i-search-line"></i>
                    </button>
                    <button @click="(mobileMenu=true)" class="btn-mob-header"  v-if="(mobileMenu==false)">
                        <i class="i-menu-line"></i>
                    </button>
                    <button @click="(mobileMenu=false)" class="btn-mob-header"  v-if="(mobileMenu==true)">
                        <i class="i-close-line"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

import Search from '@/components/Search.vue'
import MobileMenu from '@/components/MobileMenu.vue'

export default {
    data(){
        return{
            walletConnected:1,
            mobileMenu: false,
        }
    },
    components: {
        Search,
        MobileMenu,
    },
    methods:{
        getWalletFromLS() {
            this.walletConnected = localStorage.getItem('connectedWallet');
        },
        clearLocalStorage(){
            localStorage.clear();
        },
        goToTop(){
            window.scrollTo(0, 0);
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