<template>
  <div class="cards-list">
    <div v-if="this.$store.getters['marketplace/getSharesResults'].length>0" class="cards-list-container">
      <Card :class="{ hides: hidesClass }" v-for="item in this.$store.getters['marketplace/getSharesResults']" :key="item" :item="item" />
    </div>
    <div class="cards-list-load" ref="target" v-if="this.$store.getters['marketplace/getLastSharesResponse']!=null & this.$store.getters['marketplace/getSharesResults'].length>0">
      <div class="i-wrap">
        <i class="i-loader-4-line"></i>
      </div>
    </div>
    <!--    <SkeletonCard />-->
    <div class="cards-list-empty" v-if="this.$store.getters['marketplace/getSharesResults'].length==0">
      <div class="title">{{translatesGet('NOTHING_HERE')}}</div>
      <a href="/marketplace" class="btn" v-if="collectionIsEmpty">
        {{translatesGet('BACK_TO_ALL')}}
      </a>
      <button class="btn" @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.fetchAndSetListingsStartInfo()" v-else>
        {{translatesGet('BACK_TO_ALL')}}
      </button>
    </div>
  </div>
</template>

<script>
import MultiLang from "@/core/multilang";
import SkeletonCard from "@/components/Skeleton/SkeletonCard.vue";
import Card from "@/components/Card.vue";
import {ref} from "vue";
import {useElementVisibility} from "@vueuse/core";

export default {
  name: "SharesSaleTable",
  data() {
    return {
      lang: new MultiLang(this),
      collectionIsEmpty:false,
      hidesClass: false
    };
  },
  components: {
    SkeletonCard,
    Card,
  },

  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
    async fetchAndSetListingsNextInfo() {
      await this.$store.dispatch('marketplace/fetchAndSetSharesNextInfo');
    },
    checkVisibility(){
      const target = ref(this.$refs.target)
      const targetIsVisible = useElementVisibility(target)
      return targetIsVisible.value;
    },
    async loadIfVisible(){
      let isVisible = this.checkVisibility();
      if (isVisible & this.$store.getters['marketplace/getSharesResults'].length>0){
        await this.fetchAndSetListingsNextInfo();
      }
    },
    async fetchAndSetListingsStartInfo() {
      this.$store.dispatch('marketplace/fetchSharesSale');
    },
  },
  async mounted() {
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    while (true) {
      await delay(1000);
      this.loadIfVisible();
    }
  }
}
</script>

<style scoped>

</style>