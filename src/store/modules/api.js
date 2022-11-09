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
      //selectedFilters
      currentMarketplaceId: null,
      currentStatus:null,
      currentCollectionContractAddress:null,
      currentMinPrice:null,
      currentMaxPrice:null,
      currentMarketplace:null,
      currentCollection:null
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
    //selectedFilters
    getCurrentMarketplaceId(state) {
      return state.currentMarketplaceId;
    },
    getCurrentStatus(state) {
      return state.currentStatus;
    },
    getCurrentCollectionContractAddress(state) {
      return state.currentCollectionContractAddress;
    },
  },
  mutations: {
    //listings
    setListingsInfo(state, _json) {
      state.nextListingLink = _json.next;
      state.prevListingLink = _json.previous;
      state.listingsResults = _json.results;
      state.lastListingsResponse = _json;
    },
    addListingsInfo(state, _json) {
      if (_json!=null){
        state.nextListingLink = _json.next;
        state.prevListingLink = _json.previous;
        state.listingsResults = state.listingsResults.concat(_json.results);        
      }
      state.lastListingsResponse = _json;
    },
    //forFilters
    setNftCollections(state, _json) {
      state.nftCollections = _json;
    },
    setMarketplaces(state, _json) {
      state.marketplaces = _json;
    },
    //selectedFilters
    setCurrentMarketplaceId(state,_marketplaceId) {
      state.currentMarketplaceId = _marketplaceId;
    },
    setCurrentStatus(state,_status) {
      state.currentStatus=_status;
    },
    setCurrentCollectionContractAddress(state,_collectionContractAddress) {
      state.currentCollectionContractAddress = _collectionContractAddress;
    },
  },
  actions: {
    //listings
    async fetchAndSetListingsStartInfo(context) {
      let requestUrl = `${config.backendApiEntryPoint}listings/?limit=${config.listingsPerPage}`;
      if (context.getters.getCurrentCollectionContractAddress != null) {
        requestUrl += `&collection=${context.getters.getCurrentCollectionContractAddress}`;
      }
      if (context.getters.getCurrentMarketplaceId != null) {
        requestUrl += `&marketplace=${context.getters.getCurrentMarketplaceId}`;
      }
      if (context.getters.getCurrentStatus != null) {
        requestUrl += `&status=${context.getters.getCurrentStatus}`;
      }

      let request = await fetch(requestUrl);
      let requestCode =  request.ok;
      if (requestCode){
        let requestJson = await request.json();
        context.commit("setListingsInfo", requestJson);
      }
      else{
        context.commit("setListingsInfo", null);
      }      
    },
    async fetchAndSetListingsNextInfo(context) {
      let requestUrl = context.getters.getNextListingLink;
      if (requestUrl != null) {
        let request = await fetch(requestUrl);
        let requestCode = request.ok;
        if (requestCode) {
          let requestJson = await request.json();
          context.commit("addListingsInfo", requestJson);
        } else {
          context.commit("addListingsInfo", null);
        }
      }
      else{
        context.commit("addListingsInfo", null);
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
    //selectedFilters
    async getAndSetCurrentMarketplaceId(context,_marketplaceId){
      context.commit('setCurrentMarketplaceId',_marketplaceId);
    },
    async getAndSetCurrentStatus(context,_status){
      context.commit('setCurrentStatus',_status);
    },
    async getAndSetCurrentCollectionContractAddress(context,_collectionContractAddress){
      context.commit('setCurrentCollectionContractAddress',_collectionContractAddress);
    },
  },
};
