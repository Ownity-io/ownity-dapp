export default {
  namespaced: true,
  state() {
    return {
      showConnectWalletModal: false,
      showStartVotingModal: false,
      showVoteConfirmModal: false,
      currentVoting:null,
      showCancelSellVotingModal:false,
      showStartCollectingModal:false,
      showContinueCollectingModal:false,
      showDepositCancelModal:false,
      showSellPartModal:false,
      showCancelSellPartModal:false,
      currentPartOnMarket:null,
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
    },
    getshowStartCollectingModal(state){
      return state.showStartCollectingModal;
    },
    getshowContinueCollectingModal(state){
      return state.showContinueCollectingModal;
    },
    getshowDepositCancelModal(state){
      return state.showDepositCancelModal;
    },
    getShowSellPartModal(state){
      return state.showSellPartModal;
    },
    getShowCancelSellPartModal(state){
      return state.showCancelSellPartModal;
    },
    getCurrentPartOnMarket(state){
      return state.currentPartOnMarket;
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
    },
    setshowStartCollectingModal(state,value){
      state.showStartCollectingModal = value;
    },
    setshowContinueCollectingModal(state,value){
      state.showContinueCollectingModal = value;
    },
    setshowDepositCancelModal(state,value){
      state.showDepositCancelModal = value;
    },
    setShowSellPartModal(state,value){
      state.showSellPartModal = value;
    },
    setShowCancelSellPartModal(state,value){
      state.showCancelSellPartModal = value;
    },
    setCurrentPartOnMarket(state,value){
      state.currentPartOnMarket = value;
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
    },
    setshowStartCollectingModal(context,value){
      context.commit("setshowStartCollectingModal", value);
    },
    setshowContinueCollectingModal(context,value){
      context.commit("setshowContinueCollectingModal", value);
    },
    setshowDepositCancelModal(context,value){
      console.log(value);
      context.commit("setshowDepositCancelModal", value);
    },
    setShowSellPartModal(context,value){
      context.commit("setShowSellPartModal", value);
    },
    setShowCancelSellPartModal(context,value){
      context.commit("setShowCancelSellPartModal", value);
    },
    setCurrentPartOnMarket(context,value){
      context.commit("setCurrentPartOnMarket", value);
    }
  },
};
