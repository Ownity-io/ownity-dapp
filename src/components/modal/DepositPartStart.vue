<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper">
      <div class="modal-header">
        <div class="modal-name">Deposit part</div>
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setshowStartCollectingModal',false)">
          <i class="i-close-line"></i>
        </button>
      </div>

      <div class="modal-content">
        <div class="modal-container">
          <div class="modal-section-nft-data">
            <div class="modal-nft-data">
              <div class="icon-nft" :style="{backgroundImage: `url(${item.media})`}"></div>
              <div class="nft-data">
                <div class="nft-id">{{item.token_id}}</div>
                <div>{{item.collection.name}}</div>
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
          <button class="btn btn-modal-main btn-modal-desktop" @click="this.buyLot()">Deposit part</button>
        </div>
      </div>
            
      <div class="modal-mobile-footer">
        <button class="btn btn-modal-main" @click="this.buyLot()">Deposit part</button>
      </div>
      
    </div>
  </div>
</template>
<script>
import { ethers } from 'ethers';
import ABI from '@/abi.json';
import config from '@/config.json';
import { markRaw, toRaw } from '@vue/reactivity';
export default {
  data() {
    return {
      selectOpen: false,
      item:null,
      ABI:ABI,
      render:false,
      config:config,
      provider:null
    };
  },
  async mounted(){
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    this.provider = toRaw(await this.$store.getters['walletsAndProvider/getGlobalProvider']);
    this.render = true;
  },
  methods:{
    async buyLot(){
      const contract = new ethers.Contract(this.config.contractAddress, this.ABI.abi, toRaw(this.provider));
      console.log(await contract.ORACLE_ADDRESS());
      let markeplaceId = ethers.utils.formatBytes32String(this.item.marketplace.id).substring(0, 10);
      let options = {};
      if (this.item.currency.address == '0x0000000000000000000000000000000000000000'){
        options.value = this.item.price/10;
      }      
      options.gasLimit ='300000' ;
      let requestUrl = `${config.backendApiEntryPoint}buy-nft/`;
      let requestOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body:JSON.stringify({
            "marketplace": this.item.marketplace.id,
            "collection": this.item.collection.contract_address,
            "token_id": this.item.token_id
          })
        };
      let request = await fetch(requestUrl,requestOptions);
      let requestJson = await request.json();
      let inputData = requestJson.data.data;
      console.log(requestJson);
      requestUrl = `${config.backendApiEntryPoint}sign/`;
      requestOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body:JSON.stringify({
            lot_id: this.item.id
          })
        };
      request = await fetch(requestUrl,requestOptions);
      requestJson = await request.json();
      console.log(requestJson);
      let signature = requestJson.data.signature;
      let buyLot = await contract.buyLot(
        markeplaceId,
        this.item.id,
        this.item.price/10,
        {
          tokenAddress: this.item.currency.address,
          decimals: this.item.currency.decimals,
          price: this.item.price,
          collected: '0',
          occupancy: '0',
          tokenContractAddress: this.item.collection.contract_address,
          tokenId: this.item.token_id,
          tokenAmount: this.item.amount,
          status: '0',
        },
        inputData,
        signature,
        options
      );
      console.log(buyLot);
    }
  }
};
</script>
