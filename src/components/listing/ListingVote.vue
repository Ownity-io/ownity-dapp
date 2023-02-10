<template>
    <div class="block-vote">
      <div class="vote-data section-deposit-data">       
        <div class="deposit-img-container">
          <a target="_blank" href="#" class="deposit-img" :style="{backgroundImage: `url(${this.voting.marketplace.logo})`}"></a> 
          <div class="deposit-img-type">
              <!-- <span v-if="this.voting.type=='CANCEL'">CANCELED</span> -->
              <i class="i-arrow-go-back-line" v-if="this.voting.type=='CANCEL'" 
              ></i>
              <i class="i-shopping-bag-line" v-else 
              ></i>
          </div>
        </div>

        <div class="deposit-data">
          <div class="deposit-listened">
            <a href="#">{{translatesGet('LISTING_PRICE_TO')}} {{this.voting.marketplace.name}}</a>
          </div>
          <div class="deposit-value">
            <div class="icon-token eth"></div>
            <span><b>{{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.voting.amount),6),2)}} ETH</b></span>
            <span class="equivalent">(≈ $ {{useHelpers.abbrNum(useHelpers.toFixedIfNecessary(useHelpers.convertToEther(this.voting.amount)* currencyToUsdPrice,2),2,2)}})</span>
          </div>
        </div>
      <div class="vote-btn-container">
        <!-- display if user logged and already votes -->
        <button class="btn btn-cancel" v-if="userLogged & this.allVotedPercentage>=51 & userBidAmount>0 & this.voting.type!='CANCEL' & this.voting.status!='ON SALE' & !inactive"
          @click="this.$store.dispatch('appGlobal/setCancellSellVotingModal',true);this.$store.dispatch('appGlobal/setCurrentVoting',this.voting);">
            {{translatesGet('CANCEL')}}
        </button>
        <!-- display if user logged and not votes yet -->
        <button class="btn btn-vote" v-else-if="userLogged & this.allVotedPercentage<51 & !userVoted & userBidAmount>0 & !inactive"
        @click="this.$store.dispatch('appGlobal/setShowVoteConfirmModal',true);this.$store.dispatch('appGlobal/setCurrentVoting',this.voting);">
            <i class="i-thumb-up-line"></i>
            <span>{{translatesGet('CONFIRM')}}</span>
        </button>
      </div>
      </div>

      <div class="vote-progress-container"  v-if="!inactive">
        <div class="data-counter" >{{translatesGet('MEMBERS_VOTED')}}: {{this.voting.count}}/{{this.item.bids.length}}</div>
        <div class="vote-progress-row">
          <div class="card-progress progress">
            <!-- <div
              class="progress-value owner"
              style="width: 40%"
            > -->
            <div
              class="progress-value"
              :style="{width: `${allVotedPercentage}%`}"
            >
              <span>{{allVotedPercentage}}%</span>
            </div>
            <div class="progress-value" style=" width: 20%, 'padding-left' :  20% ">
              <span>20%</span>
            </div>
          </div>
          <button class="btn-vote-more" @click="this.$store.dispatch('appGlobal/setCurrentVoting',this.voting);this.$store.dispatch('appGlobal/setShowVoteInfoModal',true)">
            <i class="i-more-2-line"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="block-vote">
      <div class="vote-data section-deposit-data">
        <a href="#" class="deposit-img"></a>

        <div class="deposit-data">
          <div class="deposit-listened">
            <a href="#">Listing price to OpenSea</a>
          </div>
          <div class="deposit-value">
            <div class="icon-token eth"></div>
            <span><b>2 ETH</b></span>
            <span class="equivalent">(≈ $ 2K)</span>
          </div>
        </div>
      <div class="vote-btn-container">
        <button class="btn btn-vote">
            <i class="i-thumb-up-line"></i>
            <span>Confirm</span>
        </button>
      </div>
      </div>

      <div class="vote-progress-container">
        <div>Members voted: 1/6</div>
        <div class="card-progress progress">
          <div
            class="progress-value owner"
            style="width: 40%"
          >
            <span>40%</span>
          </div>
          <div class="progress-value" style=" width: 20%, 'padding-left' :  20% ">
            <span>20%</span>
          </div>
        </div>
      </div>
    </div> -->

</template>

<script>
import MultiLang from "@/core/multilang";
import { ethers } from 'ethers';
import helpers from "@/helpers/helpers";
import {mapGetters} from "vuex";

export default{
  props:['item','voting','inactive'],
  data(){
    return{
      useHelpers: helpers,
      userLogged:false,
      userVoted:false,
      userBidAmount:null,
      lang: new MultiLang(this),
      allVotedPercentage:0
    }
  },
  computed: {
    ...mapGetters(['getUsdRate']),
    currencyToUsdPrice() {
      return this.getUsdRate ? this.getUsdRate[`${this.item.currency.ticker}`] : 0
    }
  },
  methods:{
    async setUserVotedAndLogged(){
      let userAddress = localStorage.getItem('userAddress');
      if (userAddress!=null & userAddress!='null'){
        this.userLogged = true;
        for (let user of this.voting.users){
          if (user.address == userAddress){
            this.userVoted=true;
          }
          for (let element of this.item.bids){
          if (element.address == user.address){
            this.allVotedPercentage += parseInt(element.fraction);
          }
        }
        }
      }
      else{
        this.userLogged = false;
      }
    },
    async setUserBidAmount(){
      let userAddress = localStorage.getItem('userAddress');
      this.userAddress = userAddress;
      if (this.item.bids!=null & userAddress!=null & userAddress!='null'){
        for (let element of this.item.bids){
          if (element.address == userAddress){
            this.userBidAmount = parseInt(element.amount);
            return;
          }
        }
        return
      }
      this.userBidAmount=0;      
    },
    translatesGet(key) {
        return this.lang.get(key);
    },
  },
  async mounted(){
    await this.setUserVotedAndLogged();
    await this.setUserBidAmount();
  }
}

</script>