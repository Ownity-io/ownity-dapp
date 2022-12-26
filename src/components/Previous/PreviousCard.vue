<template>
  <a class="card card-previous">
    <div class="card-main">
      <a href="" class="card-img">
        <img />
      </a>
    </div>
    <div class="card-data">
      <div class="data-table">
        <div class="data-tr data-tr-main">
          <!-- <div class="card-id card-id-full">hjhhuhi</div> -->
          <div class="data-td">
            <a class="card-previous-collection collection-id">
              <img class="card-previous-collection-img" />
              <span>item collection</span>
              <i class="i-checkbox-circle-fill"></i
            ></a>
          </div>
          <!-- <div class="data-td data-td-value">
            <div class="card-value">
              <div class="icon-value"></div>
              <span><b>34567</b>ETH</span>
            </div>
            <div class="equivalent">≈ $ 456</div>
          </div> -->
        </div>

        <div class="data-tr data-id">
          <span>MAYC #23378</span>
        </div>

        <div class="data-tr data-prev-amount">
          <div class="card-prev-amount">
            <div>
              <p>Raised amount:</p>
            </div>
            <div class="prev-amount-block">
              <div class="card-value">
                <div class="icon-value"></div>
                <div class="card-col-value">
                  <strong
                    >5
                    ETH</strong>
                </div>
              </div>
              <p>30%</p>
            </div>
          </div>
        </div>

        <div class="data-tr">
          <div class="prev-card-status green">
            Sale Live
          </div>
          <div class="prev-card-contributors">
            Contributors: 23
          </div>
        </div>

      </div>
    </div>
  </a>
</template>

<script>
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      testLike: false,
      allProgressValue: 0,
      userProgressValue: 0,
      currencyToUsdPrice: 1,
      priceInCurrency: 1,
      showMore: false,
      showFullName: false,
      allBidsAmount: 0,
      userBidAmount: 0,
      linkToMarketplacePage: null,
      remainTimeString: null,
      likeChecked: false,
      voting: null,
      userVoted: false,
      itemWithBidsOnSale: null,
      bidOnSale: null,
      render: false,
      userBidOnSale: null,
      lang: new MultiLang(this),
      showUserBidOnSale: false,
    };
  },
  methods: {
    translatesGet(key) {
      return this.lang.get(key);
    },
  },
};
</script>
