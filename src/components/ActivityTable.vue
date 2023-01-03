<template>
    <div>
        <div class="table table-activity">
            <div class="thead">
                <div class="td td-collection"><span>{{translatesGet('ACTIVITY_THEAD-1')}}</span></div>
                <div class="td">{{translatesGet('ACTIVITY_THEAD-2')}}</div>
                <div class="td td-price">{{translatesGet('ACTIVITY_THEAD-3')}}</div>
                <div class="td">{{translatesGet('ACTIVITY_THEAD-4')}}</div>
                <div class="td td-date">{{translatesGet('ACTIVITY_THEAD-5')}}</div>
            </div>
                
            <div class="tr" :class="{'tr-mob-collapse' : !rowMobileCollapse}" v-for="item in this.$store.getters['marketplace/getActivitiesResult']">
                <div class="td">
                    <a :href="'/listing/'+item.lot.collection.contract_address+'/'+item.lot.token_id+'&'+item.lot.id" class="td-wrap td-wrap-collection">
                        <div class="collection-img" :style="{backgroundImage: `url(${item.lot.media})`}"></div>
                        <div class="collection-data">
                            <span class="collection-id" v-if="item.lot.name">{{item.lot.name}}</span>
                            <span class="collection-id" v-else>#{{item.lot.token_id}}</span>
                            <span class="td-light collection-id">{{item.lot.collection.name}}</span>
                        </div>
                    </a>
                </div>
                <div class="td td-category">
                    <div class="td-wrap td-wrap-category">
                        <i class="i-coupon-3-line"></i>
                        <div>{{ item.part }}</div>
                        <div class="td-light">Empty</div>
                    </div>
                    <!-- <div class="td-wrap td-wrap-category">
                        <i class="i-coupon-3-line"></i>
                        <div>{{translatesGet('ACTIVITY_THEAD-1')}}</div>
                        <div class="td-light">{{translatesGet('STATUS-START')}}</div>
                    </div> -->
                    <!-- <div class="td-wrap td-wrap-category">
                        <i class="i-coupon-3-line"></i>
                        <div>{{translatesGet('ACTIVITY_THEAD-1')}}</div>
                        <div class="td-light">{{translatesGet('STATUS-CANCEL')}}</div>
                    </div>   
                    <div class="td-wrap td-wrap-category">
                        <i class="i-shopping-bag-line"></i>
                        <div>{{translatesGet('STATUS-SALE')}}</div>
                    </div>
                    <div class="td-wrap td-wrap-category">
                        <i class="i-volume-vibrate-line"></i>
                        <div>{{translatesGet('STATUS-VOITE')}}</div>
                        <div class="td-light">{{translatesGet('STATUS-CANCELLATION')}}</div>
                    </div>
                    <div class="td-wrap td-wrap-category">
                        <i class="i-volume-vibrate-line"></i>
                        <div>{{translatesGet('STATUS-LISTING')}}</div>
                        <div class="td-light">{{translatesGet('STATUS-START')}}</div>
                    </div> -->
                </div>
                <div class="td td-price" v-if="item.amount">
                    <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token eth"></div> 
                            <span>{{abbrNum(toFixedIfNecessary(convertToEther(item.amount),6),2)}} ETH</span>
                        </div>
                        <span class="td-light">≈ $ {{abbrNum(toFixedIfNecessary(convertToEther(item.amount)*currencyToUsdPrice,2),2)}}</span>
                    </div>
                    <!-- <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token eth"></div> 
                            <span>12.90 ETH</span>
                        </div>
                        <span class="td-light">≈ $ 1000</span>
                    </div> -->
                </div>
                <div class="td td-tx" v-if="String(item.part_id).length>10"> 
                    <div class="td-mob-title">Tx</div>
                    <a class="td-wrap td-wrap-link" :href="config.etherscanTxUrlStart+item.part_id" target="_blank" rel="nofollow">
                        <span>{{item.part_id.substring(0,6)+'...'+item.part_id.substring(38,42)}}</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
                <div class="td td-tx" v-else> 
                    <div class="td-mob-title">Tx</div>
                    <div class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>VoteID: {{item.part_id}}</span>
                    </div> 
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
            </div>
        </div>
    </div>
    <div class="cards-list-load" ref="target" v-if="this.$store.getters['marketplace/getLastActivitiesResponse']!=null & this.$store.getters['marketplace/getActivitiesResult'].length>0">
        <div class="i-wrap">
            <i class="i-loader-4-line"></i>
        </div>
    </div>
</template>

<script>

import MultiLang from "@/core/multilang";
import { ref } from 'vue';
import { useElementVisibility } from '@vueuse/core';
import { ethers } from "ethers";
import config from '@/config.json';
export default {
    data(){
        return{
            rowMobileCollapse: false,
            lang: new MultiLang(this),
            userAddress:null,
            currencyToUsdPrice:1,
            config:config
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
        abbrNum(number, decPlaces) {
            decPlaces = Math.pow(10, decPlaces);
            var abbrev = ["k", "m", "b", "t"];
            for (var i = abbrev.length - 1; i >= 0; i--) {
                var size = Math.pow(10, (i + 1) * 3);
                if (size <= number) {
                    number = Math.round(number * decPlaces / size) / decPlaces;
                    if ((number == 1000) && (i < abbrev.length - 1)) {
                        number = 1;
                        i++;
                    }
                    number += abbrev[i];
                    break;
                }
            }

            return number;
        },
        async setCurrencyToUsd() {
            let request = await fetch(`https://api.octogamex.com/rates?symbol=ETH`);
            let requestJson = await request.json();
            try {
                this.currencyToUsdPrice = requestJson.quotes[0].priceUsd;
            }
            catch {
                this.currencyToUsdPrice = 1;
            }
        },
        toFixedIfNecessary(value, dp) {
            return +parseFloat(value).toFixed(dp);
        },
        convertToEther(value) {
            return ethers.utils.formatEther(String(value));
        },
        getTimeString(timeStampValue) {
            console.log(timeStampValue);
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
    },
    async mounted(){
        this.userAddress = localStorage.getItem('userAddress');
        if (this.$route.name == 'Marketplace'){
          await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:null});
      }
      else if (this.$route.name == 'Collection'){
          await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:this.$route.params.contract_address});          
      }
      else if (this.$route.name == 'Profile'){
          await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:this.userAddress,collectionAddress:null}); 
      }     
      await this.setCurrencyToUsd(); 
        
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