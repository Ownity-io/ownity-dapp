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
                            <li><a :class="{active: headerItemActive1}" href="">Marketplace</a></li>
                            <li><a :class="{active: headerItemActive2}" href="">Collections</a></li>
                            <li><a :class="{active: headerItemActive3}" href="">Help</a></li>
                        </ul>
                    </nav>
                    <div class="btn-container">
                        <button class="btn btn-connect" @click="this.$store.dispatch('appGlobal/changeshowConnectWalletModal');">
                            Connect Wallet
                        </button>
                    </div>
                </div>
                <div class="header-mobile"></div>
            </div>
        </div>
    </header>
</template>

<script>

import Search from '@/components/Search.vue'

export default {
    data(){
        return{
            headerItemActive1:true,
            headerItemActive2:false,
            headerItemActive3:false,
        }
    },
    components: {
        Search,
    }
}
</script>