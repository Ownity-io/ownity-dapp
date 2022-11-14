<template>
  <div class="modal">
    <div class="modal-wrapper modal-confirm-vote">
      <div class="modal-header">
        <div class="modal-name">Vote confirm</div>
        <button class="btn-close">
          <i class="i-close-line"></i>
        </button>
      </div>

      <div class="modal-content">
        <div class="modal-container">
          <div class="modal-section-nft-data">
            <div class="modal-nft-data">
              <div class="icon-nft"></div>
              <div class="nft-data">
                <div class="nft-id">18234</div>
                <div>Mutant Ape Yacht Club</div>
              </div>
            </div>
          </div>

          <div class="modal-section-main-data">
            <div class="modal-main-data-container">
              <div class="modal-data-block modal-nft-block">
                List your NFT to sell on
                <div class="nft-block">
                  <div class="icon-nft-block"></div>
                  <span>OpenSea</span>
                </div>
              </div>
              <div class="modal-data-block modal-data-block-price">
                <div class="price-block">
                  <div class="price-block-title">Price</div>
                  <div class="price-block-value price-value">
                    <div class="icon-value"></div>
                    <span>20 ETH</span>
                  </div>
                  <div class="price-block-equivalent equivalent">≈ $ 100</div>
                </div>
              </div>
            </div>
          </div>
          
          <button class="btn btn-modal-main">Confirm your part</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
