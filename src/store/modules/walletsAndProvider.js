import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
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
    async connectWithWalletConnect(context){
        const provider = new WalletConnectProvider({infuraId: "bdc7f317cedb484da4d3953c54344944"});
        await provider.enable()
        const web3Provider = new ethers.providers.Web3Provider(provider);
        context.commit('setGlobalProvider',web3Provider);
    }
  },
};
