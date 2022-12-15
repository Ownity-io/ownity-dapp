<template>
    <div class="recommendations-wrap">
        <div class="header-title-btn">
          <div class="title">
            <span>{{translatesGet('RECOMMEND_TITLE')}}</span>
          </div>
          <div class="btn-wrap">
            <router-link :to="{name: 'Marketplace' }" class="btn btn-router-to">
              <span>{{translatesGet('RECOMMEND_BTN')}}</span>
              <i class="i-arrow-right-s-line"></i>
            </router-link>
          </div>
        </div>
        <ul class="recommendations-list">
          <li v-for="item in cards" :key="item">
            <Card :item="item"/>
          </li>
        </ul>
        <div class="btn-mobile-wrap">
          <router-link :to="{name: 'Marketplace' }" class="btn btn-router-to">
              <span>{{translatesGet('RECOMMEND_BTN')}}</span>
            <i class="i-arrow-right-s-line"></i>
          </router-link>
        </div>
    </div>
</template>

<script>

import Card from "@/components/Card.vue";
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      lang: new MultiLang(this),
      cards:[]
    };
  },
  components: {
    Card,
  },
  props:['items'],
  async mounted(){
    this.cards = await this.items;
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
}

</script>

<style>
.recommendations-list li:hover {
  z-index: 5;
}
.recommendations-list li .card {
  min-height: 100%;
}
</style>