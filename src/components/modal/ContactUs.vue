<template>
  <div class="modal modal-connect">
    <div class="modal-wrapper-close"></div>
    <div class="modal-wrapper">
      <div class="modal-header">
        <button class="btn-close">
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
            <div class="input-wrapper">
              <input placeholder="Your email">
              <button type="submit" class="btn btn-subscribe">Send</button>
            </div>
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
export default {
	name: "ContactUs"
}
</script>

<style scoped>

</style>