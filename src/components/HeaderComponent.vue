<template>
    <MobileMenu :class="{show: (this.$store.getters['appGlobal/getShowMobileBurgerMenu'])}" :walletConnected="(walletConnected=walletConnected)"/>
    <header :class="{'mobile-search' :(mobileSearch==true)}">
        <div class="container">
            <div class="header-wrapper">
                <div v-if="$route.path ==='/'" @click="goToTop()" class="header-logo"></div>
                <router-link :to="{name: 'Main'}" v-else class="header-logo"></router-link>
                <div class="header-search">
                    <button class="header-search-mobile-btn btn-arrow">
                        <i class="i-arrow-left-s-line "  @click="(mobileSearch=false)"></i>
                    </button>                    
                    <Search :isHeader="true"/>
                    <button class="header-search-mobile-btn btn-close">
                        <i class="i-close-line "  @click="(mobileSearch=false)"></i>
                    </button>                </div>
                <div class="header-nav">
                    <nav>
                        <ul>
                          <li>
                            <a :class="$route.name === 'Marketplace' && 'active'" href="/marketplace" @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/clearListingsInfo');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
                                <span>{{translatesGet('MARKETPLACE')}}</span>
                                <span>{{translatesGet('MARKETPLACE')}}</span>
                            </a>
                          </li>
                          <li  v-if="$route.path ==='/main'">
                            <a :class="getActiveCollectionLink && 'active'"
                               ref="screenCollections" href="#screen-collections">
                              <span>{{translatesGet('COLLECTIONS')}}</span>
                              <span>{{translatesGet('COLLECTIONS')}}</span>
                            </a>
                          </li>
                          <li v-else @click="$refs.screenCollections.click()">
                            <router-link :to="{ name: 'Main' }">
                              <span>{{translatesGet('COLLECTIONS')}}</span>
                              <span>{{translatesGet('COLLECTIONS')}}</span>
                            </router-link>
                          </li>

                            <li>
                                <router-link :class="active" :to="{name: 'Serve'}">
                                    <span>{{translatesGet('HELP')}}</span>
                                    <span>{{translatesGet('HELP')}}</span>
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                    <div class="btn-container" v-if="(walletConnected==null||walletConnected=='null')">
                        <button class="btn btn-connect" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true);">
                            {{translatesGet('CONNECT_WALLET')}}
                        </button>
                    </div>
                    <div class="btn-container" v-else-if="this.$store.getters['walletsAndProvider/getUserShortAddress']">
                        <router-link :to="{path: '/profile/all'}" class="btn btn-address" @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/clearListingsInfo');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser',true)">
                            <jazzicon :address="userAddress" :diameter="32" class="icon-address" v-if="userAddress"/>
                            <div class="icon-address" v-else></div>
                            <span>{{this.$store.getters['walletsAndProvider/getUserShortAddress']}}</span>
                        </router-link>
                    </div>
                    <div class="btn-container" v-else>
                        <button class="btn btn-connect" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',true);">
                            {{translatesGet('CONNECT_WALLET')}}
                        </button>
                    </div>
                </div>
                <div class="header-mobile">
                    <button @click="(mobileSearch=true)" class="btn-mob-header">
                        <i class="i-search-line"></i>
                    </button>
                    <button @click="(this.$store.dispatch('appGlobal/setShowMobileBurgerMenu',true))" class="btn-mob-header"  v-if="(!this.$store.getters['appGlobal/getShowMobileBurgerMenu'])">
                        <i class="i-menu-line"></i>
                    </button>
                    <button @click="(this.$store.dispatch('appGlobal/setShowMobileBurgerMenu',false))" class="btn-mob-header"  v-if="(this.$store.getters['appGlobal/getShowMobileBurgerMenu'])">
                        <i class="i-close-line"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

import MultiLang from "@/core/multilang";
import Search from '@/components/Search.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import AttentionBlock from "@/components/AttentionBlock.vue";
import {mapGetters} from "vuex";

export default {
    data(){
        return{
            walletConnected:null,
            mobileMenu: false,
            mobileSearch: false,
            lang: new MultiLang(this),
            userAddress:null,
            renderButton:false
        }
    },
    components: {
	    AttentionBlock,
        Search,
        MobileMenu,
    },
    computed:{
       ...mapGetters(['getActiveCollectionLink'])
    },
    methods:{
        getWalletFromLS() {
            this.walletConnected = localStorage.getItem('token');
        },
        clearLocalStorage(){
            localStorage.clear();
        },
        goToTop(){
            window.scrollTo(0, 0);
        },
        translatesGet(key) {
            return this.lang.get(key);
        },
    },
    async mounted(){
        this.getWalletFromLS();
        this.userAddress = localStorage.getItem('userAddress');
        this.renderButton=true;
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