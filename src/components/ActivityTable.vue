<template>
    <div v-if="this.$store.getters['marketplace/getActivitiesResult'].length>0">
        <div class="table table-activity">
            <div class="thead">
                <div class="td td-collection"><span>{{translatesGet('ACTIVITY_THEAD-1')}}</span></div>
                <div class="td">{{translatesGet('ACTIVITY_THEAD-2')}}</div>
                <div class="td td-price">{{translatesGet('ACTIVITY_THEAD-3')}}</div>
                <div class="td">{{translatesGet('ACTIVITY_THEAD-4')}}</div>
                <div class="td td-date">{{translatesGet('ACTIVITY_THEAD-5')}}</div>
            </div>
                
            <a :href="'/listing/'+item.lot.collection.contract_address+'/'+item.lot.token_id+'&'+item.lot.id" class="tr" :class="{'tr-mob-collapse' : !rowMobileCollapse}" v-for="item in this.$store.getters['marketplace/getActivitiesResult']">
                <div class="td">
                    <div class="td-wrap td-wrap-collection">
                        <a :href="'/listing/'+item.lot.collection.contract_address+'/'+item.lot.token_id+'&'+item.lot.id" class="collection-img" :style="{backgroundImage: `url(${item.lot.media})`}"></a>
                        <div class="collection-data">
                            <a :href="'/listing/'+item.lot.collection.contract_address+'/'+item.lot.token_id+'&'+item.lot.id" class="collection-id" v-if="item.lot.name">{{item.lot.name}}</a>
                            <a :href="'/listing/'+item.lot.collection.contract_address+'/'+item.lot.token_id+'&'+item.lot.id" class="collection-id" v-else>#{{item.lot.token_id}}</a>
                            <a :href="'/collection/'+item.lot.collection.contract_address" class="td-light collection-id">{{item.lot.collection.name}}</a>
                        </div>
                    </div>
                </div>
                <div class="td td-category">
                    <div class="td-wrap td-wrap-category" v-if="item.division=='Fractions'">
                        <i class="i-coupon-3-line"></i>
                        <div>{{ 'Fractions' }}</div>
                        <div class="td-light">  {{item.subdivision}} </div>
                    </div>
                    <div class="td-wrap td-wrap-category" v-else-if="item.division=='Votings'">
                        <i class="i-volume-vibrate-line"></i>
                        <div>{{ 'Vote' }}</div>
                        <div class="td-light">  {{item.subdivision}} </div>
                    </div>
                    <div class="td-wrap td-wrap-category" v-else-if="item.division=='Sale'">
                        <i class="i-price-tag-3-line"></i>
                        <div>{{ 'Sale' }}</div>
                        <div class="td-light">  {{item.subdivision}} </div>
                    </div>
                    <div class="td-wrap td-wrap-category" v-else-if="item.division=='Rewards'||item.division=='Claims'||item.division=='Claim'">
                        <i class="i-wallet-3-line"></i>
                        <div>{{ 'Claims' }}</div>
                        <div class="td-light">  {{item.subdivision}} </div>
                    </div>
                    <div class="td-wrap td-wrap-category" v-else>
                        <div>{{ item.division }}</div>
                        <div class="td-light">  {{item.subdivision}} </div>
                    </div>
                </div>
                <div class="td td-price" v-if="item.amount">
                    <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token eth"></div> 
                            <span>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(item.amount),6),2)}} ETH</span>
                        </div>
                        <span class="td-light">≈ $ {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(item.amount)*currencyToUsdPrice,2),2,2)}}</span>
                    </div>
                    <!-- <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token eth"></div> 
                            <span>12.90 ETH</span>
                        </div>
                        <span class="td-light">≈ $ 1000</span>
                    </div> -->
                </div>
                <div class="td td-tx" v-if="item.tnx_hash"> 
                    <div class="td-mob-title">Tx</div>
                    <a class="td-wrap td-wrap-link" :href="config.etherscanTxUrlStart+item.tnx_hash" target="_blank" rel="nofollow">
                        <span>{{item.tnx_hash.substring(0,6)+'...'+item.tnx_hash.substring(62,66)}}</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
                <div class="td td-tx" v-else-if="item.part_id"> 
                    <!-- <div class="td-mob-title">Tx</div>
                    <div class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>VoteID: {{item.part_id}}</span>
                    </div>  -->
                </div>
                <div class="td td-date">
                    <div class="td-mob-title">{{translatesGet('ACTIVITY_THEAD-5')}}</div>
                    <div class="td-wrap">
                        {{getTimeString(item.timestamp)}} ago
                    </div>
                </div>
                <button class="btn-mobile-tr-collapse" 
                    @click="rowMobileCollapse = !rowMobileCollapse">
                    <i class="i-arrow-down-s-line"></i>
                </button>
            </a>
        </div>
    </div>
    <div class="cards-list-load" ref="target" v-if="this.$store.getters['marketplace/getLastActivitiesResponse']!=null & this.$store.getters['marketplace/getActivitiesResult'].length>0">
        <div class="i-wrap">
            <i class="i-loader-4-line"></i>
        </div>
    </div>
    <div class="cards-list-empty" v-if="this.$store.getters['marketplace/getActivitiesResult'].length==0">
      <div class="title">{{translatesGet('NOTHING_HERE')}}</div>
      <a href="/marketplace" class="btn" v-if="activitiesIsEmpty">
        {{translatesGet('BACK_TO_ALL')}}
      </a>
      <button class="btn" @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.fetchAndSetActivitiesStartInfo(true)" v-else>
        {{translatesGet('BACK_TO_ALL')}}
      </button>
    </div>
