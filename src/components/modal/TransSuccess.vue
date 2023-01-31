<template>
  <div class="modal">
    <div class="modal-wrapper-close" @click="reloadPage"></div>
    <div class="modal-wrapper">
      <div class="modal-header">
        <!-- <div class="modal-name">Connect Your Wallet</div> -->
        <button class="btn-close" @click="reloadPage">
          <i class="i-close-line"></i>
        </button>
      </div>
      <div class="modal-header-img">
        <div class="icon-congrats"  v-if="transSuccess"> </div>
        <!-- <div class="icon-congrats" v-else :style="{backgroundImage: `url(${'https://cdn-icons-png.flaticon.com/512/57/57165.png'})`}"> </div> -->
        <div class="modal-header-img-name" v-if="transSuccess">
          {{translatesGet('TRANS_SUCCESS')}}
        </div>
        <div class="modal-header-img-name" v-else>
          Your transaction was rejected
        </div>
      </div>
      
      <div class="modal-content">
        <div class="modal-container">
          <div class="table table-modal table-modal-trans">
            
              <div class="tr">
                  <div class="td">{{translatesGet('ACTIVITY_THEAD-7')}}</div>
                  <div class="td">
                      <div class="td-wrap">
                          <span v-if="transSuccess" class="td-completed"> {{translatesGet('COMPLETE')}}</span>
                          <span v-else class="td-failed">{{translatesGet('FAILED')}}</span>
                      </div>
                  </div>
              </div>
                  
              <div class="tr"  v-if="this.$store.getters['appGlobal/getLastTransactionHash']">
                  <div class="td">{{translatesGet('ACTIVITY_THEAD-4')}}</div>
                  <div class="td"> 
                      <a class="td-wrap td-wrap-link" :href="config.etherscanTxUrlStart+this.$store.getters['appGlobal/getLastTransactionHash']" target="_blank" rel="nofollow">
                          <!-- <span>a1565...d48d</span> -->
                          <span>{{this.$store.getters['appGlobal/getLastTransactionHash'].substring(0,6)}}...{{this.$store.getters['appGlobal/getLastTransactionHash'].substring(62,66)}}</span>
                          <i class="i-external-link-line"></i>
                      </a> 
                  </div>
              </div>
              
              <!-- <div class="table-btn-row">
                  <button class="btn btn-show-more">Show more <i class="i-arrow-down-s-line"></i></button>
              </div> -->
          </div>



          <!-- v-if="currentPart "  -->
          <div class="modal-desktop-footer">
            <!-- <button disabled class="btn btn-modal-main" @click="reloadPage">{{translatesGet('DONE')}}</button> -->
            <button class="btn btn-modal-main" @click="reloadPage">{{translatesGet('DONE')}}</button>
          </div>

          <!-- v-else  -->
          <!-- <div class="modal-desktop-footer">
            <button class="btn btn-modal-main">{{translatesGet('DONE')}}</button>
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
          </div> -->

        </div>
      </div>
            
      <!-- v-if="currentPart "  -->
      <div  class="modal-mobile-footer">
        <!-- <button disabled class="btn btn-modal-main" @click="reloadPage">{{translatesGet('DONE')}}</button> -->
        <button class="btn btn-modal-main" @click="reloadPage">{{translatesGet('DONE')}}</button>
      </div>

      <!-- v-else  -->
      <!-- <div   class="modal-mobile-footer">
        <button   class="btn btn-modal-main">{{translatesGet('DONE')}}</button>
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
      </div> -->
      
    </div>
  </div>
</template>

<script>
import config from '@/config';
import MultiLang from "@/core/multilang";

export default{

  methods:{
    reloadPage(){
      location.reload();
    },
    translatesGet(key) {
      return this.lang.get(key);
    },
  },
  data(){
    return{
      config:config,
      lang: new MultiLang(this),
      transSuccess:false
    }    
  },
  async mounted(){
    this.transSuccess=await this.$store.getters['appGlobal/getLastTransSuccess'];
  }
}
</script>
