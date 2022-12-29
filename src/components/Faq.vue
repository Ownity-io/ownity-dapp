<template>
  <div class="faq">
    <div class="faq-block" :class="{ 'collapse-block': !faqBlock1 }">
      <button class="btn-faq" @click="faqBlock1 = !faqBlock1">
        {{translatesGet('FAQ-H1-1')}}
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p v-html="translatesGet('FAQ-H2-1')"></p>
      </div>
    </div>

    <div class="faq-block" :class="{ 'collapse-block': !faqBlock2 }">
      <button class="btn-faq" @click="faqBlock2 = !faqBlock2">
        {{translatesGet('FAQ-H1-2')}}
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p v-html="translatesGet('FAQ-H2-2')"></p>
      </div>
    </div>

    <div class="faq-block" :class="{ 'collapse-block': !faqBlock3 }">
      <button class="btn-faq" @click="faqBlock3 = !faqBlock3">
        {{translatesGet('FAQ-H1-3')}}
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p v-html="translatesGet('FAQ-H2-3')"></p>
      </div>
    </div>
    <div class="faq-block" :class="{ 'collapse-block': !faqBlock3 }">
      <button class="btn-faq" @click="faqBlock3 = !faqBlock3">
        {{translatesGet('FAQ-H13-3')}}
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p v-html="translatesGet('FAQ-H13-1')"></p>
      </div>
    </div>
  </div>
</template>
<script>
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
      faqBlock1: false,
      faqBlock2: false,
      faqBlock3: false,
      lang: new MultiLang(this),
    };
  },
  methods:{
    translatesGet(key) {
      return this.lang.get(key);
    },
  }
};
</script>