<template>
  <div class="card">
    <div class="card-main">
      <div class="card-img" :style="{backgroundImage: `url(${item.media})`}" ></div>
      <div class="card-header">
        <div class="icon-card-label" :style="{backgroundImage: `url(${item.marketplace.logo})`}"></div>
        <button class="btn-like" @click="testLike = !testLike">
          <i :class="{ 'icon-like': testLike, 'icon-dislike': !testLike }"></i>
        </button>
      </div>
      <div class="card-footer">
        <div class="card-progress progress">
          <div class="progress-value" :style="{ width: testProgressValue + '%' }">
            {{ testProgressValue }}%
          </div>
        </div>
      </div>
    </div>
    <div class="card-data">
      <div class="data-table">
        <div class="data-tr data-tr-main">
          <div class="card-id">{{item.name}}</div>
          <div class="card-value">
            <div class="icon-value"></div>
            0.40 / <span>{{priceInCurrency.toFixed(2)}} ETH</span>
          </div>
        </div>
        <div class="data-tr">
          <div>{{item.collection.name}}</div>
          <div>≈ $ {{Math.round(priceInCurrency * currencyToUsdPrice)}}</div>
        </div>
        <div class="data-tr data-tr-date">
          <div>Ends in 07:47:21</div>
        </div>
      </div>
      <div class="btn-container">
        <button class="btn">Start collecting</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testLike: false,
      testProgressValue: 40,
      currencyToUsdPrice: 1,
      priceInCurrency: 1
    };
  },
  props:[
    'item'
  ],
  methods:{
    getPriceInCurrency(){
      this.priceInCurrency = this.item.price / (10**this.item.currency.decimals);
    },
    async getPriceInUsd(){
      let request = await fetch(`https://api.octogamex.com/rates?symbol=${this.item.currency.ticker}`);
      let requestJson = await request.json();
      try{
        this.currencyToUsdPrice =  requestJson.quotes[0].priceUsd;
      }
      catch{
        this.currencyToUsdPrice = 1;
      }
    }
  },
  async mounted(){
    this.getPriceInCurrency();
    await this.getPriceInUsd();
  }
};
</script>
