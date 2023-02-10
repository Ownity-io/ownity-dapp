<template>
    <div class="tab-contain tab-info">
        <div class="data-table">

            <div class="data-tr">
                <div class="data-td data-td-name">
                    <span>{{translatesGet('CONTRACT_ADDRESS')}}</span>
                </div>
                <div class="data-td data-td-value">
                    <a class="td-wrap td-wrap-link" :href="config.etherscanTokenUrlStart+item.collection.contract_address" target="_blank" rel="nofollow">
                        <span>{{String(item.collection.contract_address).substring(0,6)+'...'+String(item.collection.contract_address).substring(38,42)}}</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
            </div>
            
            <div class="data-tr">
                <div class="data-td data-td-name">
                    <span>{{translatesGet('TOKEN_ID')}}</span>
                </div>
                <div class="data-td data-td-value">
                    <a class="td-wrap td-wrap-link" :href="config.etherscanTokenUrlStart+item.collection.contract_address+'?a='+item.token_id" target="_blank" rel="nofollow">
                        <span>{{item.token_id}}</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
            </div>
                        
            <div class="data-tr">
                <div class="data-td data-td-name">
                    <span>{{translatesGet('BLOCKCHAIN')}}</span>
                </div>
                <div class="data-td data-td-value">
                    <span>{{item.collection.blockchain}}</span>
                </div>
            </div>
                        
            <div class="data-tr">
                <div class="data-td data-td-name">
                    <span>{{translatesGet('TOKEN_STANDARD')}}</span>
                </div>
                <div class="data-td data-td-value">
                    <span>ERC-{{item.collection.erc_type}}</span>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import config from "@/config.json";
import MultiLang from "@/core/multilang";

export default{
    props:['item'],
    data(){
        return{
            config:config,
            lang: new MultiLang(this),
        }
    },
    methods:{
        translatesGet(key) {
            return this.lang.get(key);
        },
    }
}
</script>