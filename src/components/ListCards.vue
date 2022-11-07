<template>
  <div class="cards-list">
    <div class="cards-list-container">
      <Card v-for="item in this.$store.getters['api/getListingsResults']" :key="item" :imgUrl="item.media" />
    </div>
    <div class="cards-list-load">
        <div class="i-wrap">
            <i class="i-loader-4-line"></i>
        </div>
    </div>
    <div class="cards-list-empty">
      <div class="title">Oops! Nothing here. </div>
      <button class="btn">
        Back to all items
      </button>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  data() {
    return {};
  },
  components: {
    Card,
  },
};
</script>
