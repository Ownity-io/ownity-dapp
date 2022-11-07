import { createStore } from "vuex";
import config from "@/config.json";

export default {
  namespaced: true,
  state() {
    return {
      nextListingLink: null,
      prevListingLink: null,
      listingsResults: [],
      lastListingsResponse:null,
    };
  },
  getters: {
    getNextListingLink(state) {
      return state.nextListingLink;
    },
    getPrevListingLink(state) {
      return state.prevListingLink;
    },
    getListingsResults(state) {
      return state.listingsResults;
    },
    getLastListingsResponse(state) {
        return state.lastListingsResponse;
      },
  },
  mutations:{
    setListingsInfo(state,_json){
        state.nextListingLink = _json.next;
        state.prevListingLink = _json.previous;
        state.listingsResults=_json.results;
        state.lastListingsResponse = _json;
    }
  },
  actions:{
    async fetchAndSetListingsStartInfo(context){
        let requestUrl = `${config.backendApiEntryPoint}listings/?limit=${config.listingsPerPage}`;
        let request = await fetch(requestUrl);
        let requestJson = await request.json();

        context.commit('setListingsInfo',requestJson);
    }
  }
};
