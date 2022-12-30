<template>
<div class="whitelist-wrapper">
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
export default {
	name: "SixBlock",
  data(){
    return{
      email:null
    }
  },
  methods:{
    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        console.log('Nice email!');
        //sendEmailHere
      } else {
        console.log('Wrong email!');
      }
    }
  }
}
</script>

<style scoped>

</style>