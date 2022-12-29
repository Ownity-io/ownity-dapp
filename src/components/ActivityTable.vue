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
                    <div class="td-wrap td-wrap-collection">
                        <div class="collection-img" :style="{backgroundImage: `url(${item.lot.media})`}"></div>
                        <div class="collection-data">
                            <span class="collection-id" v-if="item.lot.name">{{item.lot.name}}</span>
                            <span class="collection-id" v-else>#{{item.lot.token_id}}</span>
                            <span class="td-light collection-id">Mutant Ape Yacht Club</span>
                        </div>
                    </div>
                </div>
                <div class="td td-category">
                    <div class="td-wrap td-wrap-category">
                        <i class="i-coupon-3-line"></i>
                        <div>{{translatesGet('ACTIVITY_THEAD-1')}}</div>
                        <div class="td-light">{{translatesGet('STATUS-START')}}</div>
                    </div>
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
                <div class="td td-price">
                    <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token"></div> 
                            <span>12.90 ETH</span>
                        </div>
                        <span class="td-light">≈ $ 1000</span>
                    </div>
                </div>
                <div class="td td-tx"> 
                    <div class="td-mob-title">Tx</div>
                    <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>a1565...d48d</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
                <div class="td td-date">
                    <div class="td-mob-title">{{translatesGet('ACTIVITY_THEAD-5')}}</div>
                    <div class="td-wrap">
                        5 minutes ago
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
export default {
    data(){
        return{
            rowMobileCollapse: false,
            lang: new MultiLang(this),
            userAddress:null
        }
    },
    methods:{
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
        }
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