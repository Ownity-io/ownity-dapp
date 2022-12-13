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
              Connect Wallet
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
                <span>Marketplace</span>
              </router-link>
            </li>
            <li class="mobile-menu-item">
              <a>
                <span>Collections</span>
              </a>
            </li>
            <li class="mobile-menu-item"
              v-if="$route.fullPath ==='/'">
                <a href="#screen-collections" >
                    <span>Collections</span>
                    <span>Collections</span>
                </a>
            </li>
            <li class="mobile-menu-item"
              v-else >
                <router-link :to="{name: 'Main'}">
                    <span>Collections</span>
                    <span>Collections</span>
                </router-link>
            </li>
            <li class="mobile-menu-item">
              <router-link :class="active" :to="{name: 'Serve'}">
                  <span>Help</span>
                  <span>Help</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/styles/menu.css";
export default {
  props: ["walletConnected"],
  mounted(){
    console.log(this.walletConnected)
  }
};
</script>
