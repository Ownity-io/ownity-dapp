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
          <h1 class="section-name-h1">{{translatesGet('PRIVACY_POLICY2')}}</h1>
          <!-- <h3 class="section-name-h3">Frequently Asked Question</h3> -->
        </div>
      </section>

      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-block">
              {{translatesGet('PRIVACY_POLICY_SECTION-1')}}
              <ul>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-1-LIST_1')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-1-LIST_2')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-1-LIST_3')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-1-LIST_4')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-1-LIST_5')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-1-LIST_6')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-1-LIST_7')"></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-name">{{translatesGet('PRIVACY_POLICY_SECTION-2')}}</div>
            <div class="exposition-block">
              {{translatesGet('PRIVACY_POLICY_SECTION-2-1')}}
              <ul>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-2-LIST_1')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-2-LIST_2')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-2-LIST_3')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-2-LIST_4')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-2-LIST_5')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-2-LIST_6')"></li>
                <li v-html="translatesGet('PRIVACY_POLICY_SECTION-2-LIST_7')"></li>
              </ul>
              {{translatesGet('PRIVACY_POLICY_SECTION-2-2')}}
            </div>
          </div>
        </div>
      </section>

      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-name">{{translatesGet('PRIVACY_POLICY_SECTION-3')}}</div>
            <div class="exposition-block">
              <p v-html="translatesGet('PRIVACY_POLICY_SECTION-3-1')"></p>
              <br/>
              <p v-html="translatesGet('PRIVACY_POLICY_SECTION-3-2')"></p>
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
import "./styles.css";

export default {
  components: {
    Breadcrumbs,
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
