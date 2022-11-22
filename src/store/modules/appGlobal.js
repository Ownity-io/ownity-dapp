export default {
  namespaced: true,
  state() {
    return {
      showConnectWalletModal: false,
      showStartVotingModal: false,
      showVoteConfirmModal: false,
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
  },
};
