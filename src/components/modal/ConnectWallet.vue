<template>
  <div class="modal modal-connect">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">
          {{translatesGet('CONNECT_WALLET_TITLE')}}
        </div>
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',false);">
          <i class="i-close-line"></i>
        </button>
      </div>
      <div class="modal-content">
        <div class="modal-container">
          <div class="modal-describe">
            {{translatesGet('CONNECT_WALLET_SUBTITLE')}}
          </div>
          <div class="modal-connect-btns">
            <button class="btn btn-modal-connect" @click="this.$store.dispatch('walletsAndProvider/connectToMetamask')">
              <div class="icon-btn-connect meta-mask"></div>
              <span>MetaMask</span>
            </button>
            <button class="btn btn-modal-connect" @click="this.$store.dispatch('walletsAndProvider/connectWithWalletConnect')">
              <div class="icon-btn-connect wallet-connect"></div>
              <span>WalletConnect</span>
            </button>
          </div>
          <p class="modal-p">
            {{translatesGet('CONNECT_WALLET_P')}}            
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      lang: new MultiLang(this),
    };
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
};
</script>