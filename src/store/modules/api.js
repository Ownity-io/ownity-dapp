import { createStore } from "vuex";
import config from "@/config.json";

export default {
  namespaced: true,
  state() {
    return {
      //listings
      nextListingLink: null,
      prevListingLink: null,
      listingsResults: [],
      lastListingsResponse: null,
      //forFilters
      marketplaces: null,
      statuses: ["CLOSED", "OPEN"],
      nftCollections: null,
    };
  },
  getters: {
    //listings
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
    //for filters
    getMarketplaces(state) {
      return state.marketplaces;
    },
    getNftCollections(state) {
      return state.nftCollections;
    },
    getStatuses(state) {
      return state.statuses;
    },
  },
  mutations: {
    //listings
    setListingsInfo(state, _json) {
      state.nextListingLink = _json.next;
      state.prevListingLink = _json.previous;
      state.listingsResults = state.listingsResults.concat(_json.results);
      state.lastListingsResponse = _json;
    },
    //forFilters
    setNftCollections(state, _json) {
      state.nftCollections = _json;
    },
    setMarketplaces(state, _json) {
      state.marketplaces = _json;
    },
  },
  actions: {
    //listings
    async fetchAndSetListingsStartInfo(context) {
      let requestUrl = `${config.backendApiEntryPoint}listings/?limit=${config.listingsPerPage}`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      let requestCode =  request.ok;
      if (requestCode){
        context.commit("setListingsInfo", requestJson);
      }
      else{
        context.commit("setListingsInfo", null);
      }      
    },
    async fetchAndSetListingsNextInfo(context) {
      let requestUrl = context.getters.getNextListingLink;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      let requestCode =  request.ok;
      if (requestCode){
        context.commit("setListingsInfo", requestJson);
      }
      else{
        context.commit("setListingsInfo", null);
      }     
    },
    //forFilters
    async fetchAndSetNftCollections(context) {
      let requestUrl = `${config.backendApiEntryPoint}nft-collections/`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      context.commit("setNftCollections", requestJson);
    },
    async fetchAndSetMarketplaces(context) {
      let requestUrl = `${config.backendApiEntryPoint}marketplaces/`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      context.commit("setMarketplaces", requestJson);
    },
  },
};
