import config from "@/config.json";
import { ethers } from "ethers";
export default {
  namespaced: true,
  state() {
    return {
        item:null
    };
  },
  getters:{
    getItem(state){
        return state.item;
    }
  },
  mutations:{
    setItem(state,_json){
        state.item = _json;
    }
  },
  actions:{
    async getAndSetItem(context,_tokenId){
        let requestUrl = `${config.backendApiEntryPoint}listing/${_tokenId}`;
        let request = await fetch(requestUrl);
        let requestJson = await request.json();
        context.commit('setItem',requestJson);
    }
  }
};
