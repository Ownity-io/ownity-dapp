<template>
    <div>
        <div class="table table-activity">
            <div class="thead">
                <div class="td td-collection"><span>Collection</span></div>
                <div class="td">Category</div>
                <div class="td td-price">Price</div>
                <div class="td">Tx</div>
                <div class="td td-date">Date</div>
            </div>
                
            <div class="tr" :class="{'tr-mob-collapse' : !rowMobileCollapse}">
                <div class="td">
                    <div class="td-wrap td-wrap-collection">
                        <div class="collection-img"></div>
                        <div class="collection-data">
                            <span class="collection-id">18234</span>
                            <span class="td-light collection-id">Mutant Ape Yacht Club</span>
                        </div>
                    </div>
                </div>
                <div class="td td-category">
                    <div class="td-wrap td-wrap-category">
                        <i class="i-coupon-3-line"></i>
                        <div>Collection</div>
                        <div class="td-light">Start</div>
                    </div>
                    <div class="td-wrap td-wrap-category">
                        <i class="i-coupon-3-line"></i>
                        <div>Collection</div>
                        <div class="td-light">Сancellation</div>
                    </div>
                    <div class="td-wrap td-wrap-category">
                        <i class="i-shopping-bag-line"></i>
                        <div>Sale</div>
                    </div>
                    <div class="td-wrap td-wrap-category">
                        <i class="i-volume-vibrate-line"></i>
                        <div>Voite</div>
                        <div class="td-light">Start</div>
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
                <div class="td td-tx"> 
                    <div class="td-mob-title">Tx</div>
                    <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>a1565...d48d</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
                <div class="td td-date">
                    <div class="td-mob-title">Date</div>
                    <div class="td-wrap">
                        5 minutes ago
                    </div>
                </div>
                <button class="btn-mobile-tr-collapse" @click="rowMobileCollapse = !rowMobileCollapse">
                    <i class="i-arrow-down-s-line"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            rowMobileCollapse: false,
        }
    }
}
</script>