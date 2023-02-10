<template>
  <div class="still-inner">
    <p class="still-inner-title">{{translatesGet("STILL_TITLE")}}</p>
    <p class="still-inner-subtitle">{{translatesGet("STILL_SUBTITLE")}}</p>
    <a class="still-inner-btn" href="https://ownity.gitbook.io/ownity-documentation/" target="_blank">
      Litepaper
    </a>
  </div>
</template>

<script>
import MultiLang from "@/core/multilang";


export default {
	name: "FifthBlock",
  data(){
		return{
			lang: new MultiLang(this),
    }
  },
  methods:{
	  translatesGet(key) {
		  return this.lang.get(key);
	  },
  }
}
</script>