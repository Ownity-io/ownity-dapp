import { createStore } from "vuex";
import config from "@/config.json";
import store from "..";

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
        state.listingsResults.concat(_json.results);
        state.lastListingsResponse = _json;
    }
  },
  actions:{
    async fetchAndSetListingsInfo(context){
        let requestUrl = `${config.backendApiEntryPoint}listings/?limit=${config.listingsPerPage}`;
        console.log(requestUrl);
        let request = await fetch(requestUrl);
        let requestJson = await request.json();

        context.commit('setListingsInfo',requestJson);
    }
  }
};
