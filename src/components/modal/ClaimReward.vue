<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Claim reward</div>
        <button class="btn-close">
          <i class="i-close-line"></i>
        </button>
      </div>

      <div class="modal-content">
        <div class="modal-container">
          <div class="modal-section-amount">
            <div class="modal-amount-title">Your amount to be credited to the wallet</div>
            <div class="token-value">
              <div class="icon-value"></div>
              0.20 ETH
              <span class="input-equivalent equivalent">(≈ $ 200)</span>
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
                  <!-- <div class="total-fees">Fees:<span>3%</span></div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="total-block-describe">
            The marketplace charges a fee for each transaction.
            <a href="#">Terms of Use</a>
          </div>
          <button class="btn btn-modal-main">Claim reward</button>
        </div>
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
