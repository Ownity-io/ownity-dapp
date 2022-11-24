<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Sell your NFT</div>
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
            <div class="modal-main-data-container modal-main-input-select">
              <div class="modal-data-block modal-data-block-price">
                <div class="modal-input container-input">
                  <div class="input-header">
                    <div>Price</div>
                    <div class="price-value">
                      <div class="icon-value"></div>
                      <span>ETH</span>
                    </div>
                  </div>
                  <div class="input-wrapper input-wrapper-amount">
                    <input type="text" placeholder="Input amount">
                    <div class="input-equivalent equivalent">≈ $ 20K</div>
                  </div>
                  <div class="input-prompt">Item will be on sale until you cancelled</div>
                </div>
              </div>
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
          <button class="btn btn-modal-main btn-modal-desktop">Sell</button>
        </div>
      </div>
            
      <div class="modal-mobile-footer">
        <button class="btn btn-modal-main">Sell</button>
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
