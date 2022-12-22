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
import Card from "@/components/Card.vue";
import { ref } from 'vue';
import { useElementVisibility } from '@vueuse/core';
import MultiLang from "@/core/multilang";
import config from '@/config.json';

export default {
  data() {
    return {
      lang: new MultiLang(this),
      collectionIsEmpty:false
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
        if (this.onlyFav) {
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
        }
        else if(this.vote){
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
        }
        else{
          await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
        }
      }
    }
  },
  async mounted(){
    if (this.$route.name=='Collection'){
      let requestUrl = `${config.backendApiEntryPoint}listings/?limit=${config.listingsPerPage}`;
        requestUrl += `&collection=${this.$route.params.contract_address}`;
        requestUrl+='&marketplace_status=OPEN';
        let request = await fetch(requestUrl);
        let requestJson = await request.json();
        if (requestJson.count<=0){
          this.collectionIsEmpty=true;
        }
    }
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
