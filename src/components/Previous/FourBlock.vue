<template>
  <div class="top-collection">
    <p class="top-collection-title">Top Collections</p>
    <p class="top-collection-subtitle">
      Explore all the top collections from the largest marketplaces and initiate a deal opening by contributing the minimum part.
    </p>
    <div class="collection-wrapper">
      <div class="table table-top-collections">
        <div class="thead">
          <div class="td td-collection">
                    <span>
                      Collection
                    </span>
          </div>
          <div class="td td-price">
            Volume
          </div>
          <div class="td td-price">
            Floor price
          </div>
          <div class="td td-data">
            Owners
          </div>
          <div class="td td-data">
            Supply
          </div>
        </div>

        <div class="tr">

          <div class="td td-collection">
            <div class="td-wrap td-wrap-collection">
              <div class="collection-img"></div>
              <a class="collection-data">
                <span class="collection-id">name</span>
              </a>
            </div>
          </div>

          <div class="td td-price">
            <div class="td-wrap">
              <div class="td-wrap-price">
                <div class="icon-token"></div>
                <span>1000 ETH</span>
              </div>
              <!-- <span class="td-light">≈ $ 1000</span> -->
            </div>
          </div>

          <div class="td td-price">
            <div class="td-wrap">
              <div class="td-wrap-price">
                <div class="icon-token"></div>
                <span>1000 ETH</span>
              </div>
              <!-- <span class="td-light">≈ $ 1000</span> -->
            </div>
          </div>

          <div class="td td-data">
            <div class="td-wrap">
              holders
            </div>
          </div>

          <div class="td td-data">
            <div class="td-wrap">
              total sup
            </div>
          </div>

        </div>
      </div>
      <div class="collection-design">
        <button class="btn btn-previous">
          See All Collections
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
	name: "FourBlock",
  data() {
		return {

    }
  }
}
</script>

<style scoped>

</style>