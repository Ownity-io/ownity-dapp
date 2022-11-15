<template>
  <div class="cards-list">
    <div v-if="this.$store.getters['marketplace/getListingsResults'].length>0" class="cards-list-container">
      <Card v-for="item in this.$store.getters['marketplace/getListingsResults']" :key="item" :item="item" />
    </div>
    <div class="cards-list-load" ref="target" v-if="this.$store.getters['marketplace/getLastListingsResponse']!=null & this.$store.getters['marketplace/getListingsResults'].length>0">
        <div class="i-wrap">
            <i class="i-loader-4-line"></i>
        </div>
    </div>
    <div class="cards-list-empty" v-if="this.$store.getters['marketplace/getListingsResults'].length==0">
      <div class="title">Oops! Nothing here. </div>
      <button class="btn" @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')">
        Back to all items
      </button>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { ref } from 'vue';
import { useElementVisibility } from '@vueuse/core';

export default {
  data() {
    return {};
  },
  components: {
    Card,
  },
  methods:{
    async fetchAndSetListingsNextInfo() {
      await this.$store.dispatch('marketplace/fetchAndSetListingsNextInfo');
    },
    checkVisibility(){
      const target = ref(this.$refs.target)
      const targetIsVisible = useElementVisibility(target)
      return targetIsVisible.value;
    },
    async loadIfVisible(){
      let isVisible = this.checkVisibility();
      if (isVisible & this.$store.getters['marketplace/getListingsResults'].length>0){
        await this.fetchAndSetListingsNextInfo();
      }
    }
  },
  async mounted(){
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while (true) {
      await delay(1000);
      this.loadIfVisible();
    }
  }
};
</script>
