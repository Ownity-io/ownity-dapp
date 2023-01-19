<template>
  <div class="home-page">
    <div class="page-wrapper">
      <main class="main-home">
        <Animation v-if="readyToShow" />

        <section class="section-home main-screen">
          <div class="container">
            <div class="main-screen-container">
              <div class="section-block block-text" :class="{'play-text': playText}">
                <h1 class="section-name-h1">
                  {{translatesGet('MAIN-H1')}}
                </h1>
                <h3 class="section-name-h3">
                  {{translatesGet('MAIN-H2')}}
                </h3>

                <router-link class="btn btn-home btn-home-main" :to="{ name: 'Marketplace' }">
                  <span>
                    {{translatesGet('MAIN-MAIN_BTN')}}
                  </span>
                </router-link>
              </div>
              <div class="section-block block-slider">
                <BannerSlider :banners="banners" v-if="banners!=null"/>
              </div>
            </div>
          </div>
        </section>

        <div class="content-home">
          <div class="content-home-ui">
            <div>
              <img src="../assets/images/main-bg-left.png" alt="">
            </div>
            <div>
              <img src="../assets/images/main-bg-right.png" alt="">
            </div>
          </div>
          <section class="section-home">
            <div class="container">
              <div class="cards-carousel">
                <div class="header-title-btn">
                  <div class="title">
                    {{translatesGet('MAIN-SCREEN_2-TITLE')}}
                  </div>
                  <div class="btn-wrap">
                    <router-link :to="{ name: 'Marketplace' }" class="btn btn-router-to">
                      {{translatesGet('MAIN-SCREEN_2-BTN')}}
                      <i class="i-arrow-right-s-line"></i>
                    </router-link>
                  </div>
                </div>

                <CardsCarousel :nfts = 'nfts' v-if="nfts!=null"/>

                <div class="btn-mobile-wrap">
                  <router-link :to="{ name: 'Marketplace' }" class="btn btn-router-to">
                    {{translatesGet('MAIN-SCREEN_2-BTN')}}
                    <i class="i-arrow-right-s-line"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </section>

          <section class="section-home" id="screen-collections">
            <div class="container">
              <div class="section-home-header">
                <div class="section-home-name">
                  {{translatesGet('MAIN-SCREEN_3-TITLE')}}
                </div>
              </div>

              <div class="table table-top-collections"  v-if="collections!=null">
                <div class="thead">
                  <div class="td td-collection">
                    <span>                  
                      {{translatesGet('MAIN-SCREEN_3-TABLE-COL_1')}}
                    </span>
                  </div>
                  <div class="td td-price">                  
                    {{translatesGet('MAIN-SCREEN_3-TABLE-COL_2')}}
                  </div>
                  <div class="td td-price">                  
                    {{translatesGet('MAIN-SCREEN_3-TABLE-COL_3')}}
                  </div>
                  <div class="td td-data">                  
                    {{translatesGet('MAIN-SCREEN_3-TABLE-COL_4')}}
                  </div>
                  <div class="td td-data">                  
                    {{translatesGet('MAIN-SCREEN_3-TABLE-COL_5')}}
                  </div>
                </div>

                <div class="tr" v-for="collection in collections.results" :key="collection">

                  <div class="td td-collection">
                    <div class="td-wrap td-wrap-collection">
                      <div class="collection-img" :style="{backgroundImage: `url(${collection.logo})`}"></div>
                      <a class="collection-data" :href="'/collection/'+collection.contract_address">
                        <span class="collection-id">{{collection.name}}</span>
                      </a>
                    </div>
                  </div>

                  <div class="td td-price">
                    <div class="td-wrap">
                      <div class="td-wrap-price">
                        <div class="icon-token eth"></div>
                        <span>{{abbrNum(toFixedIfNecessary(collection.volume_all,2),2)}} ETH</span>
                      </div>
                      <!-- <span class="td-light">≈ $ 1000</span> -->
                    </div>
                  </div>

                  <div class="td td-price">
                    <div class="td-wrap">
                      <div class="td-wrap-price">
                        <div class="icon-token eth"></div>
                        <span>{{abbrNum(toFixedIfNecessary(collection.floor_price,2),0)}} ETH</span>
                      </div>
                      <!-- <span class="td-light">≈ $ 1000</span> -->
                    </div>
                  </div>

                  <div class="td td-data">
                    <div class="td-wrap">
                      {{abbrNum(collection.holders,1)}}
                    </div>
                  </div>

                  <div class="td td-data">
                    <div class="td-wrap">
                      {{abbrNum(collection.total_supply,1)}}
                    </div>
                  </div>

                </div>
                <div class="cards-list-load" ref="target" v-if="showCardsLoaderAnimation">
                  <div class="i-wrap">
                    <i class="i-loader-4-line"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="section-home section-home-faq">
            <div class="container">
              <div class="section-home-header">
                <div class="section-home-name">
                  {{translatesGet('FAQ')}}
                </div>
              </div>
              <Faq />
            </div>
          </section>

        </div>

      </main>
    </div>
  </div>