</template>

<script>

import MultiLang from "@/core/multilang";
import { ref } from 'vue';
import { useElementVisibility } from '@vueuse/core';
import config from '@/config.json';
import helpers from "@/helpers/helpers";
import {mapGetters} from "vuex";
export default {
    data(){
        return{
            useHelpers: helpers,
            rowMobileCollapse: false,
            lang: new MultiLang(this),
            userAddress:null,
            config:config,
            activitiesIsEmpty:false
        }
    },
    computed: {
      ...mapGetters(['getUsdRate']),
      currencyToUsdPrice() {
        return this.getUsdRate[`ETH`] ? this.getUsdRate[`ETH`] : 0
      }
    },
    methods: {
        translatesGet(key) {
            return this.lang.get(key);
        },
        async fetchAndSetListingsNextInfo() {
            await this.$store.dispatch('marketplace/fetchAndSetListingsNextInfo');
        },
        checkVisibility() {
            const target = ref(this.$refs.target)
            const targetIsVisible = useElementVisibility(target)
            return targetIsVisible.value;
        },
        async loadIfVisible() {
            let isVisible = this.checkVisibility();
            if (isVisible & this.$store.getters['marketplace/getActivitiesResult'].length > 0) {
                await this.fetchAndSetActivitiesNextInfo();
            }
        },
        async fetchAndSetActivitiesNextInfo() {
            this.$store.dispatch('marketplace/fetchAndSetNextActivitiesResult');
            // if (this.$route.name == 'Marketplace') {
            //     this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
            // }
            // if (this.$route.name == 'Collection') {
            //     this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo', this.$route.params.contract_address)
            // }
            // if (this.$route.name == 'Profile') {
            //     if (this.onlyFav) {
            //         await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
            //     }
            //     else if (this.vote) {
            //         await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
            //     }
            //     else {
            //         await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
            //     }
            // }
        },
        getTimeString(timeStampValue) {
            let timeNow = Date.now() / 1000;
            let remTimeInSeconds = timeNow -timeStampValue;
            var sec_num = parseInt(remTimeInSeconds, 10);
            var days = Math.floor(sec_num / 86400);
            var hours = Math.floor((sec_num - (days * 86400)) / 3600);
            var minutes = Math.floor((sec_num - ((days * 86400) + (hours * 3600))) / 60);
            var seconds = sec_num - (days * 86400) - (hours * 3600) - (minutes * 60);
            // if (days < 10) { days = "0" + days; }
            if (hours < 10 & days>0) { hours = "0" + hours; }
            if (minutes < 10 & hours>0) { minutes = "0" + minutes; }
            if (seconds < 10 & minutes>0) { seconds = "0" + seconds; }
            if (days > 0) {
                return days + 'd:' + hours + 'h';
            } else if (hours>0){
                return hours + 'h:' + minutes + 'm';
            }
            else if (minutes>0){
                return minutes + 'm:' + seconds + 's';
            }
            else if (seconds>0){
                return seconds+'s';
            }
        },
        async fetchAndSetActivitiesStartInfo(isFirst){
            this.userAddress = localStorage.getItem('userAddress');
            if (this.$route.name == 'Marketplace') {
                await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult', { userAddress: null, collectionAddress: null });
            }
            else if (this.$route.name == 'Collection') {
                await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult', { userAddress: null, collectionAddress: this.$route.params.contract_address });
            }
            else if (this.$route.name == 'Profile') {
                await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult', { userAddress: this.userAddress, collectionAddress: null, isFirst });
            }     
        }
    },
    async mounted(){  
        await this.fetchAndSetActivitiesStartInfo(true);
        if (this.$route.name == 'Collection') {
            let requestUrl = `${config.backendApiEntryPoint}user-activity/?limit=${config.listingsPerPage}`;
            requestUrl += `&collection=${this.$route.params.contract_address}`;
            let request = await fetch(requestUrl);
            let requestJson = await request.json();
            if (requestJson.count <= 0) {
                this.activitiesIsEmpty = true;
            }
        } 
        if (this.$route.name == 'Profile') {
            let requestUrl = `${config.backendApiEntryPoint}user-activity/?limit=${config.listingsPerPage}`;
            let request = await fetch(requestUrl, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            let requestJson = await request.json();
            if (requestJson.count <= 0) {
                this.activitiesIsEmpty = true;
            }
        }        
        if (this.$route.name == 'Marketplace') {
            let requestUrl = `${config.backendApiEntryPoint}user-activity/?limit=${config.listingsPerPage}`;
            let request = await fetch(requestUrl);
            let requestJson = await request.json();
            if (requestJson.count <= 0) {
                this.activitiesIsEmpty = true;
            }
        }   
        const delay = (delayInms) => {
            return new Promise(resolve => setTimeout(resolve, delayInms));
        }
        while (true) {
            await delay(1000);
            this.loadIfVisible();
        }
    }
}
</script>