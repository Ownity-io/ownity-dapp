<template>
  <div class="modal">
    <div class="modal-wrapper modal-claim">
      <div class="modal-header">
        <div class="modal-name">
            {{ translatesGet('FRACTION_ACTIVITY') }}
        </div>
        <button class="btn-close">
          <i class="i-close-line"></i>
        </button>
      </div>

      <div class="modal-content">
        <div class="modal-container">
            <div class="modal-members">
                <i class="i-account-circle-line"></i>
                {{translatesGet('MEMBERS_VOTED')}}: <span>1/6</span>
            </div>
            <div class="modal-table">

            <div class="tab-contain">
                <div class="table table-fraction">
                    <div class="thead">
                        <div class="td">{{translatesGet('ACTIVITY_THEAD-8')}}</div>
                        <div class="td td-price">{{translatesGet('ACTIVITY_THEAD-6')}}</div>
                        <div class="td">{{translatesGet('ACTIVITY_THEAD-7')}}</div>
                    </div>
                        
                    <div class="tr">
                        <div class="td td-owner">
                            <div class="td-wrap">
                                <span>0x4Eb4…53C7</span>
                                <span class="label-owner">
                                    {{translatesGet('YOU')}}
                                </span>
                            </div>
                        </div>
                        <div class="td td-price">
                            <div class="td-wrap">
                                20%
                            </div>
                        </div>
                        <div class="td"> 
                            <div class="td-wrap td-wrap-vote" >
                                <span>{{translatesGet('NOT_VOTE')}} </span>
                            </div> 
                        </div>
                    </div>
                    
                    <div class="table-btn-row">
                        <button class="btn btn-show-more">
                            {{translatesGet('SHOW_MORE')}} 
                            <i class="i-arrow-down-s-line"></i>
                        </button>
                    </div>
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
        }
    },
    methods:{
        translatesGet(key) {
            return this.lang.get(key);
        },
    },
}
</script>