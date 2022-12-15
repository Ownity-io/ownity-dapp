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
          <div class="btn-container" v-else>
            <router-link :to="{ name: 'Profile' }" class="btn btn-address">
              <div class="icon-address"></div>
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
            <li class="mobile-menu-item">
              <router-link :class="active" :to="{ name: 'Marketplace' }">
                <span>{{translatesGet('MARKETPLACE')}}</span>
              </router-link>
            </li>
            <li class="mobile-menu-item"
              v-if="$route.fullPath ==='/'">
                <a href="#screen-collections" >
                    <span>{{translatesGet('COLLECTIONS')}}</span>
                </a>
            </li>
            <li class="mobile-menu-item"
              v-else >
                <router-link :to="{name: 'Main'}">
                    <span>{{translatesGet('COLLECTIONS')}}</span>
                </router-link>
            </li>
            <li class="mobile-menu-item">
              <router-link :class="active" :to="{name: 'Serve'}">
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
      lang: new MultiLang(this),
    }
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
};
</script>
