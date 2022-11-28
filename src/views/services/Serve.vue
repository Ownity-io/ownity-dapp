<template>
  <div class="page-wrapper page-service">
    <main>
      <div class="container">
        <section class="section-breadcrumbs">
          <Breadcrumbs />
        </section>
      </div>

      <section class="section-header">
        <div class="container">
          <h1 class="section-name-h1">Frequently Asked Question</h1>
          <h3 class="section-name-h3">Frequently Asked Question</h3>
        </div>
      </section>

      <section class="section-service-faq">
        <div class="container">
            <Faq />
        </div>
      </section>

      <section class="section-service-form">
        <div class="container">
          <div class="form-contact">
            <div class="container-form">
              <div class="section-form-title">Contact us</div>
              <form action="" class="form">

                <div class="container-input">
                  <div class="input-header">
                    <div>Your name</div>
                  </div>
                  <div class="input-wrapper input-wrapper-form">
                    <input type="text" placeholder="Example: Alex">
                  </div>
                </div>

                <div class="container-input">
                  <div class="input-header">
                    <div>Your email</div>
                  </div>
                  <div class="input-wrapper input-wrapper-form">
                    <input type="text" placeholder="alexwork@emal.com">
                  </div>
                </div>

                <div class="container-input container-input-textarea">
                  <div class="input-header">
                    <div>Your message</div>
                  </div>
                  <div class="input-wrapper input-wrapper-form input-wrapper-textarea">
                    <textarea type="text" placeholder="Ask your question"></textarea>
                  </div>
                  <p class="agreement">
                    By clicking on the button «Submit» you accept our Terms of Use
                  </p>
                </div>

              </form>

              <button class="btn btn-submit">Submit</button>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Faq from "@/components/Faq.vue";


export default {
  components: {
    Breadcrumbs,
    Faq,
  },
};
</script>
