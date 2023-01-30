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
              <div class="card-previous-collection-img" :class="card.links"/>
              <span>{{card.collection}}</span>
              <i class="i-checkbox-circle-fill"></i>
            </a>
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
              <p>Total Raised:</p>
            </div>
            <div class="prev-amount-block">
              <div class="card-value">
                <div class="icon-value"></div>
                <div class="card-col-value">
                  <span
                    >{{card.price}}ETH</span>
                </div>
              </div>
              <p>{{ card.procent }}%</p>
            </div>
          </div>
        </div>

        <div class="data-tr">
          <div class="prev-card-status green">
            Live
            <!-- Live / Scheduled / Сompleted / Canceled -->
          </div>
          <div class="prev-card-contributors">
            Members: 23
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
          price: '29',
          links: 'link-1',
          procent: '27'
				},
	      {
		      name: 'MAYC #25986',
		      collection: 'Mutant Ape Yacht Club',
		      price: '17.45',
		      links: 'link-2',
		      procent: '38'
	      },
	      {
		      name: 'BAYC #5699',
		      collection: 'Bored Ape Yacht Club',
		      price: '200',
		      links: 'link-3',
		      procent: '41'

	      },
	      {
		      name: 'OFO #9429',
		      collection: 'Otherdeed for Otherside',
		      price: '69.95',
		      links: 'link-4',
		      procent: '32'

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
