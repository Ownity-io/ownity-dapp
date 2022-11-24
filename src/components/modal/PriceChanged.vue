<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">The price has changed</div>
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

          <div class="modal-section-amount">
            <div class="modal-amount-title">
              The new price for the NFT you were collecting on
            </div>
            <div class="token-value">
              <div class="icon-value"></div>
              0.20 ETH
              <span class="input-equivalent equivalent">(≈ $ 200)</span>
            </div>
          </div>

          <button class="btn btn-modal-main btn-modal-desktop">Show</button>
        </div>
      </div>
            
      <div class="modal-mobile-footer">
        <button class="btn btn-modal-main">Show</button>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectOpen: false,
    };
  },
};
</script>
