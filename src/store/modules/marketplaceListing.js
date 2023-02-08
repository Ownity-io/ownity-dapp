import config from "@/config.json";
import { ethers } from "ethers";
export default {
  namespaced: true,
  state() {
    return {
        item:null,
        isLiked:false,
        likeChecked:false,
        contractConfig:null,
        modalToShowAtStart:null
    };
  },
  getters:{
    getItem(state){
        return state.item;
    },
    getLike(state){
      return state.isLiked; 
    },
    getChecked(state){
      return state.likeChecked; 
    },
    getContractConfig(state){
      return state.contractConfig;
    },
    getModalToShowAtStart(state){
      return state.modalToShowAtStart;
    }
  },
  mutations:{
    setItem(state,_json){
        state.item = _json;
    },
    setLike(state,_like){
      state.isLiked = _like;
    },
    setChecked(state, _checked){
      state.likeChecked = _checked;
    },
    setContractConfig(state,_value){
      state.contractConfig = _value;
    },
    setModalToShowAtStart(state,_value){
      state.modalToShowAtStart = _value;
    }
  },
  actions:{
    async getAndSetItem(context,_tokenId){
        let requestUrl = `${config.backendApiEntryPoint}listing/${_tokenId}`;

        let data = localStorage.getItem("token") ? {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        } : {}

        let request = await fetch(requestUrl, data);
        let requestJson = await request.json();
        context.commit('setItem',requestJson);
    },
    async getRecomendations(context,_collection_contract_address){
      let requestUrl = `${config.backendApiEntryPoint}listings/?limit=5&marketplace_status=OPEN&collection=${_collection_contract_address}&currency=0x0000000000000000000000000000000000000000`;

      let data = localStorage.getItem("token") ? {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      } : {}

      let request = await fetch(requestUrl, data);
      let requestJson = await request.json();
      return requestJson.results;
    },
    async changeLike(context){
      if (localStorage.getItem("token") != null) {
        let requestLink = `${config.backendApiEntryPoint}favorite/`;
        let requestOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            'lot': context.getters.getItem.id,
            'favorite': !context.getters.getLike,
          }), 
        };
        let request = await fetch(requestLink, requestOptions);
        let requestJson = await request.json();
        context.commit("setLike", !context.getters.getLike);
          
      }else{
        context.commit('appGlobal/setShowConnectWalletModal',true,{root:true});
        context.commit("setLike", false);
      }
    },
    async fetchAndSetContractConfig(context){
      let item = context.getters.getItem;
      let requestUrl = `${config.backendApiEntryPoint}contract-config/?blockchain=${item.collection.blockchain}`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      context.commit('setContractConfig',requestJson);
    },
    setModalToShowAtStart(context,_value){
      context.commit('setModalToShowAtStart',_value);
    }
  }
};
