<template>
  <div class="home-page">
    <div class="page-wrapper">
      <main class="main-home">
        <!-- animation as another screen with position absolute -->
        <Animation class="screen-animation" />

        <section class="section-home main-screen">
          <div class="container">
            <div class="main-screen-container">
              <div class="section-block block-text">
                <h1 class="section-name-h1">Quant</h1>
                <h3 class="section-name-h3">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the indus
                </h3>

                <router-link
                  class="btn btn-home btn-home-main"
                  :to="{ name: 'Marketplace' }"
                >
                  <span>Marketplace</span>
                </router-link>
              </div>
              <div class="section-block block-slider">                
                <BannerSlider />
              </div>
            </div>
          </div>
        </section>

        <section class="section-home">
            <div class="container">
                <div class="recommendations-wrap">
                    <div class="header-title-btn">
                    <div class="title">Active</div>
                    <div class="btn-wrap">
                        <router-link :to="{name: 'Marketplace' }" class="btn btn-router-to">
                        View all
                        <i class="i-arrow-right-s-line"></i>
                        </router-link>
                    </div>
                    </div>
                    <ul class="recommendations-list">
                    <li >
                        <!-- <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card /> -->
                    </li>
                    </ul>
                    <div class="btn-mobile-wrap">
                    <router-link :to="{name: 'Marketplace' }" class="btn btn-router-to">
                        View all
                        <i class="i-arrow-right-s-line"></i>
                    </router-link>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-home"></section>

        <section class="section-home">
          <div class="container">
            <Faq />
          </div>
        </section>

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

export default {
  data() {
    return {};
  },
  components: {
    Faq,
    Card,
    Animation,
    BannerSlider,
  },
  mounted() {},
  methods: {},
};
</script>
