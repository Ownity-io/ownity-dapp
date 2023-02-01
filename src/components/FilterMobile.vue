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
                <button class="btn btn-clear">{{translatesGet('CLEAR_ALL')}}</button>
                <button class="btn btn-submit">{{translatesGet('APPLY')}}</button>
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
    }

}
</script>