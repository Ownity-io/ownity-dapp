import config from "@/config.json";
import { ethers } from "ethers";
export default {
  namespaced: true,
  state() {
    return {
      nextSharesLink: null,
      prevSharesLink: null,
      sharesResults: [],
      lastSharesResponse: null,
      //listings
      nextListingLink: null,
      prevListingLink: null,
      listingsResults: [],
      lastListingsResponse: null,
      //forFilters
      marketplaces: null,
      nftCollections: null,
      //selectedFilters
      currentMarketplaceId: null,
      currentCollectionContractAddress: null,
      currentMinPrice: null,
      currentMaxPrice: null,
      currentMarketplace: null,
      currentlyGatehring:false,
      currentBidStatus:null,
      selectedSort:null,
      onSale:false,
      searchString:'',
      activitiesResults:[],
      nextActivitiesLink:null,
      lastActivitiesResponse:null,
      currentActivitiesCategory:null,
      activitiesByUser:false,

      saleStatusFilter: null
    };
  },
  getters: {
    getSaleStatusFilter(state) {
      return state.saleStatusFilter
    },
    getNextSharesLink(state) {
      return state.nextSharesLink;
    },
    getPrevSharesLink(state) {
      return state.prevSharesLink;
    },
    getSharesResults(state) {
      return state.sharesResults;
    },
    getLastSharesResponse(state) {
      return state.lastSharesResponse;
    },
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
    //selectedFilters
    getCurrentMarketplaceId(state) {
      return state.currentMarketplaceId;
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
            console.log(item);
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
      if (state.currentMinPrice!=null){count++;}
      if (state.currentMaxPrice!=null){count++;}
      if (state.currentlyGatehring!=false){count++;}
      if (state.currentBidStatus!=null){count++;}
      if (state.onSale!=false){count++;}
      if (state.searchString!=''){count++;}
      if (state.currentActivitiesCategory){count++;}
      if (state.saleStatusFilter){count++;}
      return count;
    },
    getCurrentlyGathering(state){
      return state.currentlyGatehring;
    },
    getCurrentBidStatus(state){
      return state.currentBidStatus;
    },
    getSelectedSort(state){
      return state.selectedSort;
    },
    getOnSale(state){
      return state.onSale;
    },
    getSearchString(state){
      return state.searchString;
    },
    getActivitiesResult(state){
      return state.activitiesResults;
    },
    getLastActivitiesResponse(state){
      return state.lastActivitiesResponse;
    },
    getNextActivitiesLink(state){
      return state.nextActivitiesLink;
    },
    getCurrentActivitiesCategory(state){
      return state.currentActivitiesCategory;
    },
    getActivitiesByUser(state){
      return state.activitiesByUser;
    }
  },
  mutations: {
    setSaleStatusFilter(state, data ){
      state.saleStatusFilter = data.data
    },
    setSharesSale(state, _json){
      if (_json!=null){
        state.nextSharesLink = _json.next;
        state.prevSharesLink = _json.previous;
        state.sharesResults = _json.results;
      }
      else{
        state.nextSharesLink = null;
        state.prevSharesLink = null;
        state.sharesResults = [];
      }

      state.lastSharesResponse = _json;
    },
    //listings
    setListingsInfo(state, _json) {
      if (_json!=null){
        state.nextListingLink = _json.next;
        state.prevListingLink = _json.previous;
        state.listingsResults = _json.results;
      }
      else{
        state.nextListingLink = null;
      state.prevListingLink = null;
      state.listingsResults = [];
      }
      
      state.lastListingsResponse = _json;
    },
    addSharesInfo(state, _json) {
      if (_json != null) {
        state.nextSharesLink = _json.next;
        state.prevSharesLink = _json.previous;
        state.sharesResults = state.sharesResults.concat(_json.results);
      }
      state.lastSharesResponse = _json;
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
    setCurrentCollectionContractAddress(state, _collectionContractAddress) {
      state.currentCollectionContractAddress = _collectionContractAddress;
    },
    setCurrentlyGathering(state,value){
      state.currentlyGatehring = value;
    },
    setCurrentBidStatus(state,value){
      state.currentBidStatus = value;
    },
    setSelectedSort(state,value){
      state.selectedSort = value;
    },
    setOnSale(state,value){
      state.onSale = value;
    },
    setSearchString(state,value){
      state.searchString = value;
    },
    setActivitiesResult(state,_json){
      if (_json != null) {
        if (_json.next) {
          state.nextActivitiesLink = _json.next;
        }
        if (_json.results){
          state.activitiesResults = _json.results;
        }
        else{
          state.activitiesResults = _json;
        }        
      } else {
        state.nextActivitiesLink = null;
        state.activitiesResults = [];
      }      
      state.lastActivitiesResponse = _json;
    },
    addActivitiesResult(state,_json){
      if (_json != null) {
        state.nextActivitiesLink = _json.next;
        state.activitiesResults = state.activitiesResults.concat(_json.results);
      }
      state.lastActivitiesResponse = _json;
    },
    setCurrentActivitiesCategory(state,value){
      state.currentActivitiesCategory = value;
    },
    setActivitiesByUser(state,value){
      state.activitiesByUser = value;
    }
  },
  actions: {
    async fetchSharesSale(context, _collectionContractAddress = null, isFirst){
      try {
        let requestUrl = `${config.backendApiEntryPoint}listings/?limit=${config.listingsPerPage}&bid_status=ON%20SALE&internal_statuses=OWNED&internal_statuses=ON%20SALE`

        if (_collectionContractAddress==null){
          if (context.getters.getCurrentCollectionContractAddress != null) {
            requestUrl += `&collection=${context.getters.getCurrentCollectionContractAddress}`;
          }
        }
        else{
          requestUrl += `&collection=${_collectionContractAddress}`;
        }

        if (context.getters.getCurrentMarketplaceId != null) {
          requestUrl += `&marketplace=${context.getters.getCurrentMarketplaceId}`;
        }
        if (context.getters.getCurrentMinPrice!=null){
          requestUrl += `&min_share_price=${ethers.utils.parseEther(String(context.getters.getCurrentMinPrice)).toString()}`;
        }
        if (context.getters.getCurrentMaxPrice!=null){
          requestUrl += `&max_share_price=${ethers.utils.parseEther(String(context.getters.getCurrentMaxPrice)).toString()}`;
        }
        if (context.getters.getSelectedSort!=null){
          requestUrl+=`&ordering=${context.getters.getSelectedSort.codeName}`;
        }
        if(isFirst && !requestUrl.includes('&ordering')){
          requestUrl+='&ordering=-timestamp'
        }

        if (context.getters.getCurrentlyGathering){
          requestUrl+='&internal_status=GATHER';
        }
        if (context.getters.getSearchString!=''){
          requestUrl+=`&search=${context.getters.getSearchString}`;
        }
        // requestUrl+='&marketplace_status=OPEN';

        let request = await fetch(requestUrl);
        let requestCode = request.ok;
        if (requestCode) {
          let requestJson = await request.json();
          context.commit("setSharesSale", requestJson);
        } else {
          context.commit("setSharesSale", null);
        }
      } catch (e){
        console.log(e.message)
      }
    },
    //listings
    async fetchAndSetListingsStartInfo(context,_collectionContractAddress = null,isFirst) {
      let requestUrl = `${config.backendApiEntryPoint}listings/?limit=${config.listingsPerPage}&currency=0x0000000000000000000000000000000000000000`;
      if (_collectionContractAddress==null){
        if (context.getters.getCurrentCollectionContractAddress != null) {
          requestUrl += `&collection=${context.getters.getCurrentCollectionContractAddress}`;
        }
      }
      else{
        requestUrl += `&collection=${_collectionContractAddress}`;
      }
      
      if (context.getters.getCurrentMarketplaceId != null) {
        requestUrl += `&marketplace=${context.getters.getCurrentMarketplaceId}`;
      }
      if (context.getters.getCurrentMinPrice!=null){
        requestUrl += `&price_gt=${ethers.utils.parseEther(String(context.getters.getCurrentMinPrice)).toString()}`;
      }
      if (context.getters.getCurrentMaxPrice!=null){
        requestUrl += `&price_lt=${ethers.utils.parseEther(String(context.getters.getCurrentMaxPrice)).toString()}`;
      }
      if (context.getters.getSelectedSort!=null){
        requestUrl+=`&ordering=${context.getters.getSelectedSort.codeName}`;
      }
      if(isFirst && !requestUrl.includes('&ordering')){
        requestUrl+='&ordering=-timestamp'
      }
  
      if (context.getters.getCurrentlyGathering){
        requestUrl+='&internal_status=GATHER';
      }
      if (context.getters.getSearchString!=''){
        requestUrl+=`&search=${context.getters.getSearchString}`;
        requestUrl+="&internal_statuses=GATHER";
        requestUrl+="&internal_statuses=ON%20SALE";
        requestUrl+="&internal_statuses=OPEN";
        requestUrl+="&internal_statuses=OWNED";
      }
      requestUrl+='&marketplace_status=OPEN';
      console.log(requestUrl)
      let request = await fetch(requestUrl);
      let requestCode = request.ok;
      if (requestCode) {
        let requestJson = await request.json();
        context.commit("setListingsInfo", requestJson);
        return true
      } else {
        context.commit("setListingsInfo", null);
        return false
      }
    },
    async fetchAndSetSharesNextInfo(context) {
      let requestUrl = context.getters.getNextSharesLink;
      if (requestUrl !== null) {
        let request = await fetch(requestUrl);

        let requestCode = request.ok;
        if (requestCode) {
          let requestJson = await request.json();
          context.commit("addSharesInfo", requestJson);
        } else {
          context.commit("addSharesInfo", null);
        }
      } else {
        context.commit("addSharesInfo", null);
      }
    },
    async fetchAndSetListingsNextInfo(context) {
      let requestUrl = context.getters.getNextListingLink;
      let requestOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      if (requestUrl != null) {
        let request = null;
        if (localStorage.getItem('token')!=null&localStorage.getItem('token')!='null'){
          request = await fetch(requestUrl,requestOptions);
        }
        else{
          request = await fetch(requestUrl);
        }
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
      context.commit("setCurrentCollectionContractAddress",null);
      context.commit("setCurrentMinPrice", null);
      context.commit("setCurrentMaxPrice", null);
      context.commit("setCurrentlyGathering",false);
      context.commit("setCurrentBidStatus",null);
      context.commit("setOnSale",false);
      context.commit("setSearchString",'');
      context.commit("setCurrentActivitiesCategory",null)
      context.commit("setSelectedSort",null)
      context.commit("setSaleStatusFilter", {data: null})
    },
    async setCurrentlyGathering(context,value){
      context.commit("setCurrentlyGathering", value);
    },
    async fetchAndSetListingsStartInfoByUser(context, isFirst) {
      let requestUrl = `${config.backendApiEntryPoint}listings-by-user/?limit=${config.listingsPerPage}&currency=0x0000000000000000000000000000000000000000`;
      if (context.getters.getCurrentCollectionContractAddress != null) {
          requestUrl += `&collection=${context.getters.getCurrentCollectionContractAddress}`;
        }
      
      if (context.getters.getCurrentMarketplaceId != null) {
        requestUrl += `&marketplace=${context.getters.getCurrentMarketplaceId}`;
      }
      if (context.getters.getCurrentMinPrice!=null){
        requestUrl += `&price_gt=${ethers.utils.parseEther(String(context.getters.getCurrentMinPrice)).toString()}`;
      }
      if (context.getters.getCurrentMaxPrice!=null){
        requestUrl += `&price_lt=${ethers.utils.parseEther(String(context.getters.getCurrentMaxPrice)).toString()}`;
      }
      if (context.getters.getCurrentlyGathering){
        requestUrl += `&internal_status=GATHER`;
      }
    
      if (context.getters.getCurrentBidStatus!=null & context.getters.getCurrentBidStatus!=false){
        requestUrl += `&bid_status=${context.getters.getCurrentBidStatus}`;
      }
      if (context.getters.getSelectedSort!=null){
        requestUrl+=`&ordering=${context.getters.getSelectedSort.codeName}`;
      }

      if(isFirst && !requestUrl.includes('&ordering')){
        requestUrl+='&ordering=-timestamp'
      }

      //? saleStatus
      if (context.getters.getSaleStatusFilter){
        requestUrl+=`${context.getters.getSaleStatusFilter.value}`;
      }

      let requestOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      };
      let request = await fetch(requestUrl,requestOptions);
      let requestCode = request.ok;
      if (requestCode) {
        let requestJson = await request.json();
        context.commit("setListingsInfo", requestJson);
      } else {
        context.commit("setListingsInfo", null);
      }
    },
    setCurrentBidStatus(context,value){
      context.commit("setCurrentBidStatus", value);
    },
    async fetchAndSetListingsStartInfoByUserFav(context, isFirst) {
      let requestUrl = `${config.backendApiEntryPoint}favorite-listings-by-user/?limit=${config.listingsPerPage}`;
      if (context.getters.getCurrentCollectionContractAddress != null) {
          requestUrl += `&collection=${context.getters.getCurrentCollectionContractAddress}`;
        }
      
      if (context.getters.getCurrentMarketplaceId != null) {
        requestUrl += `&marketplace=${context.getters.getCurrentMarketplaceId}`;
      }
      if (context.getters.getCurrentMinPrice!=null){
        requestUrl += `&price_gt=${ethers.utils.parseEther(String(context.getters.getCurrentMinPrice)).toString()}`;
      }
      if (context.getters.getCurrentMaxPrice!=null){
        requestUrl += `&price_lt=${ethers.utils.parseEther(String(context.getters.getCurrentMaxPrice)).toString()}`;
      }
      if (context.getters.getCurrentlyGathering){
        requestUrl += `&internal_status=GATHER`;
      }
      if (context.getters.getSelectedSort!=null){
        requestUrl+=`&ordering=${context.getters.getSelectedSort.codeName}`;
      }

      if(isFirst && !requestUrl.includes('&ordering')){
        requestUrl+='&ordering=-timestamp'
      }

      //? saleStatus
      if (context.getters.getSaleStatusFilter){
        requestUrl+=`${context.getters.getSaleStatusFilter.value}`;
      }


      console.log(requestUrl)
      let requestOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      };
      let request = await fetch(requestUrl,requestOptions);
      let requestCode = request.ok;
      if (requestCode) {
        let requestJson = await request.json();
        context.commit("setListingsInfo", requestJson);
      } else {
        context.commit("setListingsInfo", null);
      }
    },
    async clearListingsInfo(context){
      console.log('clear');
      context.commit("setListingsInfo", null);
    },
    async fetchAndSetListingsStartInfoByUserVote(context, isFirst) {
      let requestUrl = `${config.backendApiEntryPoint}listings-with-voting-by-user/?limit=${config.listingsPerPage}&currency=0x0000000000000000000000000000000000000000`;
      if (context.getters.getCurrentCollectionContractAddress != null) {
          requestUrl += `&collection=${context.getters.getCurrentCollectionContractAddress}`;
        }
      
      if (context.getters.getCurrentMarketplaceId != null) {
        requestUrl += `&marketplace=${context.getters.getCurrentMarketplaceId}`;
      }
      if (context.getters.getCurrentMinPrice!=null){
        requestUrl += `&price_gt=${ethers.utils.parseEther(String(context.getters.getCurrentMinPrice)).toString()}`;
      }
      if (context.getters.getCurrentMaxPrice!=null){
        requestUrl += `&price_lt=${ethers.utils.parseEther(String(context.getters.getCurrentMaxPrice)).toString()}`;
      }
      console.log(context.getters.getOnSale);
      if (context.getters.getOnSale){
        requestUrl += `&internal_status=ON SALE`;
      }
      if (context.getters.getSelectedSort!=null){
        requestUrl+=`&ordering=${context.getters.getSelectedSort.codeName}`;
      }

      if(isFirst && !requestUrl.includes('&ordering')){
        requestUrl+='&ordering=-timestamp'
      }

      console.log(requestUrl)
      let requestOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      };
      let request = await fetch(requestUrl,requestOptions);
      let requestCode = request.ok;
      if (requestCode) {
        let requestJson = await request.json();
        context.commit("setListingsInfo", requestJson);
      } else {
        context.commit("setListingsInfo", null);
      }
    },
    setSelectedSort(context,value){
      context.commit("setSelectedSort", value);
    },
    setOnSale(context,value){
      context.commit('setOnSale',value);
    },
    setSearchString(context,value){
      context.commit('setSearchString',value);
    },
    async fetchAndSetActivitiesResult(context, params = {}){
      console.log(params.userAddress);
      console.log(params.collectionAddress);
      context.commit("setActivitiesResult", null);
      let requestUrl = null;
      if (params.lotId){
        requestUrl=`${config.backendApiEntryPoint}user-activity/?lot=${params.lotId}`;
      }
      else{
        requestUrl = `${config.backendApiEntryPoint}user-activity/?limit=${config.activitiesPerPage}`;
      }
      if (context.getters.getCurrentActivitiesCategory){
        requestUrl+=`&part=${context.getters.getCurrentActivitiesCategory}`
      }
      if (params.collectionAddress){
        requestUrl+=`&collection=${params.collectionAddress}`
      }
      
      if (context.getters.getCurrentCollectionContractAddress){
        requestUrl+=`&collection=${context.getters.getCurrentCollectionContractAddress}`
      }
      if (context.getters.getSelectedSort){
        requestUrl+=`&ordering=${context.getters.getSelectedSort.codeName}`
      }

      if(params.isFirst && !requestUrl.includes('&ordering')){
        requestUrl+='&ordering=-timestamp'
      }
      console.log(requestUrl)
      let request = null;
      if (params.userAddress){
        context.commit('setActivitiesByUser',true);
        request = await fetch(requestUrl,
          {
            method: "GET",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
          });
      }
      else{
        context.commit('setActivitiesByUser',false);
        request = await fetch(requestUrl);
      }      
      let requestCode = request.ok;
      if (requestCode) {
        let requestJson = await request.json();
        context.commit("setActivitiesResult", requestJson);
      } else {
        context.commit("setActivitiesResult", null);
      }
    },
    async fetchAndSetNextActivitiesResult(context){
      let requestUrl = context.getters.getNextActivitiesLink;
      if (requestUrl != null) {
        let request = null;
        if (context.getters.getActivitiesByUser){
          request = await fetch(requestUrl,{
            method: "GET",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
          });
        }
        else{
          request = await fetch(requestUrl);
        }
        
        let requestCode = request.ok;
        if (requestCode) {
          let requestJson = await request.json();
          context.commit("addActivitiesResult", requestJson);
        } else {
          context.commit("addActivitiesResult", null);
        }
      } else {
        context.commit("addActivitiesResult", null);
      }
    },
    async getAndSetCurrentActivitiesCategory(context,value){
      context.commit("setCurrentActivitiesCategory", value);
    }
  },
};
