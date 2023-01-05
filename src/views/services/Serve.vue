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
          <h1 class="section-name-h1">{{translatesGet('FAQ_TITLE_SHORT')}}</h1>
          <h3 class="section-name-h3">{{translatesGet('FAQ_TITLE')}}</h3>
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
              <div class="section-form-title">{{translatesGet('CONTACT_US')}}</div>
              <form action="" class="form">

                <div class="container-input">
                  <div class="input-header">
                    <div>{{translatesGet('YOUR_NAME')}}</div>
                  </div>
                  <div class="input-wrapper input-wrapper-form">
                    <input type="text" placeholder="Example: Alex">
                  </div>
                </div>

                <div class="container-input">
                  <div class="input-header">
                    <div>{{translatesGet('YOUR_EMAIL')}}</div>
                  </div>
                  <div class="input-wrapper input-wrapper-form">
                    <input type="text" placeholder="alexwork@emal.com">
                  </div>
                </div>

                <div class="container-input container-input-textarea">
                  <div class="input-header">
                    <div>{{translatesGet('YOUR_MSG')}}</div>
                  </div>
                  <div class="input-wrapper input-wrapper-form input-wrapper-textarea">
                    <textarea type="text" placeholder="Ask your question"></textarea>
                  </div>
                  <p class="agreement" v-html="translatesGet('AGREEMENT')">
                    
                  </p>
                </div>

              </form>

              <button class="btn btn-submit">{{translatesGet('SUBMIT')}}</button>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import MultiLang from "@/core/multilang";
import Faq from "@/components/Faq.vue";


export default {
  components: {
    Breadcrumbs,
    Faq,
  },
  data() {
    return {
      lang: new MultiLang(this),
    };
  },
  mounted(){
    window.scrollTo(0, 0);
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
};
</script>
