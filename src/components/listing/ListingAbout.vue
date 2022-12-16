<template>
  <div class="tab-contain tab-about">
    <div class="collection-wrap">
      <div class="collection-img"></div>
      <div class="collection-data">
        <a target="_blank" rel="nofollow" class="collection-id collection-label">
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
                <span>{{abbrNum(toFixedIfNecessary(item.collection.volume_all,2),0)}} ETH</span>
            </div>
        </li>
        <li>
            <div class="name">{{translatesGet('FLOOR_PRICE')}}</div>
            <div class="token-value">
                <div class="icon-value"></div>
                <span>{{abbrNum(toFixedIfNecessary(item.collection.floor_price,2),0)}} ETH</span>
            </div>
        </li>
        <li>
            <div class="name">{{translatesGet('OWNERS')}}</div>
            <div >
                <span>{{abbrNum(item.collection.holders,0)}}</span>
            </div>
        </li>
        <li>
            <div class="name">{{translatesGet('SUPPLY')}}</div>
            <div >
                <span>{{abbrNum(item.collection.total_supply,1)}}</span>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { ethers } from 'ethers';
import MultiLang from "@/core/multilang";

export default{
  props:['item'],
  data() {
    return {
      lang: new MultiLang(this),
    };
  },
  methods:{
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
    convertToEther(value){
      try{
        return ethers.utils.formatEther(String(value));
      }
      catch{
        console.log('ethers error');
      }
    },
    toFixedIfNecessary(value, dp) {
      return +parseFloat(value).toFixed(dp);
    },
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
}
</script>