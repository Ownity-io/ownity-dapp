<template>
    <div class="search">
        <div class="input-wrapper search-wrapper">
            <i class="i-search-line"></i>
            <input type="text" v-model="searchHeader" :placeholder="translatesGet('SEARCH_PLACEHOLDER')" v-debounce:500ms="doSearch" v-if="isHeader == true">
            <input type="text" v-model="search" :placeholder="translatesGet('SEARCH_PLACEHOLDER')" v-debounce:500ms="doSearch" v-else-if="isHeader != true">            
        </div>
        <div class="search-results" :class="{'unfolded' : searchHeader != ''}" v-if="this.searchHeader.length>=2 & this.isHeader">
            <div class="search-results-wrapper" @scroll="handleScroll">
                <ul v-if="collections.length>0">
                    <li v-for="collection in collections">
                        <a class="results-icon" :style="{backgroundImage:`url(${collection.logo})`}"  :href="'/collection/'+collection.contract_address"></a>
                        <a class="results-data"  :href="'/collection/'+collection.contract_address">
                            <div class="name">{{collection.name}}</div>
                        </a>
                    </li>
                </ul>
                <ul v-if="listings.length>0">
                    <li v-for="listing in listings">
                        <a class="results-icon" :style="{backgroundImage:`url(${listing.media})`}" :href="'/listing/'+listing.collection.contract_address+'/'+listing.token_id+'&'+listing.id"></a>
                        <a class="results-data" :href="'/listing/'+listing.collection.contract_address+'/'+listing.token_id+'&'+listing.id">
                            <div class="name" v-if="listing.name">{{listing.name}}</div>
                            <div class="name" v-else>#{{listing.token_id}}</div>
                            <div>{{listing.collection.name}}</div>
                        </a>
                    </li>
                </ul>
                <div class="empty-list" v-if="!(collections.length>0||listings.length>0)">
                    {{translatesGet('NOTHING_FOUND')}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MultiLang from "@/core/multilang";
import config from "@/config.json";
import { vue3Debounce } from 'vue-debounce';
export default {
    data() {
        return {
            testBg: '',
            testOpenSearch: false,
            lang: new MultiLang(this),
            config:config,
            collections:[],
            listings:[],
            showNothingFound:false,
            listingsNextLink:null,
            searchHeader:'',
            timeToSearch:200
        }
    },
    methods:{
        translatesGet(key) {
            return this.lang.get(key);
        },
        async doSearch(){
            if (this.searchHeader.length>=2){
                if (this.isHeader){
                    let collectionsRequestUrl = `${config.backendApiEntryPoint}nft-collections/?limit=10&search=${this.searchHeader}`
                    let listingsRequestUrl = `${config.backendApiEntryPoint}listings/?limit=10&search=${this.searchHeader}`;

                    let collectionsRequest = await fetch(collectionsRequestUrl);
                    let listingsRequest = await fetch(listingsRequestUrl);

                    let listingsJson = await listingsRequest.json();

                    this.collections = (await collectionsRequest.json()).results;
                    this.listings = listingsJson.results;
                    this.listingsNextLink = listingsJson.next;
                }
                else if(this.$route.name=='Marketplace'){                    
                    this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
                }
                else if(this.$route.name=='Collection'){             
                    this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address);
                }                
            }
            else{
                if (this.isHeader){
                    this.collections = [];
                    this.listings = [];                
                }
                else if(this.$route.name=='Marketplace'){
                    this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
                }
                else if(this.$route.name=='Collection'){
                    this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address);
                }
                
            }            
        },
        async loadNext(){
            if(this.listingsNextLink){
                let listingsRequest = await fetch(this.listingsNextLink);
                let requestJson = await listingsRequest.json();
                this.listings = this.listings.concat(requestJson.results);
                this.listingsNextLink = requestJson.next;
                
            }
        },
        handleScroll: async function (el) {
            if ((el.srcElement.offsetHeight + el.srcElement.scrollTop) >= el.srcElement.scrollHeight) {
                await this.loadNext();
                console.log('bottom');
            }
        }
    },
    props:['isHeader'],
    computed:{
        search:{
            get(){
                return this.$store.getters['marketplace/getSearchString'];
            },
            set(value){
                this.$store.dispatch('marketplace/setSearchString', value);
            }
        }
    },
    directives: {
    debounce: vue3Debounce({ lock: true })
  }
}
</script>

<style >
.search-results-wrapper .empty-list{
    padding: 60px 16px; 
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
}
</style>