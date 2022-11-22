export default {
  namespaced: true,
  state() {
    return {
      showConnectWalletModal: false,
      showStartVotingModal: false,
      showVoteConfirmModal: false,
      currentVoting:null,
      showCancelSellVotingModal:false
    };
  },
  getters: {
    getShowConnectWalletModal(state) {
      return state.showConnectWalletModal;
    },
    getShowStartVotingModal(state) {
      return state.showStartVotingModal;
    },
    getVoteConfirmModal(state) {
      return state.showVoteConfirmModal;
    },
    getCurrentVoting(state){
      return state.currentVoting;
    },
    getShowCancelSellVotingModal(state){
      return state.showCancelSellVotingModal;
    }
  },
  mutations: {
    setShowConnectWalletModal(state, value) {
      state.showConnectWalletModal = value;
    },
    setShowStartVotingModal(state, value) {
      state.showStartVotingModal = value;
    },
    setShowVoteConfirmModal(state, value) {
      state.showVoteConfirmModal = value;
    },
    setCurrentVoting(state,value){
      state.currentVoting = value;
    },
    setCancellSellVotingModal(state,value){
      state.showCancelSellVotingModal = value;
    }
  },
  actions: {
    setShowConnectWalletModal(context, value) {
      context.commit("setShowConnectWalletModal", value);
    },
    setShowStartVotingModal(context, value) {
      context.commit("setShowStartVotingModal", value);
    },
    setShowVoteConfirmModal(context, value) {
      context.commit("setShowVoteConfirmModal", value);
    },
    setCurrentVoting(context,value){
      context.commit("setCurrentVoting", value);
    },
    setCancellSellVotingModal(context,value){
      context.commit("setCancellSellVotingModal", value);
    }
  },
};
