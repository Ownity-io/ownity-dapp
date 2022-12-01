<template>
  <div class="home-page">
    <div class="page-wrapper">
      <main class="main-home">
        <!-- animation as another screen with position absolute -->
        <Animation />

        <section class="section-home main-screen">
          <div class="container">
            <div class="main-screen-container">
              <div class="section-block block-text" :class="{'play-text': playText}">
                <h1 class="section-name-h1">Quant</h1>
                <h3 class="section-name-h3">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the indus
                </h3>

                <router-link class="btn btn-home btn-home-main" :to="{ name: 'Marketplace' }">
                  <span>Marketplace</span>
                </router-link>
              </div>
              <div class="section-block block-slider">
                <!-- <BannerSlider /> -->
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
                  <div class="title">Active</div>
                  <div class="btn-wrap">
                    <router-link :to="{ name: 'Marketplace' }" class="btn btn-router-to">
                      View all
                      <i class="i-arrow-right-s-line"></i>
                    </router-link>
                  </div>
                </div>

                <CardsCarousel />

                <div class="btn-mobile-wrap">
                  <router-link :to="{ name: 'Marketplace' }" class="btn btn-router-to">
                    View all
                    <i class="i-arrow-right-s-line"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </section>

          <section class="section-home">
            <div class="container">
              <div class="section-home-header">
                <div class="section-home-name">Top Collections</div>
              </div>

              <div class="table table-top-collections">
                <div class="thead">
                  <div class="td td-collection"><span>Collection</span></div>
                  <div class="td td-price">Volume</div>
                  <div class="td td-price">Floor price</div>
                  <div class="td td-data">Owners</div>
                  <div class="td td-data">Supply</div>
                </div>

                <div class="tr">

                  <div class="td td-collection">
                    <div class="td-wrap td-wrap-collection">
                      <div class="collection-img"></div>
                      <div class="collection-data">
                        <span class="collection-id">18234</span>
                        <span class="td-light collection-id">Mutant Ape Yacht Club</span>
                      </div>
                    </div>
                  </div>

                  <div class="td td-price">
                    <div class="td-wrap">
                      <div class="td-wrap-price">
                        <div class="icon-token"></div>
                        <span>12.90 ETH</span>
                      </div>
                      <!-- <span class="td-light">≈ $ 1000</span> -->
                    </div>
                  </div>

                  <div class="td td-price">
                    <div class="td-wrap">
                      <div class="td-wrap-price">
                        <div class="icon-token"></div>
                        <span>12.90 ETH</span>
                      </div>
                      <!-- <span class="td-light">≈ $ 1000</span> -->
                    </div>
                  </div>

                  <div class="td td-data">
                    <div class="td-wrap">
                      3.2K
                    </div>
                  </div>

                  <div class="td td-data">
                    <div class="td-wrap">
                      1K
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <section class="section-home">
            <div class="container">
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

export default {
  data() {
    return {
      playText: false,
    };
  },
  components: {
    Faq,
    Card,
    Animation,
    BannerSlider,
    CardsCarousel,
  },
  mounted(){
    this.playText = true;
  },
  methods: {},
};
</script>
