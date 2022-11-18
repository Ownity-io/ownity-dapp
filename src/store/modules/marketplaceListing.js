import config from "@/config.json";
import { ethers } from "ethers";
export default {
  namespaced: true,
  state() {
    return {
        item:null,
        isLiked:false
    };
  },
  getters:{
    getItem(state){
        return state.item;
    },
    getLike(state){
      return state.isLiked; 
    }
  },
  mutations:{
    setItem(state,_json){
        state.item = _json;
    },
    setLike(state,_like){
      state.isLiked = _like;
    }
  },
  actions:{
    async getAndSetItem(context,_tokenId){
        let requestUrl = `${config.backendApiEntryPoint}listing/${_tokenId}`;
        let request = await fetch(requestUrl);
        let requestJson = await request.json();
        context.commit('setItem',requestJson);
    },
    async getRecomendations(context,_collection_contract_address){
      let requestUrl = `${config.backendApiEntryPoint}listings/?limit=5&marketplace_status=OPEN&collection=${_collection_contract_address}`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      return requestJson.results;
    },
    async checkLike(context){
      if (localStorage.getItem("token") != null & localStorage.getItem("token") != 'null') {
        let requestLink = `${config.backendApiEntryPoint}is-favorite/?lot=${context.getters.getItem.id}`;
        let requestOptions = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        let request = await fetch(requestLink, requestOptions);
        if (request.ok){
        let requestJson = await request.json();
        context.commit("setLike", requestJson.data.favorite);}
      }
      else{
        context.commit("setLike", false);
      }
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
    }
  }
};
