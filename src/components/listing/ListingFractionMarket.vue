<template>
    <div class="tab-contain tab-activities" v-if="render">
        <div class="table table-activities">
            <div class="thead">
                <div class="td">{{translatesGet('ACTIVITY_THEAD-7')}}</div>
                <div class="td td-price">{{translatesGet('ACTIVITY_THEAD-3')}}</div>
                <div class="td">{{translatesGet('ACTIVITY_THEAD-6')}}</div>
                <div class="td td-button">{{translatesGet('ACTIVITY_THEAD-5')}}</div>
            </div>
                
            <div class="tr tr-mob-collapse" v-for="element in item.bids" :key="element">
                <div class="td td-category">
                    <div class="td-wrap td-wrap-category">
                        <i class="i-shopping-bag-line"></i>
                        <span>{{translatesGet('STATUS-SALE')}}</span>
                    </div>
                </div>
                <div class="td td-price">
                    <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token"></div> 
                            <span>{{abbrNum(toFixedIfNecessary(convertToEther(element.price),6),2)}} ETH</span>
                        </div>
                        <span class="td-light">≈ $ {{abbrNum(toFixedIfNecessary(convertToEther(element.price)*currencyToUsdPrice,6),2)}}</span>
                    </div>
                </div>
                <div class="td"> 
                  {{((element.fraction_amount/item.price)*100)}}%
                </div>
                <div class="td td-date">
                    <div class="td-button">
                       <button class="btn btn-td btn-buy" v-if="userAddress != element.address" @click="showBuyModal(element)">{{translatesGet('BUY')}}</button>
                       <button class="btn btn-td btn-buy" v-else @click="showCancelModal(element)">{{translatesGet('CANCEL')}}</button>
                    </div>
                </div>
                
                <button class="btn-mobile-tr-collapse" @click="rowMobileCollapse = !rowMobileCollapse">
                    <i class="i-arrow-down-s-line"></i>
                </button>
            </div>
            
            <div class="table-btn-row">
                <button class="btn btn-show-more">
                    {{translatesGet('SHOW_MORE')}} 
                    <i class="i-arrow-down-s-line"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import MultiLang from "@/core/multilang";
import { ethers } from 'ethers';

export default {
    data(){
        return{
            rowMobileCollapse: false,
            currencyToUsdPrice:1,
            userAddress:false,
            render:false,
            lang: new MultiLang(this),
        }
    },
    props:['item'],
    methods:{
        translatesGet(key) {
            return this.lang.get(key);
        },
        toFixedIfNecessary(value, dp) {
            return +parseFloat(value).toFixed(dp);
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
        convertToEther(value) {
            try {
                return ethers.utils.formatEther(String(parseInt(value)));
            }
            catch {
                console.log('ethers error');
            }
        },
        async setCurrencyToUsd() {
            let request = await fetch(`https://api.octogamex.com/rates?symbol=${this.item.currency.ticker}`);
            let requestJson = await request.json();
            try {
                this.currencyToUsdPrice = requestJson.quotes[0].priceUsd;
            }
            catch {
                this.currencyToUsdPrice = 1;
            }
        },
        async showCancelModal(element){
            await this.$store.dispatch('appGlobal/setShowCancelSellPartModal',true); 
            await this.$store.dispatch('appGlobal/setCurrentPartOnMarket',element);
        },
        async showBuyModal(element){
            await this.$store.dispatch('appGlobal/setShowBuyPartModal',true); 
            await this.$store.dispatch('appGlobal/setCurrentPartOnMarket',element);
        }
    },
    async mounted(){
        this.userAddress = localStorage.getItem('userAddress');
        this.render = true;
        await this.setCurrencyToUsd();
    }
}
</script>