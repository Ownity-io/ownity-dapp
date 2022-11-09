import { createStore } from "vuex";
import config from "@/config.json";
import { ethers } from "ethers";
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
      currentStatus: null,
      currentCollectionContractAddress: null,
      currentMinPrice: null,
      currentMaxPrice: null,
      currentMarketplace: null,
      currentCollection: null,
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
    getCurrentNftCollection(state, getters) {
      let collections = state.nftCollections;
      let address = state.currentCollectionContractAddress;
      if (collections != null) {
        for (let item of collections) {
          if (item.contract_address == address) {
            return item;
          }
        }
      }
    },
    getCurrentMarketplace(state, getters) {
      let collections = state.marketplaces;
      let id = state.currentMarketplaceId;
      if (collections != null) {
        for (let item of collections) {
          if (item.id == id) {
            return item;
          }
        }
      }
    },
    getCurrentMinPrice(state){
      return state.currentMinPrice;
    },    
    getCurrentMaxPrice(state){
      return state.currentMaxPrice;
    },
    getFiltersCount(state){
      let count = 0;
      if (state.currentMarketplaceId!=null){count++;}
      if (state.currentCollectionContractAddress!=null){count++;}
      if (state.currentStatus!=null){count++;}
      if (state.currentMinPrice!=null){count++;}
      if (state.currentMaxPrice!=null){count++;}
      return count;
    }
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
      if (_json != null) {
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
    setCurrentMinPrice(state, _price){
      state.currentMinPrice = _price;
    },
    setCurrentMaxPrice(state, _price){
      state.currentMaxPrice = _price;
    },
    //selectedFilters
    setCurrentMarketplaceId(state, _marketplaceId) {
      state.currentMarketplaceId = _marketplaceId;
    },
    setCurrentStatus(state, _status) {
      state.currentStatus = _status;
    },
    setCurrentCollectionContractAddress(state, _collectionContractAddress) {
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
      if (context.getters.getCurrentMinPrice!=null){
        requestUrl += `&price_gt=${ethers.utils.parseEther(String(context.getters.getCurrentMinPrice)).toString()}`;
      }
      if (context.getters.getCurrentMaxPrice!=null){
        requestUrl += `&price_lt=${ethers.utils.parseEther(String(context.getters.getCurrentMaxPrice)).toString()}`;
      }
      let request = await fetch(requestUrl);
      let requestCode = request.ok;
      if (requestCode) {
        let requestJson = await request.json();
        context.commit("setListingsInfo", requestJson);
      } else {
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
      } else {
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
    async getAndSetCurrentMarketplaceId(context, _marketplaceId) {
      context.commit("setCurrentMarketplaceId", _marketplaceId);
    },
    async getAndSetCurrentStatus(context, _status) {
      context.commit("setCurrentStatus", _status);
    },
    async getAndSetCurrentCollectionContractAddress(context,_collectionContractAddress) {
      context.commit("setCurrentCollectionContractAddress",_collectionContractAddress);
    },
    async getAndSetCurrentMinPrice(context,_price) {
      context.commit("setCurrentMinPrice",_price);
    },
    async getAndSetCurrentMaxPrice(context,_price) {
      context.commit("setCurrentMaxPrice",_price);
    },
    async setAllFiltersToNull(context){
      context.commit("setCurrentMarketplaceId", null);
      context.commit("setCurrentStatus", null);
      context.commit("setCurrentCollectionContractAddress",null);
      context.commit("setCurrentMinPrice", null);
      context.commit("setCurrentMaxPrice", null);
    }

  },
};
