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
      showBuyPartModal:false,
      showClaimNftModal:false,
      showTransSuccessModal:false,
      lastTransactionHash:null,
      showClaimRewardModal:false,
      lastTransSuccess:false,
      greenSnack:false,
      snackText:null,
      showSnackBar:false,
      showVoteInfoModal:false,
      showMobileBurgerMenu:false,
      showContactUsModal:false,
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
    },
    getShowBuyPartModal(state){
      return state.showBuyPartModal;
    },
    getShowClaimNftModal(state){
      return state.showClaimNftModal;
    },
    getShowTransSuccessModal(state){
      return state.showTransSuccessModal;
    },
    getLastTransactionHash(state){
      return state.lastTransactionHash;
    },
    getShowClaimRewardModal(state){
      return state.showClaimRewardModal;
    },
    getLastTransSuccess(state){
      return state.lastTransSuccess;
    },
    getShowSnackBar(state){
      return state.showSnackBar;
    },
    getGreenSnack(state){
      return state.greenSnack;
    },
    getSnackText(state){
      return state.snackText;
    },
    getShowVoteInfoModal(state){
      return state.showVoteInfoModal;
    },
    getShowMobileBurgerMenu(state){
      return state.showMobileBurgerMenu;
    },
    getShowContactUsModal(state){
      return state.showContactUsModal;
    }
  },
  mutations: {
    setShowConnectWalletModal(state, value) {
      state.showConnectWalletModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setShowStartVotingModal(state, value) {
      state.showStartVotingModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setShowVoteConfirmModal(state, value) {
      state.showVoteConfirmModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setCurrentVoting(state,value){
      state.currentVoting = value;
    },
    setCancellSellVotingModal(state,value){
      state.showCancelSellVotingModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setshowStartCollectingModal(state,value){
      state.showStartCollectingModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setshowContinueCollectingModal(state,value){
      state.showContinueCollectingModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setshowDepositCancelModal(state,value){
      state.showDepositCancelModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setShowSellPartModal(state,value){
      state.showSellPartModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setShowCancelSellPartModal(state,value){
      state.showCancelSellPartModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setCurrentPartOnMarket(state,value){
      state.currentPartOnMarket = value;
    },
    setShowBuyPartModal(state,value){
      state.showBuyPartModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setShowClaimNftModal(state,value){
      state.showClaimNftModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setShowTransSuccessModal(state,value){
      state.showTransSuccessModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setLastTransactionHash(state,value){
      state.lastTransactionHash = value;
    },
    setShowClaimRewardModal(state,value){
      state.showClaimRewardModal = value;
      if (value == true){
        document.body.classList.add("fix-content");
      }
      else{
        document.body.classList.remove("fix-content");
      }
    },
    setLastTransSuccess(state,value){
      state.lastTransSuccess = value;
    },
    setShowSnackBar(state,value){
      state.showSnackBar = value;
    },
    setGreenSnack(state,value){
      state.greenSnack = value;
    },
    setSnackText(state,value){
      state.snackText = value;
    },
    setShowVoteInfoModal(state,value){
      state.showVoteInfoModal = value;
    },
    setShowMobileBurgerMenu(state,value){
      state.showMobileBurgerMenu = value;
    },
    setShowContactUsModal(state,value){
      state.showContactUsModal = value;
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
    },
    setShowBuyPartModal(context,value){
      context.commit("setShowBuyPartModal", value);
    },
    setShowClaimNftModal(context,value){
      context.commit("setShowClaimNftModal", value);
    },
    setShowTransSuccessModal(context,value){
      context.commit("setShowTransSuccessModal", value);
    },
    setLastTransactionHash(context,value){
      context.commit("setLastTransactionHash", value);
    },
    setShowClaimRewardModal(context,value){
      context.commit("setShowClaimRewardModal", value);
    },
    setLastTransSuccess(context,value){
      context.commit("setLastTransSuccess", value);
    },
    async setShowSnackBarWithTimeout(context,timeout){
      if (!context.getters.getShowSnackBar){
        console.log('show!');
        context.commit("setShowSnackBar",true);
        const delay = (delayInms) => {
          return new Promise(resolve => setTimeout(resolve, delayInms));
        }
        await delay(1000 * timeout);
        context.commit("setShowSnackBar",false);
      }
     
    },
    setGreenSnack(context,value){
      context.commit("setGreenSnack",value);
    },
    setSnackText(context,value){
      context.commit("setSnackText",value);
    },
    async setShowSnackBar(context,value){
      context.commit("setShowSnackBar",value);
    },
    setShowVoteInfoModal(context,value){
      context.commit("setShowVoteInfoModal",value);
    },
    setShowMobileBurgerMenu(context,value){
      context.commit("setShowMobileBurgerMenu",value);
    },
    setShowContactUsModal(context,value){
      context.commit("setShowContactUsModal",value);
    }
  },
};