</template>
<script>
import "@/assets/styles/home.css";
import Faq from "@/components/Faq.vue";
import Card from "@/components/Card.vue";
import Animation from "@/components/main/Animation.vue";
import BannerSlider from "@/components/main/BannerSlider.vue";
import CardsCarousel from "@/components/main/CardsCarousel.vue"
import config from '@/config.json'
import { ref } from 'vue';
import { useElementVisibility } from '@vueuse/core';
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      playText: false,
      collections:null,
      render:false,
      nfts:null,
      config:config,
      banners:null,
      showCardsLoaderAnimation:true,
      lang: new MultiLang(this),
      readyToShow: false
    };
  },
  components: {
    Faq,
    Card,
    Animation,
    BannerSlider,
    CardsCarousel,
  },
  async mounted(){
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    // if (this.$route.params.scrollTo === "collections") {
    //     const collectionsSection = document.querySelector("#screen-collections");
    //     setTimeout(() => {
    //         collectionsSection.scrollIntoView({ behavior: "smooth" });
    //     }, 300);
    // }

    this.playText = true;
    this.readyToShow = true;
    await this.fetchAndSetNftCollections();
    await this.fetchAndSetNfts();
    await this.fetchAndSetBanners();
    this.render = true;
    while (true) {
      await delay(1000);
      this.loadIfVisible();
    }
  },
  methods: {
    async fetchAndSetNftCollections() {
      let requestUrl = `${config.backendApiEntryPoint}nft-collections/?limit=${config.collectionsPerPage}`;
      console.log(requestUrl);
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      this.collections = requestJson;
    },
    async fetchAndSetNfts() {
      let requestUrl = `${config.backendApiEntryPoint}listings/?internal_status=GATHER&limit=${this.config.listingsPerPage}&currency=0x0000000000000000000000000000000000000000&marketplace_status=OPEN&ordering=-timestamp/`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      if (requestJson.count == 0){
        requestUrl = `${config.backendApiEntryPoint}listings/?limit=${this.config.listingsPerPage}&currency=0x0000000000000000000000000000000000000000&marketplace_status=OPEN&ordering=-timestamp/`;
        request = await fetch(requestUrl);
        requestJson = await request.json();
      }
      this.nfts = requestJson.results;
    },
    async fetchAndSetBanners() {
      let requestUrl = `${config.backendApiEntryPoint}slider-pics/`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      this.banners = requestJson;
    },
    toFixedIfNecessary(value, dp) {
      return +parseFloat(value).toFixed(dp);
    },
    abbrNum(number, decPlaces) {
      decPlaces = Math.pow(10, decPlaces);
      var abbrev = ["k", "m", "b", "t"];
      for (var i = abbrev.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3);
        if (size <= number) {
          number = Math.round(number * decPlaces / size) / decPlaces;
          if ((number == 1000) && (i < abbrev.length - 1)) {
            number = 1;
            i++;
          }
          number += abbrev[i];
          break;
        }
      }
      return number;
    },
    checkVisibility(){
      const target = ref(this.$refs.target)
      const targetIsVisible = useElementVisibility(target)
      return targetIsVisible.value;
    },
    async loadIfVisible(){
      let isVisible = this.checkVisibility();
      if (isVisible){
        console.log(this.showCardsLoaderAnimation);
        await this.loadNextCollectionsInfo();
      }
    },
    async loadNextCollectionsInfo(){
      if (this.collections.next!=null){
        let requestUrl = this.collections.next;
        let request = await fetch(requestUrl);
        let requestJson = await request.json();
        if (requestJson.results.length>0){
          let results = this.collections.results.concat(requestJson.results);
          this.collections = requestJson;
          this.collections.results = results;
        }        
        else{
          this.showCardsLoaderAnimation=false;
        }
      }
      else{
          this.showCardsLoaderAnimation=false;
      }      
    },
    translatesGet(key) {
      return this.lang.get(key);
    },
  },
};
</script>
