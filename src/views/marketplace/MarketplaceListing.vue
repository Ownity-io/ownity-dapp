<template>
  <main>
    <div class="container">
      <section class="section-breadcrumbs">
        <div class="container">
          <Breadcrumbs />
        </div>
      </section>
    </div>
    <div class="container container-listing">
      <div class="card-listing">
        <section class="section-card-img">
          <div class="card-img-wrap">
            <img :src="srcTest" alt="img" />
          </div>
        </section>
        <div class="listing-main">
          <section class="section-listing-header">
            <div class="listing-header">
              <div class="collection-wrap">
                <div class="collection-img"></div>
                <div class="collection-data">
                  <span class="collection-id collection-label">
                    <span>Mutant Ape Yacht Club</span>
                    <i class="i-checkbox-circle-fill"></i>
                  </span>
                </div>
              </div>
              <div class="listing-additional-options">
                <div class="btn-wrap">
                  <button class="btn btn-block">
                    <i class="i-heart-3-line"></i>
                  </button>
                </div>
                <div class="btn-wrap">
                  <button class="btn btn-block">
                    <i class="i-refresh-line"></i>
                  </button>
                </div>
                <div class="btn-wrap btn-share">
                  <button class="btn btn-block">
                    <i class="i-share-line"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="listing-name">{{item.name}}</div>
            <div class="owned-row">
              Owned by <a href="#" target="_blank">{{String(item.owner).substring(0,6)+'...'+String(item.owner).substring(38,42)}}</a> <!-- TODO: href to etherscan-->
            </div>
          </section>

          <section class="section-listing-main">
            <div class="section-deposit">
              <div class="section-deposit-data">
                <div class="deposit-img"></div>
                <div class="deposit-data">
                  <div class="deposit-listened">Listened on OpenSea for</div>
                  <div class="deposit-value">
                    <div class="icon-token"></div>
                    <span>0.40 / <b>1 ETH</b> </span>
                  </div>
                </div>
              </div>
              <div class="section-deposit-btns">
                <button class="btn btn-deposit">Deposit part</button>
                <!-- <button class="btn btn-deposit">Start collecting</button>
                <button class="btn btn-deposit">Deposit part</button>
                <button class="btn btn-get">Get part back</button> -->
              </div>
            </div>
            <div
              class="section-members"
              :class="{ 'section-unfolded': !collapseMembers }"
            >
              <button class="btn-collapse" @click="collapseMembers = !collapseMembers">
                <div class="members-row">
                  <i class="i-account-circle-line"></i>
                  Members: <span>4</span>
                </div>
                <i class="i-arrow-down-s-line"></i>
              </button>
              <div class="section-unfolded-content">
                <div class="section-table-chart">
                  <div class="chart-wrap">chart-wrap</div>
                  <div class="table-chart-data">
                    <div class="table table-chart">
                      <div class="thead">
                        <div class="td">Owner</div>
                        <div class="td">Pct</div>
                        <div class="td td-price">Price</div>
                      </div>

                      <div class="tr">
                        <div class="td">
                          <a
                            class="td-wrap"
                            href=""
                            target="_blank"
                            rel="nofollow"
                          >
                            <span>0x4Eb4…53C7</span>
                          </a>
                        </div>
                        <div class="td">
                          <div class="td-wrap">20%</div>
                        </div>
                        <div class="td td-price">
                          <div class="td-wrap">
                            <div class="td-wrap-price">
                              <div class="icon-token"></div>
                              <span>0.20 ETH</span>
                              <span class="td-light">≈ $ 1000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="section-listing-tabs">
            <ul class="tabs">
              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingInfo' }"
                  @click="letsCheck('ListingInfo')"
                >
                <span>Info</span>
                <span>Info</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingProperties' }"
                  @click="letsCheck('ListingProperties')"
                >
                <span>Properties</span>
                <span>Properties</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingAbout' }"
                  @click="letsCheck('ListingAbout')"
                >
                <span>About Collection</span>
                <span>About Collection</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingActivities' }"
                  @click="letsCheck('ListingActivities')"
                >
                <span>Activities</span>
                <span>Activities</span>
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingChat' }"
                  @click="letsCheck('ListingChat')"
                >
                <span>Chat</span>
                <span>Chat</span>
                </button>
              </li>
            </ul>

            <div class="listing-selected-tab">
              <ListingInfo v-if="activeTab === 'ListingInfo'" />
              <ListingProperties v-if="activeTab === 'ListingProperties'" />
              <ListingAbout v-if="activeTab === 'ListingAbout'" />
              <ListingActivities v-if="activeTab === 'ListingActivities'" />
              <ListingChat v-if="activeTab === 'ListingChat'" />
            </div>
          </section>
        </div>
      </div>
    </div>
    <section class="section-recommendation">
      <div class="container">
        <!-- <RecommendationsList /> -->
      </div>
    </section>
  </main>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import RecommendationsList from "@/components/RecommendationsList.vue";
import ListingInfo from "@/components/listing/ListingInfo.vue";
import ListingProperties from "@/components/listing/ListingProperties.vue";
import ListingAbout from "@/components/listing/ListingAbout.vue";
import ListingActivities from "@/components/listing/ListingActivities.vue";
import ListingChat from "@/components/listing/ListingChat.vue";

export default {
  data() {
    return {
      activeTab: "",
      srcTest: "../../assets/images/test-bg.png",
      collapseMembers: false,
      item:{}
    };
  },
  components: {
    Breadcrumbs,
    RecommendationsList,
    ListingInfo,
    ListingProperties,
    ListingAbout,
    ListingActivities,
    ListingChat,
  },
  async mounted() {
    this.activeTab = "ListingInfo";
    await this.getAndSetListingInfo();
  },
  methods: {
    letsCheck(name) {
      this.activeTab = name;
    },
    async getAndSetListingInfo(){
      await this.$store.dispatch('marketplaceListing/getAndSetItem',this.$route.params.id);
      this.item = await this.$store.getters['marketplaceListing/getItem'];
    }
  },
};
</script>
