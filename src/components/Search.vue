<template>
    <div class="search">
        <div class="input-wrapper search-wrapper">
            <i class="i-search-line"></i>
            <input type="text" v-model="search" placeholder="Search NFT, collections, id" @input="doSearch">
        </div>
        <div class="search-results" :class="{'unfolded' : search != ''}" v-if="this.search.length>=2">
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
export default {
    data() {
        return {
            testBg: '',
            testOpenSearch: false,
            search: '',
            lang: new MultiLang(this),
            config:config,
            collections:[],
            listings:[],
            showNothingFound:false,
            listingsNextLink:null
        }
    },
    methods:{
        translatesGet(key) {
            return this.lang.get(key);
        },
        async doSearch(){
            console.log(this.listingsNextLink);
            if (this.search.length>=2){
                if (this.isHeader){
                    let collectionsRequestUrl = `${config.backendApiEntryPoint}nft-collections/?limit=10&search=${this.search}`
                    let listingsRequestUrl = `${config.backendApiEntryPoint}listings/?limit=10&search=${this.search}`;

                    let collectionsRequest = await fetch(collectionsRequestUrl);
                    let listingsRequest = await fetch(listingsRequestUrl);

                    let listingsJson = await listingsRequest.json();

                    this.collections = (await collectionsRequest.json()).results;
                    this.listings = listingsJson.results;
                    this.listingsNextLink = listingsJson.next;
                }
                else if(this.$route.name=='Marketplace'){                    
                    let listingsRequestUrl = `${config.backendApiEntryPoint}listings/?limit=10&search=${this.search}`;
                    let listingsRequest = await fetch(listingsRequestUrl);
                    let listingsJson = await listingsRequest.json();
                    this.listings = listingsJson.results;
                    this.listingsNextLink = listingsJson.next;
                }
                else if(this.$route.name=='Collection'){                
                    let listingsRequestUrl = `${config.backendApiEntryPoint}listings/?limit=10&search=${this.search}&collection=${this.$route.params.contract_address}`;
                    let listingsRequest = await fetch(listingsRequestUrl);
                    let listingsJson = await listingsRequest.json();
                    this.listings = listingsJson.results;
                    this.listingsNextLink = listingsJson.next;
                }                
            }
            else{
                this.collections = [];
                this.listings =[];
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
    props:['isHeader']
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