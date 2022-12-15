<template>
    <div class="tab-contain tab-activities">
        <div class="table table-activities">
            <div class="thead">
                <div class="td">{{translatesGet('ACTIVITY_THEAD-2')}}</div>
                <div class="td td-price">{{translatesGet('ACTIVITY_THEAD-3')}}</div>
                <div class="td">{{translatesGet('ACTIVITY_THEAD-4')}}</div>
                <div class="td td-date">{{translatesGet('ACTIVITY_THEAD-5')}}</div>
            </div>
                
            <div class="tr">
                <div class="td td-category">
                    <div class="td-wrap td-wrap-category">
                        <i class="i-shopping-bag-line"></i>
                        <span>{{translatesGet('STATUS-SALE')}}</span>
                    </div>
                </div>
                <div class="td td-price">
                    <div class="td-wrap">
                        <div class="td-wrap-price">
                            <div class="icon-token"></div> 
                            <span>12.90 ETH</span>
                        </div>
                        <span class="td-light">≈ $ 1000</span>
                    </div>
                </div>
                <div class="td"> 
                    <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>a1565...d48d</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
                <div class="td td-date">
                    <div class="td-wrap">
                        5 minutes ago
                    </div>
                </div>
            </div>
            
            <div class="table-btn-row">
                <button class="btn btn-show-more">{{translatesGet('SHOW_MORE')}} 
                    <i class="i-arrow-down-s-line"></i>
                </button>
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
    };
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
};
</script>