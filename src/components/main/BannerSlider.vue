<template>
  <div class="banner-slider">
    <Carousel :autoplay="5000" :wrap-around="true">
      <Slide v-for="banner in banners" :key="banner">
        <a :href="banner.link">
          <img :src="banner.image" alt="" />
        </a>        
      </Slide>
      <template #addons>
        <Pagination v-if="(banners.length>1)"/>
      </template>
    </Carousel>
  </div>
</template>

<script>
// https://ismail9k.github.io/vue3-carousel/

// import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'

// import "vue3-carousel/carousel.css";

export default ({
  name: "Autoplay",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  props:['banners']
});
</script>

<style scoped>
.carousel__slide img {
  width: 100%;
  height: auto;
}
.carousel__track {
  margin: 0 !important;
  /* display: flex; */
}
.carousel__viewport{
    overflow: hidden;
    margin: auto;
}

.banner-slider{
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel{
    width: 100%;
}

</style>