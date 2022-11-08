<template>
  <div class="modal modal-connect">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Connect Your Wallet</div>
        <div class="btn-close">
          <i class="i-close-line"></i>
        </div>
      </div>
      <div class="modal-content">
        <div class="modal-container">
          <div class="modal-describe">
            Sign in with your wallet or create one to start your Marketplace
          </div>
          <div class="modal-connect-btns">
            <button class="btn btn-modal-connect">
              <div class="icon-btn-connect meta-mask"></div>
              <span>MetaMask</span>
            </button>
            <button class="btn btn-modal-connect">
              <div class="icon-btn-connect wallet-connect"></div>
              <span>WalletConnect</span>
            </button>
          </div>
          <p class="modal-p">
            We don`t hold private keys of our users and can`t access your funds without
            your say-so.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
