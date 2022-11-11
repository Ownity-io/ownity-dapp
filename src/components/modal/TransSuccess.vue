<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <!-- <div class="modal-name">Connect Your Wallet</div> -->
        <button class="btn-close" >
          <i class="i-close-line"></i>
        </button>
      </div>
      <div class="modal-header-img">
        <div class="icon-congrats"> </div>
        <div class="modal-header-img-name">
          You have successfully transaction
        </div>
      </div>
      
      <div class="modal-content">
        <div class="modal-container">
          <div class="table table-modal table-modal-trans">
              <div class="thead">
                  <div class="td">Status</div>
                  <div class="td">Tx</div>
              </div>
                  
              <div class="tr">
                  <div class="td">
                      <div class="td-wrap td-wrap-completed">
                          <span>Completed</span>
                      </div>
                  </div>
                  <div class="td"> 
                      <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                          <span>a1565...d48d</span>
                          <i class="i-external-link-line"></i>
                      </a> 
                  </div>
              </div>
              
              <!-- <div class="table-btn-row">
                  <button class="btn btn-show-more">Show more <i class="i-arrow-down-s-line"></i></button>
              </div> -->
          </div>
          <button class="btn btn-modal-main">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>
