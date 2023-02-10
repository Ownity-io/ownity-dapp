<template>
  <div class="tab-contain tab-about">
    <div class="collection-wrap">
      <div class="collection-img" :style="{backgroundImage: `url(${item.collection.logo})`}"></div>
                     
      <div class="collection-data">
        <a :href="'/collection/'+item.collection.contract_address" target="_blank" rel="nofollow" class="collection-id collection-label">
          <span>{{item.collection.name}}</span>
          <i class="i-checkbox-circle-fill"></i>
        </a>
      </div>
    </div>
    <div class="collection-description">
      {{item.collection.description}}
    </div>
    <ul class="collection-statistics">
        <li>
            <div class="name">{{translatesGet('VOLUME')}}</div>
            <div class="token-value">
                <div class="icon-value"></div>
                <span>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(item.collection.volume_all,2),0)}} ETH</span>
            </div>
        </li>
        <li>
            <div class="name">{{translatesGet('FLOOR_PRICE')}}</div>
            <div class="token-value">
                <div class="icon-value"></div>
                <span>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(item.collection.floor_price,2),0)}} ETH</span>
            </div>
        </li>
        <li>
            <div class="name">{{translatesGet('OWNERS')}}</div>
            <div >
                <span>{{useHelpers.abbrNum(item.collection.holders,0)}}</span>
            </div>
        </li>
        <li>
            <div class="name">{{translatesGet('SUPPLY')}}</div>
            <div >
                <span>{{useHelpers.abbrNum(item.collection.total_supply,1)}}</span>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { ethers } from 'ethers';
import MultiLang from "@/core/multilang";
import helpers from "@/helpers/helpers";

export default{
  props:['item'],
  data() {
    return {
      useHelpers: helpers,
      lang: new MultiLang(this),
    };
  },
  methods:{
    convertToEther(value){
      try{
        return ethers.utils.formatEther(String(value));
      }
      catch{
        // //console.log('ethers error');
      }
    },
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
}
</script>