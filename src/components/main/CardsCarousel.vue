<template>
  <Carousel 
   :settings="settings" :breakpoints="breakpoints"
  :items-to-show="1.5" v-if="render">
    <Slide v-for="item in this.nfts" :key="item">      
      <Card :item="item" />
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>


<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
// import '~vue3-carousel/carousel.css'

export default defineComponent({
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 320px and up
      0: {
        itemsToShow: 1.94,
        snapAlign: 'center',
      },
      // 700px and up
      768: {
        itemsToShow: 2.935,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 4.95,
        snapAlign: 'start',
      },
    },
    render:false
  }),
  mounted(){
    this.render = true;
  },
  props:['nfts']
})
</script>

<style>

.carousel .card{
  width: 100%;
}
.carousel__prev.carousel__prev--disabled,
.cards-carousel .carousel__prev.carousel__prev--disabled,
.cards-carousel .carousel__next.carousel__next--disabled{
  display: none;
}
</style>