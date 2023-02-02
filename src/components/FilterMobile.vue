<template>
    <div class="filter-mobile-wrap">
        <div class="filter-mobile-container">
            <div class="filter-mobile-header">
                <div>{{translatesGet('FILTERS')}}</div>
                <button class="btn-close" @click="updateFilterMobile(false)">
                    <i class="i-close-line"></i>
                </button>
            </div>
            <Filter :onlyFav="onlyFav" :vote="vote" :activities = "activities"/>
            <div class="filter-mobile-footer">
                <button class="btn btn-clear" @click="cleatAll" v-if="this.$store.getters['marketplace/getFiltersCount']>0">{{translatesGet('CLEAR_ALL')}}</button>
                <button class="btn btn-submit" @click="updateFilterMobile(false)">{{translatesGet('APPLY')}}</button>
            </div>
        </div>
    </div>
</template>
<script>

import Filter from "@/components/Filter.vue";
import MultiLang from "@/core/multilang";
import {mapMutations} from "vuex";

export default {
   props:['onlyFav','vote','activities'],
    data() {
        return{
            lang: new MultiLang(this),
        }
    },
    components:{
        Filter,
    },
    methods: {
      ...mapMutations(['updateFilterMobile']),
        translatesGet(key) {
            return this.lang.get(key);
        },

        cleatAll(){
          this.$store.dispatch('marketplace/setAllFiltersToNull')
          this.updateFilterMobile(false)

          if(this.$route.name === 'Marketplace') {
            this.activities ?
                this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:null}) :
                this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo')
          }

          if(this.$route.name === 'Profile') {
            if(!this.onlyFav && !this.vote && !this.activities){
              this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser')
            }
            if(this.onlyFav){
              this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav', true)
            }
            if(this.vote){
              this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote', true)
            }
            if(this.activities) {
              this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:this.userAddress,collectionAddress:null})
            }
          }

          if(this.$route.name === 'Collection') {
            if(this.activities) {
              this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:null,collectionAddress:this.$route.params.contract_address})
            } else {
              this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo',this.$route.params.contract_address)
            }
          }
        }
    }

}
</script>