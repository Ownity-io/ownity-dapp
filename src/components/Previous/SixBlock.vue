<template>
<div class="whitelist-wrapper" id="list">
  <div class="whitelist-inner">
    <p class="whitelist-inner-title">Ownity Private Beta Waitlist Is Now Open</p>
    <p class="whitelist-inner-subtitle">Hop on the list to be among the very first to try out Ownity’s disruptive functionality.</p>
    <div class="email-block">
<!--      <input placeholder="Your Email" v-model="email" >-->
      <a href="https://tally.so/r/wbZQDe" target="_blank">Join</a>
    </div>
<!--    <p class="check-term">By joining the list, you agree to Ownity Terms of Use.</p>-->
  </div>
</div>
</template>

<script>
import config from '@/config.json';
export default {
	name: "SixBlock",
  data(){
    return{
      email:null,
      config:config
    }
  },
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
                        'email': this.email
                    }),
                };
                let request = await fetch(requestLink, requestOptions);
                if (request.ok){
                    this.email=null;
                    await this.$store.dispatch('appGlobal/setSnackText','Congrats! Your email was successfully written!')
                    await this.$store.dispatch('appGlobal/setGreenSnack',true)
                    await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',10)
                }
            } else {
              this.email=null;
                    await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
                    await this.$store.dispatch('appGlobal/setGreenSnack',false)
                    await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',10)
            }
        }
  }
}
</script>