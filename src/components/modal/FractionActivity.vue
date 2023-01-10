<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper-close" @click="this.$store.dispatch('appGlobal/setShowVoteInfoModal',false)"></div>
    <div class="modal-wrapper modal-claim">
      <div class="modal-header">
        <div class="modal-name">
            {{ translatesGet('FRACTION_ACTIVITY') }}
        </div>
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setShowVoteInfoModal',false)">
          <i class="i-close-line"></i>
        </button>
      </div>

      <div class="modal-content">
        <div class="modal-container">
            <div class="modal-members">
                <i class="i-account-circle-line"></i>
                {{translatesGet('MEMBERS_VOTED')}}: <span>{{this.voting.users.length}}/{{this.item.bids.length}}</span>
            </div>
            <div class="modal-table">

            <div class="tab-contain">
                <div class="table table-fraction">
                    <div class="thead">
                        <div class="td">{{translatesGet('ACTIVITY_THEAD-8')}}</div>
                        <div class="td td-price">{{translatesGet('ACTIVITY_THEAD-6')}}</div>
                        <div class="td">{{translatesGet('ACTIVITY_THEAD-7')}}</div>
                    </div>
                    
                    <div class="tr" v-for="user in users">
                        <div class="td td-owner">
                            <div class="td-wrap">
                                <span>{{user.address}}</span>
                                <span class="label-owner" v-if="user.address==this.userAddress">
                                    {{translatesGet('YOU')}}
                                </span>
                            </div>
                        </div>
                        <div class="td td-price">
                            <div class="td-wrap">
                                {{user.fraction}}%
                            </div>
                        </div>
                        <div class="td"> 
                            <div class="td-wrap td-wrap-vote">
                                <span v-if="!user.voted">{{translatesGet('NOT_VOTE')}} </span>
                                <span class="td-completed" v-else>
                                    <i class="i-thumb-up-line "></i> 
                                    {{translatesGet('VOTE_CONFIRM')}}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- <div class="table-btn-row">
                        <button class="btn btn-show-more">
                            {{translatesGet('SHOW_MORE')}} 
                            <i class="i-arrow-down-s-line"></i>
                        </button>
                    </div> -->
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import MultiLang from "@/core/multilang";

export default {
    data() {
        return {
            lang: new MultiLang(this),
            voting:null,
            item:null,
            users:null,
            render:false,
            userAddress:null
        }
    },
    methods:{
        translatesGet(key) {
            return this.lang.get(key);
        },
    },
    async mounted(){
        this.voting = await this.$store.getters['appGlobal/getCurrentVoting'];
        this.item = await this.$store.getters['marketplaceListing/getItem'];
        let users = []
        for (let bid of this.item.bids){
            let user = {
                address: bid.address,
                fraction: parseInt(bid.fraction),
                voted:false
            }
            users.push(user)
        }
        let k=0;
        for (let userAddress of this.voting.users){
            k = 0;
            for (let user of users){
               
                if (user.address==userAddress.address){
                    user.voted=true;
                    users[k] = user;
                }
                k=k+1;
            }
        }
        this.users = users;
        this.userAddress=localStorage.getItem('userAddress');
        this.render = true;
    }
}
</script>