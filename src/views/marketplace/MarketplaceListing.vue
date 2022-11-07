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
            <div class="listing-name">BoredApeYachtClub #27866</div>
            <div class="owned-row">
              Owned by <a href="#" target="_blank">0x4Eb4…53C7</a>
            </div>
          </section>

          <section class="section-listing-main"></section>

          <section class="section-listing-tabs">
            <ul class="tabs">
              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingInfo' }"
                  @click="letsCheck('ListingInfo')"
                >
                  Info
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingProperties' }"
                  @click="letsCheck('ListingProperties')"
                >
                  Properties
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingAbout' }"
                  @click="letsCheck('ListingAbout')"
                >
                  About Collection
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingActivities' }"
                  @click="letsCheck('ListingActivities')"
                >
                  Activities
                </button>
              </li>

              <li>
                <button
                  :class="{ 'active-tab': activeTab === 'ListingChat' }"
                  @click="letsCheck('ListingChat')"
                >
                  Chat
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
  mounted() {
    this.activeTab = "ListingInfo";
  },
  methods: {
    letsCheck(name) {
      this.activeTab = name;
    },
  },
};
</script>
