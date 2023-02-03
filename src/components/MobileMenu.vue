<template>
  <div class="mobile-menu">
    <div class="mobile-menu-content">
      <div class="mobile-menu-main-btn">
        <div class="mobile-menu-container container">
          <div
            class="btn-container"
            v-if="walletConnected == null || walletConnected == 'null'"
          >
            <button
              class="btn btn-connect"
              @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal', true)"
            >
            <!-- @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal', true)" -->
              <span>{{translatesGet('CONNECT_WALLET')}}</span>
            </button>
          </div>
          <div class="btn-container" v-else @click="(this.$store.dispatch('appGlobal/setShowMobileBurgerMenu',false))" >
            <router-link :to="{ name: 'Profile' }" class="btn btn-address">
              <jazzicon :address="userAddress" :diameter="32" class="icon-address" v-if="userAddress"/>
              <div class="icon-address" v-else></div>
              <span>
                {{ this.$store.getters["walletsAndProvider/getUserShortAddress"] }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="mobile-menu-container container">
        <nav class="mobile-menu-list">
          <ul class="">
            <li class="mobile-menu-item" @click="(this.$store.dispatch('appGlobal/setShowMobileBurgerMenu',false))" >
              <router-link :class="active" :to="{ name: 'Marketplace' }">
                <span>{{translatesGet('MARKETPLACE')}}</span>
              </router-link>
            </li>
            <li class="mobile-menu-item"
              v-if="$route.fullPath ==='/'" @click="(this.$store.dispatch('appGlobal/setShowMobileBurgerMenu',false))" >
                <a href="#screen-collections" >
                    <span>{{translatesGet('COLLECTIONS')}}</span>
                </a>
            </li>
            <li class="mobile-menu-item"
              v-else >
                <router-link :to="{name: 'Main'}" @click="(this.$store.dispatch('appGlobal/setShowMobileBurgerMenu',false))" >
                    <span>{{translatesGet('COLLECTIONS')}}</span>
                </router-link>
            </li>
            <li class="mobile-menu-item">
              <router-link :class="active" :to="{name: 'Serve'}" @click="(this.$store.dispatch('appGlobal/setShowMobileBurgerMenu',false))" >
                  <span>{{translatesGet('HELP')}}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import MultiLang from "@/core/multilang";
import "@/assets/styles/menu.css";
export default {
  props: ["walletConnected"],
  data(){
    return {
      walletConnected:1,
      lang: new MultiLang(this),
      userAddress:null
    }
  },
  methods:{
    getWalletFromLS() {
      this.walletConnected = localStorage.getItem('connectedWallet');
    },
    clearLocalStorage(){
        localStorage.clear();
    },
    translatesGet(key) {
      return this.lang.get(key);
    },
  },
  async mounted(){
    this.getWalletFromLS();
    this.userAddress = localStorage.getItem('userAddress');
    const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while (true) {
        await delay(1000);
        this.getWalletFromLS();
    }
  }
};
</script>
