<template>
  <div class="card card-previous" v-for="card in cards" :key="cards">
    <div class="card-main">
      <div href="" class="card-img">
        <img />
      </div>
    </div>
    <div class="card-data">
      <div class="data-table">
        <div class="data-tr data-tr-main">
          <!-- <div class="card-id card-id-full">hjhhuhi</div> -->
          <div class="data-td">
            <a class="card-previous-collection collection-id">
              <img class="card-previous-collection-img" src="@/assets/images/logos.png"/>
              <span>{{card.collection}}</span>
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
          <span>{{card.name }}</span>
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
                  <span
                    >{{card.price}}ETH</span>
                </div>
              </div>
              <p>30%</p>
            </div>
          </div>
        </div>

        <div class="data-tr">
          <div class="prev-card-status green">
            Comming soon
          </div>
          <div class="prev-card-contributors">
            Contributors: 23
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
      cards: [
	      {
					name: 'MAYC #12625',
          collection: 'Mutant Ape Yacht Club',
          price: '29'
				},
	      {
		      name: 'MAYC #25986',
		      collection: 'Mutant Ape Yacht Club',
		      price: '17.45'
	      },
	      {
		      name: 'BAYC #5699',
		      collection: 'Bored Ape Yacht Club',
		      price: '200'
	      },
	      {
		      name: 'OFO #9429',
		      collection: 'Otherdeed for Otherside',
		      price: '69.95'
	      }
      ]
    };
  },
  methods: {
    translatesGet(key) {
      return this.lang.get(key);
    },
  },
};
</script>

<style>
@media (max-width: 680px) {
    .data-tr {
        display: block;
    }

    .prev-card-status {
        font-size: 12px;
        line-height: 150%;
    }

    .prev-card-status:after {
        transform: translateY(20%);
    }
    .prev-card-contributors {
        font-size: 12px;
        margin-top: 4px;
    }
    .card-prev-amount {
        display: block;
        margin: 0;
    }
    .card-prev-amount .card-value {
        border-right: none;
    }
    .card-col-value{
        font-size: 18px;
    }
    .prev-amount-block {
        justify-content: space-between;
    }
    .data-id span {
        font-size: 14px;
    }
    .card-previous-collection-img span {
        font-size: 12px;
    }
    .card-prev-amount {
        padding: 8px 8px 12px 8px;
    }
    .card-previous-collection img.card-previous-collection-img {
        height: 16px;
        min-width: 16px;
        width: 16px;
        top: 2px;
    }
    .card-previous-collection {
        padding-left: 24px;
    }
    .previous-cards-list .cards-container {
        gap: 8px;
    }
    .container{
        padding-left: 6px;
        padding-right: 6px;
    }
    .card-value .card-col-value strong{
        font-size: 20px;
    }
}
</style>
