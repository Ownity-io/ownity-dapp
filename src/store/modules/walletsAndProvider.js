import { ethers } from "ethers";
export default {
  namespaced: true,
  state() {
    return {
      globalProvider: null
    };
  },
  getters: {
    async getGlobalProviderAddress(state){
        return await state.globalProvider.getSigner().getAddress();
    }
  },
  mutations: {
    setGlobalProvider(state,_provider){
        state.globalProvider = _provider;
    }
  },
  actions: {
    async connectToMetamask(context) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);        
        context.commit('setGlobalProvider',provider);
      } catch {
        console.log('Metamask Connection Error');
      }
    },
  },
};
