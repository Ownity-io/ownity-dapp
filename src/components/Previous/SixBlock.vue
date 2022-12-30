<template>
<div class="whitelist-wrapper" id="list">
  <div class="whitelist-inner">
    <p class="whitelist-inner-title">Get in the Beta Testing Waitlist</p>
    <p class="whitelist-inner-subtitle">Become one of the first who will test all the functionality, and much more.</p>
    <div class="email-block">
      <input placeholder="Your email" v-model="email" >
      <button @click="validateEmail">Join</button>
    </div>
    <p class="check-term">By subscribing, you agree to the Terms of Use</p>
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
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        'email': this.email
                    }),
                };
                let request = await fetch(requestLink, requestOptions);
                if (request.ok){
                    this.email=null;
                    alert('Your email was succesfully added!')
                    location.reload();
                }
            } else {
                console.log('Wrong email!');
            }
        }
  }
}
</script>

<style scoped>

</style>