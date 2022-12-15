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
      <div class="title">{{translatesGet('NOTHING_HERE')}}</div>
      <button class="btn" @click="this.$store.dispatch('marketplace/setAllFiltersToNull');this.fetchAndSetListingsStartInfo()">
        {{translatesGet('BACK_TO_ALL')}}
      </button>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { ref } from 'vue';
import { useElementVisibility } from '@vueuse/core';
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      lang: new MultiLang(this),
    };
  },
  components: {
    Card,
  },
  methods:{
    translatesGet(key) {
        return this.lang.get(key);
    },
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
    },
    async fetchAndSetListingsStartInfo(){
      if (this.$route.name == 'Marketplace'){
        this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
      }
      if (this.$route.name == 'Collection'){
        this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address)
      }
      if (this.$route.name == 'Profile'){      
        console.log  
        if (this.onlyFav) {
          console.log('fav');
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
        }
        else if(this.vote){
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
        }
        else{
          console.log('no-fav');
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
        }
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
  },
  props:['onlyFav','vote']
};
</script>
