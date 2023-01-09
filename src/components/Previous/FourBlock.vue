<template>
  <div class="top-collection">
    <p class="top-collection-title">{{ translatesGet("PREVIOUS_COLLECTIONS_TITLE")}}</p>
    <p class="top-collection-subtitle">
      {{ translatesGet("PREVIOUS_COLLECTIONS_SUBTITLE")}}
    </p>
    <div class="collection-wrapper">
      <div class="table table-top-collections">
        <div class="thead">
          <div class="td td-collection">
                    <span>
                      Collection
                    </span>
          </div>
          <div class="td td-price">
            Total Volume
          </div>
          <div class="td td-price">
            Floor Price
          </div>
          <div class="td td-data">
            Owners
          </div>
          <div class="td td-data">
            Supply
          </div>
        </div>

        <div class="tr" v-for="collection in collections.results" :key="collection" v-if="collections">
        
          <div class="td td-collection">
            <div class="td-wrap td-wrap-collection">
              <div class="collection-img" :style="{ backgroundImage: `url(${collection.logo})` }"></div>
              <a class="collection-data" :href="'/collection/' + collection.contract_address">
                <span class="collection-id">{{ collection.name }}</span>
              </a>
            </div>
          </div>
        
          <div class="td td-price">
            <div class="td-wrap">
              <div class="td-wrap-price">
                <div class="icon-token eth"></div>
                <span>{{ abbrNum(toFixedIfNecessary(collection.volume_all, 2), 2) }} ETH</span>
              </div>
              <!-- <span class="td-light">≈ $ 1000</span> -->
            </div>
          </div>
        
          <div class="td td-price">
            <div class="td-wrap">
              <div class="td-wrap-price">
                <div class="icon-token eth"></div>
                <span>{{ abbrNum(toFixedIfNecessary(collection.floor_price, 2), 0) }} ETH</span>
              </div>
              <!-- <span class="td-light">≈ $ 1000</span> -->
            </div>
          </div>
        
          <div class="td td-data">
            <div class="td-wrap">
              {{ abbrNum(collection.holders, 1) }}
            </div>
          </div>
        
          <div class="td td-data">
            <div class="td-wrap">
              {{ abbrNum(collection.total_supply, 1) }}
            </div>
          </div>
        
        </div>
      </div>
      <div class="collection-design">
        <a class="btn btn-previous" href="#list" style="max-width: 180px;z-index: 2">
          To All Collections
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.json'
import MultiLang from "@/core/multilang";


export default {
	name: "FourBlock",
  data() {
		return {
      collections:null,
      render:false,
      config:config,
			lang: new MultiLang(this),
    }
  },
  async mounted(){
    await this.fetchAndSetNftCollections();
    this.render = true;
  },
  methods:{
    async fetchAndSetNftCollections() {
      let requestUrl = `${config.backendApiEntryPoint}nft-collections/?limit=5`;
      console.log(requestUrl);
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      this.collections = requestJson;
    },
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
  }
}
</script>

<style>
.collection-design a{
    pointer-events: auto;
}

@media (max-width: 480px) {
    .table.table-top-collections {
        max-height: 550px;
        overflow: hidden;
    }
}
</style>