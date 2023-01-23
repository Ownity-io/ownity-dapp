import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import config from "@/config.json";
export default {
  namespaced: true,
  state() {
    return {
      globalProvider: null,
      token: null,
      tokenEndTimestamp: null,
      refreshToken:null,
      nonce:null,
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
    },
    async getSigner(state){
      return (await state.globalProvider.getSigner());
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
        await provider.send('wallet_switchEthereumChain',[{ chainId: "0x5"}]);     
        let userAddress = await provider.getSigner().getAddress();
        console.log(userAddress);
        console.log(localStorage.getItem('userAddress'));
        if (localStorage.getItem('userAddress')!=userAddress){
          // localStorage.setItem('userAddress',null);
          // localStorage.setItem('token',null);
          // localStorage.setItem('tokenEndTimestamp',null);
          // localStorage.setItem('refreshToken',null);
          // localStorage.setItem('nonce',null);
          localStorage.clear();
        }
        if (localStorage.getItem('userAddress')==null || localStorage.getItem('userAddress')=='null'){
          //getNonce
          let requestUrl = `${config.backendApiEntryPoint}registration/`;
          let request = await fetch(
            requestUrl,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({address: userAddress})
            }
          );
          let nonce = (await request.json()).data.nonce;
          console.log(nonce);
          //SignMessage
          let msg = `${config.messageToSignStart}${nonce}`;
          let signedMessage = await provider.getSigner().signMessage(msg);
          console.log(signedMessage);
          //login
          requestUrl = `${config.backendApiEntryPoint}login/`;
          request = await fetch(
            requestUrl,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({address: userAddress,signed_message:signedMessage})
            }
          );
          let requestJson = await request.json();
          console.log(requestJson.data.refresh);
          localStorage.setItem('token', requestJson.data.token);
          localStorage.setItem('tokenEndTimestamp', requestJson.data.expiration_timestamp);
          localStorage.setItem('refreshToken', requestJson.data.refresh);
          let checkStorageWrited = (localStorage.getItem('refreshToken')!=null);
          if (checkStorageWrited){
            const delay = (delayInms) => {
              return new Promise((resolve) => setTimeout(resolve, delayInms));
            };
            await delay(1000);
            location.reload();
          }          
        }else if (Date.parse(localStorage.getItem('tokenEndTimestamp'))<Date.now()){
          //gettoken with refesh-token
          let requestUrl = `${config.backendApiEntryPoint}token-refresh/`;
          let request = await fetch(
            requestUrl,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({refresh: localStorage.getItem('refreshToken')})
            }
          );
          requestJson = await request.json();
          //write info to localStorage
          localStorage.setItem('token', requestJson.access);
          localStorage.setItem('tokenEndTimestamp', (Date.now()/1000)+86400);
          localStorage.setItem('refreshToken', requestJson.refresh);

        }
        
        context.commit('setUserInfo',await provider.getSigner().getAddress());
        localStorage.setItem('connectedWallet','metamask');
        localStorage.setItem('userAddress',await provider.getSigner().getAddress());
        
        ethereum.on('accountsChanged', function () {
          // localStorage.clear();
          location.reload();
        })
      } catch (error){
        console.log(error);
        // localStorage.setItem('connectedWallet',null);
        // localStorage.setItem('userAddress',null);
        // localStorage.setItem('token',null);
        // localStorage.setItem('tokenEndTimestamp', null);
        // localStorage.setItem('refreshToken', null);
        // localStorage.setItem('nonce', null);
        localStorage.clear();
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
          [{ chainId: "0x5"}],
        );
        let userAddress = await web3Provider.getSigner().getAddress();
        if (localStorage.getItem('userAddress')!=userAddress){
          // localStorage.setItem('userAddress',null);
          // localStorage.setItem('token',null);
          // localStorage.setItem('tokenEndTimestamp',null);
          // localStorage.setItem('refreshToken',null);
          // localStorage.setItem('nonce',null);
          localStorage.clear();
        }
        if (localStorage.getItem('userAddress')==null || localStorage.getItem('userAddress')=='null'){
          //getNonce
          let requestUrl = `${config.backendApiEntryPoint}registration/`;
          let request = await fetch(
            requestUrl,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({address: userAddress})
            }
          );
          let nonce = (await request.json()).data.nonce;
          console.log(nonce);
          //SignMessage
          let msg = `${config.messageToSignStart}${nonce}`;
          let signedMessage = await web3Provider.getSigner().signMessage(msg);
          console.log(signedMessage);
          //login
          requestUrl = `${config.backendApiEntryPoint}login/`;
          request = await fetch(
            requestUrl,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({address: userAddress,signed_message:signedMessage})
            }
          );
          let requestJson = await request.json();
          console.log(requestJson.data.refresh);
          localStorage.setItem('token', requestJson.data.token);
          localStorage.setItem('tokenEndTimestamp', requestJson.data.expiration_timestamp);
          localStorage.setItem('refreshToken', requestJson.data.refresh);
          location.reload();
        }else if (Date.parse(localStorage.getItem('tokenEndTimestamp'))<Date.now()){
          //gettoken with refesh-token
          let requestUrl = `${config.backendApiEntryPoint}token-refresh/`;
          let request = await fetch(
            requestUrl,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({refresh: localStorage.getItem('refreshToken')})
            }
          );
          requestJson = await request.json();
          //write info to localStorage
          localStorage.setItem('token', requestJson.access);
          localStorage.setItem('tokenEndTimestamp', (Date.now()/1000)+86400);
          localStorage.setItem('refreshToken', requestJson.refresh);
        }
        context.commit('setUserInfo',await web3Provider.getSigner().getAddress());
        localStorage.setItem('connectedWallet','walletconnect');
        localStorage.setItem('userAddress',await web3Provider.getSigner().getAddress());
      } catch{
        // localStorage.setItem('connectedWallet',null);
        localStorage.clear();
        console.log('WalletConnect Connection Error');
      }
    },
    async signMessageWithGlobalProvider(context,message){
      let globalProvider = await context.getters.getGlobalProvider;
      let signer = await globalProvider.getSigner();
      let signed_message = await signer.signMessage(message);
      return signed_message;
    }
  },
};
