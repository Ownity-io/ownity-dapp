import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
export default {
  namespaced: true,
  state() {
    return {
      globalProvider: null,
      token: null,
      address:null,
      shortAddress:null
    };
  },
  getters: {
    async getGlobalProvider(state){
        return await state.globalProvider;
    },
    getUserAddress(state){
      return state.address;
    },
    getUserShortAddress(state){
      return state.shortAddress;
    },
    getUserToken(state){
      return state.token;
    }
  },
  mutations: {
    setGlobalProvider(state,_provider){
        state.globalProvider = _provider;
    },
    setUserInfo(state,_userAddress){
      state.address=_userAddress;
      state.shortAddress = _userAddress.substring(0,6)+'...'+_userAddress.substring(38,42);
    }
  },
  actions: {
    async connectToMetamask(context) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);        
        context.commit('setGlobalProvider',provider);
        await provider.send(
          'wallet_switchEthereumChain',
          [{ chainId: "0x1"}],
        );
        context.commit('setUserInfo',await provider.getSigner().getAddress());
        localStorage.setItem('connectedWallet','metamask');
        localStorage.setItem('userAddress',await provider.getSigner().getAddress());
      } catch {
        localStorage.setItem('connectedWallet',null);
        console.log('Metamask Connection Error');
      }
    },
    async connectWithWalletConnect(context){
      try{
        const provider = new WalletConnectProvider({infuraId: "bdc7f317cedb484da4d3953c54344944"});
        await provider.enable()
        const web3Provider = new ethers.providers.Web3Provider(provider);
        context.commit('setGlobalProvider',web3Provider);
        await web3Provider.send(
          'wallet_switchEthereumChain',
          [{ chainId: "0x1"}],
        );
        context.commit('setUserInfo',await web3Provider.getSigner().getAddress());
        localStorage.setItem('connectedWallet','walletconnect');
        localStorage.setItem('userAddress',await web3Provider.getSigner().getAddress());
      } catch{
        localStorage.setItem('connectedWallet',null);
        console.log('WalletConnect Connection Error');
      }
    }
  },
};
