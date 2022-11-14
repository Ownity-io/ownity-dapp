export default {
  namespaced: true,
  state() {
    return {
      showConnectWalletModal: false,
    };
  },
  getters: {
    getShowConnectWalletModal(state) {
      return state.showConnectWalletModal;
    },
  },
  mutations:{
    setShowConnectWalletModal(state,value){
        state.showConnectWalletModal =value;
    }
  },
  actions:{
    setShowConnectWalletModal(context,value){
        context.commit('setShowConnectWalletModal',value);
    }
  }
};
