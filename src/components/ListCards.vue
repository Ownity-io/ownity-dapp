<template>
  <div class="cards-list">
    <div v-if="this.$store.getters['api/getListingsResults'].length>0" class="cards-list-container">
      <Card v-for="item in this.$store.getters['api/getListingsResults']" :key="item" :item="item" />
    </div>
    <div class="cards-list-load" ref="target" v-if="this.$store.getters['api/getLastListingsResponse']!=null & this.$store.getters['api/getListingsResults'].length>0">
        <div class="i-wrap">
            <i class="i-loader-4-line"></i>
        </div>
    </div>
    <div class="cards-list-empty" v-if="this.$store.getters['api/getListingsResults'].length==0">
      <div class="title">Oops! Nothing here. </div>
      <button class="btn">
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
      await this.$store.dispatch('api/fetchAndSetListingsNextInfo');
    },
    checkVisibility(){
      const target = ref(this.$refs.target)
      const targetIsVisible = useElementVisibility(target)
      return targetIsVisible.value;
    },
    async loadIfVisible(){
      let isVisible = this.checkVisibility();
      if (isVisible & this.$store.getters['api/getListingsResults'].length>0){
        await this.fetchAndSetListingsNextInfo();
      }
    }
  },
  mounted(){
    setInterval(this.loadIfVisible,1000)
  }
};
</script>
