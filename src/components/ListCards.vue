<template>
  <div class="cards-list">
    <div v-if="this.$store.getters['marketplace/getListingsResults'].length>0" class="cards-list-container">
      <Card :class="{ hides: hidesClass }" v-for="item in this.$store.getters['marketplace/getListingsResults']" :key="item" :item="item" />
    </div>
    <div class="cards-list-load" ref="target" v-if="this.$store.getters['marketplace/getLastListingsResponse']!=null & this.$store.getters['marketplace/getListingsResults'].length>0">
        <div class="i-wrap">
            <i class="i-loader-4-line"></i>
        </div>
    </div>
<!--    <SkeletonCard />-->
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
import SkeletonCard from "@/components/Skeleton/SkeletonCard.vue";

export default {
  props:['onlyFav','vote'],
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
		addClasses(){
			if (this.$route.name == 'Marketplace'){
        this.hidesClass = !this.hidesClass
				// //console.log(this.hidesClass)
			}
			if (this.$route.name == 'Collection'){
				this.hidesClass = !this.hidesClass
				// //console.log(this.hidesClass)
			}
			if (this.$route.name == 'Profile') {
				this.hidesClass = false
				// //console.log(this.hidesClass)
      }
    },
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
    },
  },
  async mounted(){
		this.addClasses()
    if (this.$route.name=='Collection'){
      let requestUrl = `${config.backendApiEntryPoint}listings/?limit=${config.listingsPerPage}&currency=0x0000000000000000000000000000000000000000`;
        requestUrl += `&collection=${this.$route.params.contract_address}`;
        requestUrl+='&marketplace_status=OPEN';
        let request = await fetch(requestUrl);
        let requestJson = await request.json();
        if (requestJson.count<=0){
          this.collectionIsEmpty=true;
        }
    }
    if (this.$route.name=='Profile'){
      if (this.onlyFav) {
        let requestUrl = `${config.backendApiEntryPoint}favorite-listings-by-user/?limit=${config.listingsPerPage}`;
        let requestOptions = {
          method: "GET",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        };
        let request = await fetch(requestUrl, requestOptions);
        let requestJson = await request.json();
        if (requestJson.count<=0){
          this.collectionIsEmpty=true;
        }
      }
      else if (this.vote) {
        let requestUrl = `${config.backendApiEntryPoint}listings-with-voting-by-user/?limit=${config.listingsPerPage}&currency=0x0000000000000000000000000000000000000000`;
        let requestOptions = {
          method: "GET",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        };
        let request = await fetch(requestUrl, requestOptions);
        let requestJson = await request.json();
        if (requestJson.count<=0){
          this.collectionIsEmpty=true;
        }
      }
      else {
        let requestUrl = `${config.backendApiEntryPoint}listings-by-user/?limit=${config.listingsPerPage}&currency=0x0000000000000000000000000000000000000000`;
        let requestOptions = {
          method: "GET",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        };
        let request = await fetch(requestUrl, requestOptions);
        let requestJson = await request.json();
        if (requestJson.count<=0){
          this.collectionIsEmpty=true;
        }
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
};
</script>
