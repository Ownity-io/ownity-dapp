<template>
    <div class="search">
        <div class="input-wrapper search-wrapper">
            <i class="i-search-line"></i>
            <input type="text" v-model="search" placeholder="Search NFT, collections, id" @input="doSearch">
        </div>
        <div class="search-results" :class="{'unfolded' : search != ''}" v-if="this.search.length>=2">
            <div class="search-results-wrapper">
                <ul v-if="collections.length>0">
                    <li v-for="collection in collections">
                        <div class="results-icon" :style="{backgroundImage:`url(${collection.logo})`}"></div>
                        <div class="results-data">
                            <div class="name">{{collection.name}}</div>
                        </div>
                    </li>
                </ul>
                <ul v-if="listings.length>0">
                    <li v-for="listing in listings">
                        <div class="results-icon" :style="{backgroundImage:`url(${listing.media})`}"></div>
                        <div class="results-data">
                            <div class="name" v-if="listing.name">{{listing.name}}</div>
                            <div class="name" v-else>#{{listing.token_id}}</div>
                            <div>{{listing.collection.name}}</div>
                        </div>
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
            showNothingFound:false
        }
    },
    methods:{
        translatesGet(key) {
            return this.lang.get(key);
        },
        async doSearch(){
            if (this.search.length>=2){
                if (this.isHeader){
                    let collectionsRequestUrl = `${config.backendApiEntryPoint}nft-collections/?limit=10&search=${this.search}`
                    let listingsRequestUrl = `${config.backendApiEntryPoint}listings/?limit=10&search=${this.search}`;

                    let collectionsRequest = await fetch(collectionsRequestUrl);
                    let listingsRequest = await fetch(listingsRequestUrl);

                    this.collections = (await collectionsRequest.json()).results;
                    this.listings = (await listingsRequest.json()).results;
                }
                else if(this.$route.name=='Marketplace'){                    
                    let listingsRequestUrl = `${config.backendApiEntryPoint}listings/?limit=10&search=${this.search}`;
                    let listingsRequest = await fetch(listingsRequestUrl);
                    this.listings = (await listingsRequest.json()).results;
                }
                else if(this.$route.name=='Collection'){                
                    let listingsRequestUrl = `${config.backendApiEntryPoint}listings/?limit=10&search=${this.search}&collection=${this.$route.params.contract_address}`;
                    let listingsRequest = await fetch(listingsRequestUrl);
                    this.listings = (await listingsRequest.json()).results;
                }                
            }
            else{
                this.collections = [];
                this.listings =[];
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