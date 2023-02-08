<template>
  <div class="modal modal-connect">
    <div class="modal-wrapper-close"></div>
    <div class="modal-wrapper">
      <div class="modal-header">
        <button class="btn-close" @click="this.$store.dispatch('appGlobal/setShowContactUsModal',false)">
          <i class="i-close-line"></i>
        </button>
      </div>
      <div class="modal-content">
        <div class="modal-container">
          <div class="chat-icon"></div>
          <p class="contact-info">
            If you have any questions, please contact us!
          </p>
          <div class="our-email">
            <i class="i-mail-fill"></i>
            <p class="email-address">
              contactus@ownity.io
            </p>
          </div>
          <p class="or">or</p>
          <div  class="footer-form">
              <a type="submit" class="btn btn-subscribe" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSe99VEp-vBxUedhbJN5hRtHi9jZ8xxeELCLy1XMqeDjNMfG7g/viewform" style="margin: 0 auto 20px auto; max-width: 50%; cursor: pointer">Send</a>
            <p class="agree">
              By subscribing, you agree to Ownity
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.json';
export default {
	name: "ContactUs",
  methods:{
    async validateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                console.log('Nice email!');
                //sendEmailHere
                let requestLink = `${this.config.backendApiEntryPoint}mailing-list-add/`;
                let requestOptions = {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      'email': this.email,
                      "type": "error",
                      "listing_link": document.URL
                    }),
                };
                let request = await fetch(requestLink, requestOptions);
                if (request.ok){
                    this.email=null;
                    await this.$store.dispatch('appGlobal/setShowContactUsModal',false)
                    location.reload();
                    await this.$store.dispatch('appGlobal/setSnackText','Congrats! Your email was successfully written!')
                    await this.$store.dispatch('appGlobal/setGreenSnack',true)
                    await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)                    
                }
            } else {
              this.email=null;
                    await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
                    await this.$store.dispatch('appGlobal/setGreenSnack',false)
                    await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)
            }
        }
  },
  data(){
    return{
      email:null,
      config:config
    }
  }
}
</script>