<template>
    <div class="recommendations-wrap">
        <div class="header-title-btn">
          <div class="title">Your Recommendations</div>
          <div class="btn-wrap">
            <router-link :to="{name: 'Marketplace' }" class="btn btn-router-to">
              To the Collections
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
            To the Collections
            <i class="i-arrow-right-s-line"></i>
          </router-link>
        </div>
    </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  data() {
    return {
      cards:[]
    };
  },
  components: {
    Card,
  },
  props:['items'],
  async mounted(){
    this.cards = await this.items;
  }
};
</script>
