<template>
  <div class="modal" v-if="render">
    <div class="modal-wrapper-close" @click="this.$store.dispatch('appGlobal/setShowClaimNftModal',false);this.waitingForTransaction=false;"></div>
    <div class="modal-wrapper modal-claim">
      <div class="modal-header">
        <div class="modal-name">{{translatesGet('CLAIM_YOUR_NFT')}}</div>
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setShowClaimNftModal',false);this.waitingForTransaction=false;">
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

          <!-- <div class="modal-section-total">
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
          </div> -->
          <div class="total-block-describe">
            {{translatesGet('TOTAL_DESCRIBE')}}
            <a href="#">{{translatesGet('TERMS_OF_USE')}}</a>
          </div>

          <!-- v-if="currentPart "  -->
          <div class="modal-desktop-footer" v-if="!buttonWaiting">
            <button class="btn btn-modal-main" @click="claimNft">{{translatesGet('CLAIM')}}</button>
          </div>

          <!-- v-else  -->
          <div class="modal-desktop-footer" v-if="buttonWaiting">
            <button class="btn btn-modal-main">
              <svg class="loader" viewBox="0 0 18 18"  xmlns="http://www.w3.org/2000/svg">
                <path d="M15.364 2.63609L13.95 4.05009C12.8049 2.90489 
                11.2982 2.19215 9.6865 2.03333C8.07482 1.87451 
                6.45794 2.27942 5.11134 3.17908C3.76474 4.07874 
                2.77174 5.41748 2.30154 6.9672C1.83134 8.51692 
                1.91302 10.1817 2.53268 11.678C3.15234 13.1742 
                4.27162 14.4093 5.69983 15.1728C7.12803 15.9363 
                8.77679 16.181 10.3652 15.8652C11.9536 15.5493 
                13.3833 14.6925 14.4108 13.4407C15.4382 12.1889 
                15.9999 10.6196 16 9.00009H18C18 11.0823 17.278 13.1001 15.957 14.7096C14.6361 16.3192 12.7979 17.4209 10.7557 17.8271C8.71355 18.2333 6.5937 17.9188 4.75737 16.9373C2.92104 15.9557 1.48187 14.3678 0.685061 12.4441C-0.111747 10.5204 -0.216886 8.37992 0.387558 6.38739C0.992002 4.39486 2.26863 2.67355 3.99992 1.51675C5.73121 0.359959 7.81004 -0.160747 9.88221 0.0433572C11.9544 0.247462 13.8917 1.16375 15.364 2.63609V2.63609Z" fill="white"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
      
            
      <!-- v-if="currentPart "  -->
      <div  class="modal-mobile-footer" v-if="!buttonWaiting">
        <button class="btn btn-modal-main" @click="claimNft">{{translatesGet('CLAIM')}}</button>
      </div>

      <!-- v-else  -->
      <div   class="modal-mobile-footer" v-if="buttonWaiting">
        <button class="btn btn-modal-main">
          <svg class="loader" viewBox="0 0 18 18"  xmlns="http://www.w3.org/2000/svg">
            <path d="M15.364 2.63609L13.95 4.05009C12.8049 2.90489 
            11.2982 2.19215 9.6865 2.03333C8.07482 1.87451 
            6.45794 2.27942 5.11134 3.17908C3.76474 4.07874 
            2.77174 5.41748 2.30154 6.9672C1.83134 8.51692 
            1.91302 10.1817 2.53268 11.678C3.15234 13.1742 
            4.27162 14.4093 5.69983 15.1728C7.12803 15.9363 
            8.77679 16.181 10.3652 15.8652C11.9536 15.5493 
            13.3833 14.6925 14.4108 13.4407C15.4382 12.1889 
            15.9999 10.6196 16 9.00009H18C18 11.0823 17.278 13.1001 15.957 14.7096C14.6361 16.3192 12.7979 17.4209 10.7557 17.8271C8.71355 18.2333 6.5937 17.9188 4.75737 16.9373C2.92104 15.9557 1.48187 14.3678 0.685061 12.4441C-0.111747 10.5204 -0.216886 8.37992 0.387558 6.38739C0.992002 4.39486 2.26863 2.67355 3.99992 1.51675C5.73121 0.359959 7.81004 -0.160747 9.88221 0.0433572C11.9544 0.247462 13.8917 1.16375 15.364 2.63609V2.63609Z" fill="white"/>
          </svg>
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import ABI from '@/abi.json';
import { ethers } from 'ethers';
import { toRaw } from '@vue/reactivity';
import MultiLang from "@/core/multilang";
import config from '@/config';
export default {
  data() {
    return {
      selectOpen: false,
      item:null,
      render:false,
      provider:null,
      ABI:ABI,
      config:config,
      buttonWaiting:false,
      lang: new MultiLang(this),
      waitingForTransaction:false
    };
  },
  async mounted(){
    this.waitingForTransaction=true;
    this.item = await this.$store.getters['marketplaceListing/getItem'];
    this.provider = await this.$store.getters['walletsAndProvider/getGlobalProvider'];
    this.render = true;
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
    async claimNft(){ 
      this.buttonWaiting = true; 
      let prov = toRaw(this.provider);
      let chainSettings = toRaw(this.config.evmChains[this.item.collection.blockchain])
      try{
        await prov.send('wallet_switchEthereumChain',[{chainId: chainSettings.chainId}]);
      }
      catch{
        try{
          await prov.send('wallet_addEthereumChain',[chainSettings]);  
        }
        catch{
          if (this.waitingForTransaction){
            await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
          await this.$store.dispatch('appGlobal/setGreenSnack',false)
          await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',10)
          }          
        }
      }     
      const contract = new ethers.Contract(this.config.contractAddress, this.ABI.abi,await prov.getSigner());
      try{
        let claimLot = await contract.claimLot(
          this.item.id,
          {gasLimit:'1000000'}
        );
        let trx = await prov.waitForTransaction(claimLot.hash);
        if (trx.status==1){
          let forceReq = await (await fetch(
            `${config.backendApiEntryPoint}force-scanner/`,
            {
              body:JSON.stringify({
                scanner:'claim_lot',
                block:trx.blockNumber,
                blockchain: this.item.blockchain
              }),
              headers: {
                accept: "application/json",
                'Content-Type': 'application/json',
              },
              method:'POST'
            })).json();
          // //console.log(forceReq);
          if (this.waitingForTransaction){
          await this.$store.dispatch('appGlobal/setLastTransSuccess',true)
          await this.$store.dispatch('appGlobal/setLastTransactionHash', claimLot.hash);
          await this.$store.dispatch('appGlobal/setShowClaimNftModal', false);
          await this.$store.dispatch('appGlobal/setShowTransSuccessModal', true);
          }
        }
        else{
          if (this.waitingForTransaction){
          await this.$store.dispatch('appGlobal/setLastTransSuccess',false)
          await this.$store.dispatch('appGlobal/setLastTransactionHash',claimLot.hash);
          await this.$store.dispatch('appGlobal/setShowClaimNftModal',false)          
          await this.$store.dispatch('appGlobal/setShowTransSuccessModal',true);
          this.buttonWaiting = false;
          await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
          await this.$store.dispatch('appGlobal/setGreenSnack', false)
          await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 10)
          }
        }         
      }
      catch{
        if (this.waitingForTransaction){
        this.buttonWaiting = false;
        await this.$store.dispatch('appGlobal/setSnackText', 'Something went wrong… Try again later')
        await this.$store.dispatch('appGlobal/setGreenSnack', false)
        await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 10)
        }
      }
    },
  },
  watch: { 
  '$route': {
    handler: function() {
      // //console.log('route changed');
      this.waitingForTransaction = false;
    },
    deep: true,
    immediate: true
  }
}
};
</script>
