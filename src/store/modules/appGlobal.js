export default {
  namespaced: true,
  state() {
    return {
      showConnectWalletModal: true,
    };
  },
  getters: {
    getShowConnectWalletModal(state) {
      return state.showConnectWalletModal;
    },
  },
  mutations:{
    changeshowConnectWalletModal(state){
        state.showConnectWalletModal = !state.showConnectWalletModal;
    }
  },
  actions:{
    changeshowConnectWalletModal(context){
        context.commit('changeshowConnectWalletModal');
    }
  }
};
