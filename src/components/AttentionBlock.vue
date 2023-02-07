<template>
  <div class="attention" v-if="closed">
    <div class="container">
      <div class="attention-contaner">
        <p>This is Ownity’s beta release. Use at your own risk.</p>
        <i class="i-close-line" @click="closed = !closed"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "AttentionBlock",
  data(){
		return {
			closed: true
    }
  }
}
</script>

<style scoped>
p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #FFFFFF;
    text-align: center;

}
.attention {
    height: 40px;
    background: linear-gradient(89.43deg, #3E80FF -3.17%, #2457D5 109.46%);
    z-index: 100;
    width: 100%;
    text-align: center;
    padding-left: 16px;
    padding-right: 16px;
}
.attention-contaner{
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
}
.i-close-line {
    color: #FFFFFF;
    font-size: 24px;
    position: absolute;
    z-index: 10;
    right: 0;
    cursor: pointer;
}
.container{
    height: 40px;
}

@media (max-width: 581px) {
    p{
        max-width: 302px;
        text-align: initial;
    }
    .container,
    .attention {
        height: 74px;
    }
    .attention-contaner {
        justify-content: start;
    }
    .attention {
        padding-left: 0;
        padding-right: 0;
    }
}

</style>