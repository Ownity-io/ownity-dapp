<template>
  <main>
    <div class="container">
      <section class="section-breadcrumbs">
        <div class="container">
          <Breadcrumbs />
        </div>
      </section>
    </div>
    <div class="container">
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
          <section class="section-listing-tabs"></section>
        </div>
      </div>
    </div>
    <section class="section-recommendation">
      <div class="container">
        <RecommendationsList />
      </div>
    </section>
  </main>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import RecommendationsList from "@/components/RecommendationsList.vue";

export default {
  data() {
    return {
      srcTest: "../../assets/images/test-bg.png",
    };
  },
  components: {
    Breadcrumbs,
    RecommendationsList,
  },
};
</script>
