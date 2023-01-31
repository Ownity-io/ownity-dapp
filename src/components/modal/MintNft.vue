<template>
    <div class="modal modal-mint">
      <div class="modal-wrapper-close"></div>
      <div class="modal-wrapper">
        <div class="modal-header">
            <div class="modal-name">Mint NFT</div>
            <button class="btn-close">
                <i class="i-close-line"></i>
            </button>
        </div>
        <div class="modal-content">
          <div class="modal-container">
            <div class="modal-container-cards">
                <div class="modal-cards-wrapper">

                    <!-- card -->
                    <div class="card">
                        <div class="card-main">
                            <div class="loading"></div> <!--  used when loading-->

                            <div class="card-img"
                            ></div>

                            <div class="card-header">
                              <a  class="icon-card-label" target="_blank" ></a>
                          

                              <button class="btn-like"  >
                                <i class="i-heart-3-fill"></i>
                                <i class="i-heart-3-line"></i>
                              </button>
                            </div>
                        </div>
                        <div class="card-data">
                          <div class="data-table">
                            <div class="data-tr data-tr-main">

                              <!-- <div class="card-id card-id-full">
                                <div class="data-td">
                                  <div class="card-id">
                                    <a href="">
                                      <span>full name in hover</span>
                                    </a>
                                  </div>
                                </div>
                              </div> -->

                              <div class="data-td">
                                <div class="card-id">
                                  18234
                                </div>
                                <a href="#">
                                  <span>Mutant Ape Yacht Club</span>
                                </a>
                              </div>

                              <div class="data-td data-td-value">
                                <div class="card-value">
                                  <div class="icon-value"></div>
                                  <span>
                                    <b>10{{' '}}</b>points</span>
                                </div>
                              </div>

                            </div>
                          </div>
                          <div class="btn-container">

                            <button class="btn" >
                              Mint NFT
                            </button>
                          </div>

                        </div>
                    </div>

                </div>
                
                <button class="btn-more-nft">
                  More NFT
                </button> 
           </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    methods:{
    },
    data(){
      return{
      }
    }
  }
  </script>