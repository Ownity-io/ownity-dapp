<template>
  <div class="cookies-wrap">
    <div class="cookies">
      <div class="cookies-header">
        <div>{{translatesGet('COOKIES-TITLE')}}</div>
        <button class="btn-close">
          <i class="i-close-line"></i>
        </button>
      </div>
      <!-- Version text 1 -->
      <div class="cookies-content">
        {{translatesGet('COOKIES-DESCRIBE-1')}}
      </div>
      <!-- Version text 2 -->
      <div class="cookies-content">
        {{translatesGet('COOKIES-DESCRIBE-2')}}
        <a href="">{{translatesGet('PRIVACY_POLICY')}}</a>.
      </div>
      <div class="cookies-btns-container">
        <!-- Version btns 1 -->
        <button class="btn btn-additional">
          {{translatesGet('COOKIES-SETTINGS')}}
        </button>
        <button class="btn btn-main">
          {{translatesGet('COOKIES-ACCEPT')}}
        </button>
        <!-- Version btns 2 -->
        <button class="btn btn-main">
          {{translatesGet('COOKIES-AGREE')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MultiLang from "@/core/multilang";

export default {
  data() {
    return {
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
