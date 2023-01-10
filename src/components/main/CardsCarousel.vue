<template>
  <Carousel 
   :settings="settings" :breakpoints="breakpoints"
  :items-to-show="1.5">
    <Slide v-for="item in this.nfts" :key="item">      
      <Card :item="item" />
    </Slide>
    <template #addons v-if="(this.nfts.length>5)">
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>


<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import Card from '@/components/Card.vue';
// import '~vue3-carousel/carousel.css'

export default defineComponent({
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    Navigation,
    Card,
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
        itemsToShow: 1.96,
        snapAlign: 'center',
      },
      // 700px and up
      768: {
        // itemsToShow: 1.94,
        itemsToShow: 2.935,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        // itemsToShow: 4.95,
        // itemsToShow: 2.8,
        itemsToShow: 3.93,
        snapAlign: 'start',
      },
      // 1024 and up
      1425: {
        // itemsToShow: 2.5,
        itemsToShow: 4.95,
        snapAlign: 'start',
      },
    },
  }),
  props:['nfts'],
})
</script>

<style>

.carousel .card{
  width: 100%;
  height: 100%;
}
.carousel li:hover{
  z-index: 5;
}
.carousel__prev.carousel__prev--disabled,
.cards-carousel .carousel__prev.carousel__prev--disabled,
.cards-carousel .carousel__next.carousel__next--disabled{
  display: none;
}

/* .cards-carousel .carousel__viewport li.carousel__slide--visible .container-more-info {
    left:unset;
    transform: translate(0%, 100%);
    right: 0;
} */

@media (min-width:0)  and (max-width:768px) {
  .cards-carousel li.carousel__slide--visible .container-more-info {
    transform: translate(-50%, 100%);
    left:calc(50% + 12px);
    right: 0;
  }
}
@media (min-width:768px) {
  .cards-carousel li.carousel__slide--active .container-more-info {
    transform: translate(0px, 100%);
    left:12px;
    right: unset;
  }
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible  .container-more-info {
    transform: translate(-50%, 100%);
    left:calc(50% + 12px);
    right: 0;
  }
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible + .carousel__slide--visible  .container-more-info {
    transform: translate(0px, 100%);
    left:unset;
    right: 0;
  }
}
@media (min-width:1024px) and (max-width:1424.5px) {
  .cards-carousel li.carousel__slide--active .container-more-info,
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible .container-more-info  {
    transform: translate(0px, 100%);
    left:12px;
    right: unset;
  }
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible + .carousel__slide--visible  .container-more-info ,
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible + .carousel__slide--visible + .carousel__slide--visible  .container-more-info  {
    transform: translate(0px, 100%);
    left:unset;
    right: 0;
  }
}
@media (min-width:1425px) {

  .cards-carousel li.carousel__slide--active .container-more-info,
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible .container-more-info  {
    transform: translate(0px, 100%);
    left:12px;
    right: unset;
  }
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible + .carousel__slide--visible  .container-more-info {
    transform: translate(-50%, 100%);
    left:calc(50% + 12px);
    right: 0;
  }
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible + .carousel__slide--visible + .carousel__slide--visible  .container-more-info ,
  .cards-carousel li.carousel__slide--active + .carousel__slide--visible + .carousel__slide--visible + .carousel__slide--visible + .carousel__slide--visible  .container-more-info  {
    transform: translate(0px, 100%);
    left:unset;
    right: 0;
  }
}
</style>