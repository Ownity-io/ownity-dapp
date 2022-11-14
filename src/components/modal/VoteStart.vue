<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Vote</div>
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
              <div class="modal-data-block">
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
            </div>
          </div>

          <div class="modal-section-filter">
            <div class="modal-section-name">Choose marketplace</div>
            <div class="modal-filter">
              <ul class="filter-ul">
                <li class="filter-li">
                  <div class="input-checkbox">
                    <input type="checkbox" />
                    <label >
                      <div class="icon-filter-checkbox"></div>
                      <span>OpenSea</span>
                      <i class="i-check-line"></i>
                    </label>
                  </div>
                </li>
                <li class="filter-li">
                  <div class="input-checkbox">
                    <input type="checkbox" />
                    <label >
                      <div class="icon-filter-checkbox"></div>
                      <span>LooksRare</span>
                      <i class="i-check-line"></i>
                    </label>
                  </div>
                </li>
                <li class="filter-li">
                  <div class="input-checkbox">
                    <input type="checkbox" />
                    <label >
                      <div class="icon-filter-checkbox"></div>
                      <span>X2Y2</span>
                      <i class="i-check-line"></i>
                    </label>
                  </div>
                </li>
              </ul>
              
            </div>
          </div>

          <button class="btn btn-modal-main">Start vote</button>
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
