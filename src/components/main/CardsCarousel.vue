<template>
  <Carousel 
   :settings="settings" :breakpoints="breakpoints"
  :items-to-show="1.5">
    <Slide v-for="slide in 10" :key="slide">

      <!-- -------------------------------- -->
      <!-- -------------------------------- -->
      <!-- -------------------------------- -->
      <!-- -------------------------------- -->
      <!-- HERE YOU CAN PAST COMPONENT CARD -->
      <!-- -------------------------------- -->
      <!-- -------------------------------- -->
      <!-- -------------------------------- -->
      <!-- -------------------------------- -->
      
      <a class="card">
        <div class="card-main">
          <div class="card-header">
            <!-- <a  class="icon-card-label "></a> -->
            <!-- <button class="btn-like" :class="{'liked':testLike}" @click="changeLike">
              <i class="i-heart-3-fill"></i>
              <i class="i-heart-3-line"></i>
            </button> -->
          </div>
          <div class="card-footer">
            <div class="card-progress progress" >
              <!-- <div v-if="userProgressValue>0" class="progress-value owner" :style="{ width: userProgressValue + '%' }">
                <span v-if="userProgressValue>=20">{{ userProgressValue }}%</span>
              </div> -->
              <div class="progress-value" style=" width: 40%">
                <span>40%</span>
              </div>
            </div>
            <div class="card-members btn-more-info">
              <button class="card-members-btn ">
                <i class="i-user-fill"></i>  
              10
              </button>
            </div>
          </div>
        </div>
        <div class="card-data">
          <div class="data-table">
            <div class="data-tr data-tr-main"  >   
              <div class="data-td">
                <div class="card-id">
                  Card #{{ slide }}
                </div>  
                <a ><span>Collection name</span></a>
              </div>
              <div class="data-td data-td-value">
                <div class="card-value">
                  <div class="icon-value"></div>
                  <span><b>10</b>ETH</span> 
                </div>
                <div class="equivalent">≈ $ 10</div>

              </div>
            </div>
            <div class="data-tr data-tr-date">
              <div>Ends in 10:22:13</div>
            </div>
          </div>
          <div class="btn-container">
            <button class="btn">
              <div>
                Start collecting
              </div>
            </button>
          </div>
        </div>
      </a>
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
      320: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
      // 700px and up
      768: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
    },
  }),
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