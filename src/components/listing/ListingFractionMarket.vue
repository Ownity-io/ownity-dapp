<template>
    <div class="tab-contain tab-activities">
        <div class="table table-activities">
            <div class="thead">
                <div class="td">Status</div>
                <div class="td td-price">Price</div>
                <div class="td">Pct</div>
                <div class="td td-button">Date</div>
            </div>
                
            <div class="tr tr-mob-collapse" v-for="element in item.bids" :key="element">
                <div class="td td-category">
                    <div class="td-wrap td-wrap-category">
                        <i class="i-shopping-bag-line"></i>
                        <span>Sale</span>
                    </div>
                </div>
                <div class="td td-price">
                    <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token"></div> 
                            <span>{{abbrNum(toFixedIfNecessary(convertToEther(element.amount),6),2)}} ETH</span>
                        </div>
                        <span class="td-light">≈ $ {{abbrNum(toFixedIfNecessary(convertToEther(element.amount)*currencyToUsdPrice,6),2)}}</span>
                    </div>
                </div>
                <div class="td"> 
                    <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>a1565...d48d</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
                <div class="td td-date">
                    <div class="td-button">
                       <button class="btn btn-td btn-buy">Buy</button>
                    </div>
                </div>
                
                <button class="btn-mobile-tr-collapse" @click="rowMobileCollapse = !rowMobileCollapse">
                    <i class="i-arrow-down-s-line"></i>
                </button>
            </div>
            
            <div class="table-btn-row">
                <button class="btn btn-show-more">Show more <i class="i-arrow-down-s-line"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import { ethers } from 'ethers';
export default {
    data(){
        return{
            rowMobileCollapse: false,
            currencyToUsdPrice:1
        }
    },
    props:['item'],
    methods:{
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
            // try {
                return ethers.utils.formatEther(parseInt(value));
            // }
            // catch {
            //     console.log('ethers error');
            // }
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
    },
    async mounted(){
        await this.setCurrencyToUsd();
    }
}
</script>