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
          <div class="faq">

            <div class="faq-block" :class="{ 'collapse-block': !faqBlock1 }">
              <button class="btn-faq" @click="faqBlock1 = !faqBlock1">
                What is Lorem Ipsum?
                <i class="i-arrow-up-s-line"></i>
              </button>
              <div class="content-faq">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release
                  of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions
                  of Lorem Ipsum.
                </p>
              </div>
            </div>
            
            <div class="faq-block" :class="{ 'collapse-block': !faqBlock2 }">
              <button class="btn-faq" @click="faqBlock2 = !faqBlock2">
                What is Lorem Ipsum?
                <i class="i-arrow-up-s-line"></i>
              </button>
              <div class="content-faq">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release
                  of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions
                  of Lorem Ipsum.
                </p>
              </div>
            </div>
            
            <div class="faq-block" :class="{ 'collapse-block': !faqBlock3 }">
              <button class="btn-faq" @click="faqBlock3 = !faqBlock3">
                What is Lorem Ipsum?
                <i class="i-arrow-up-s-line"></i>
              </button>
              <div class="content-faq">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release
                  of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions
                  of Lorem Ipsum.
                </p>
              </div>
            </div>
            
          </div>
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

export default {
  data() {
    return {
      faqBlock1:false,
      faqBlock2:false,
      faqBlock3:false
    };
  },
  components: {
    Breadcrumbs,
  },
  mounted() {},
  methods: {},
};
</script>
