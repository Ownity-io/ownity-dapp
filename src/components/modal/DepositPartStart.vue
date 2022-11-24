<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Deposit part</div>
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
              <div class="modal-data-block modal-select-part">
                <div class="input-select-block">
                  <div class="input-select-title">Choose part</div>
                  <div class="input-select-wrap" :class="{ 'unfolded': selectOpen }">
                    <button
                      class="input-selected"
                      @click="selectOpen = !selectOpen"
                    >
                      <span>0%</span>
                      <i class="i-arrow-down-s-line"></i>
                    </button>
                    <div class="drop-down">
                      <ul>
                        <li>
                          <span>5%</span>
                        </li>
                        <li>
                          <span>10%</span>
                        </li>
                        <li>
                          <span>15%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="input-select-prompt">Min 1% to Max 10%</div>
                </div>
              </div>
              <div class="modal-data-block modal-data-block-price">
                <div class="price-block">
                  <div class="price-block-title">Min 5% to Max 20%</div>
                  <div class="price-block-value price-value">
                    <div class="icon-value"></div>
                    <span>0.10 ETH</span>
                  </div>
                  <div class="price-block-equivalent equivalent">≈ $ 100</div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-section-total">
            <div class="total-block">
              <div class="total-block-row">
                <div class="total-block-name">Total:</div>
                <div class="total-block-value">
                  <div class="total-amount">
                    <div class="icon-value"></div>
                    <b>0.103 ETH</b><span>≈ $ 103K</span>
                  </div>
                  <div class="total-fees">Fees:<span>3%</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="total-block-describe">
            The marketplace charges a fee for each transaction.
            <a href="#">Terms of Use</a>
          </div>
          <button class="btn btn-modal-main btn-modal-desktop">Deposit part</button>
        </div>
      </div>
            
      <div class="modal-mobile-footer">
        <button class="btn btn-modal-main">Deposit part</button>
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
