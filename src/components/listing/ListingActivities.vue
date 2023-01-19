<template>
    <div class="tab-contain tab-activities">
        <div class="table table-activities">
            <div class="thead">
                <div class="td">{{translatesGet('ACTIVITY_THEAD-2')}}</div>
                <div class="td td-price">{{translatesGet('ACTIVITY_THEAD-3')}}</div>
                <div class="td">{{translatesGet('ACTIVITY_THEAD-4')}}</div>
                <div class="td td-date">{{translatesGet('ACTIVITY_THEAD-5')}}</div>
            </div>
                
            <div class="tr" v-for="item in this.currentlyVisibleActivities" :key="item">
                <div class="td td-category">
                    <div class="td-wrap td-wrap-category">
                        <!-- <i class="i-shopping-bag-line"></i> -->
                        <!-- <span>{{translatesGet('STATUS-SALE')}}</span> -->
                        <span>{{item.part}}</span>
                    </div>
                </div>
                <div class="td td-price">
                    <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token eth"></div> 
                            <span>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(item.amount),6),2)}} ETH</span>
                        </div>
                        <span class="td-light">≈ $ {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(item.amount)*currencyToUsdPrice,2),2)}}</span>
                    </div>
                </div>
                <div class="td" v-if="String(item.part_id).length>10"> 
                    <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>{{item.part_id.substring(0,6)+'...'+item.part_id.substring(38,42)}}</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
                <div class="td" v-else> 
                    <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>VoteID: {{item.part_id}}</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
                <div class="td td-date">
                    <div class="td-wrap">
                        {{getTimeString(item.timestamp)}} ago
                    </div>
                </div>
            </div>
            
            <div class="table-btn-row">
                <button class="btn btn-show-more" v-if="this.currentChunkyIndex < ((this.allActivitiesChunky.length)-1)" @click="showMoreActivities">
                    {{translatesGet('SHOW_MORE')}} 
                    <i class="i-arrow-down-s-line"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import MultiLang from "@/core/multilang";
import helpers from "@/helpers/helpers";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      useHelpers: helpers,
      lang: new MultiLang(this),
      allActivities:[],
      chunkSize:4,
      currentChunkyIndex:0,
      currentlyVisibleActivities: [],
      allActivitiesChunky: [],
    };
  },
  computed: {
    ...mapGetters(['getUsdRate']),
    currencyToUsdPrice() {
      return this.getUsdRate[`ETH`] ? this.getUsdRate[`ETH`] : 0
    }
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
        getTimeString(timeStampValue) {
            console.log(timeStampValue);
            let timeNow = Date.now() / 1000;
            let remTimeInSeconds = timeNow -timeStampValue;
            var sec_num = parseInt(remTimeInSeconds, 10);
            var days = Math.floor(sec_num / 86400);
            var hours = Math.floor((sec_num - (days * 86400)) / 3600);
            var minutes = Math.floor((sec_num - ((days * 86400) + (hours * 3600))) / 60);
            var seconds = sec_num - (days * 86400) - (hours * 3600) - (minutes * 60);
            // if (days < 10) { days = "0" + days; }
            if (hours < 10 & days>0) { hours = "0" + hours; }
            if (minutes < 10 & hours>0) { minutes = "0" + minutes; }
            if (seconds < 10 & minutes>0) { seconds = "0" + seconds; }
            if (days > 0) {
                return days + 'd:' + hours + 'h';
            } else if (hours>0){
                return hours + 'h:' + minutes + 'm';
            }
            else if (minutes>0){
                return minutes + 'm:' + seconds + 's';
            }
            else if (seconds>0){
                return seconds+'s';
            }
        },
        async showMoreActivities(){
            this.currentChunkyIndex+=1;
            this.currentlyVisibleActivities= this.currentlyVisibleActivities.concat(this.allActivitiesChunky[this.currentChunkyIndex]) ;
        }
  },
  async mounted(){
      await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult', { userAddress: null, collectionAddress: null, lotId: this.item.id });
      this.allActivities = this.$store.getters['marketplace/getActivitiesResult'];
      for (let i = 0; i < this.allActivities.length; i += this.chunkSize) {
          this.allActivitiesChunky.push(this.allActivities.slice(i, i + this.chunkSize));
      }
      this.currentlyVisibleActivities = this.currentlyVisibleActivities.concat(this.allActivitiesChunky[this.currentChunkyIndex])  
},
  props:['item']
};
</script>