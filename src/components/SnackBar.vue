<template>
  <div class="snackbar-wrap">
    <div
      class="snackbar"
      :class="{
        success: snackbarTest,
        wrong: !snackbarTest,
      }"
    >
      <div class="snackbar-status">
        <i v-if="snackbarTest === 'success'" class="i-check-line"></i>
        <i v-if="snackbarTest === 'wrong'" class="i-error-warning-line"></i>
      </div>
      <div class="snackbar-describe">
       {{this.snackText}}
      </div>
      <button class="btn-close" @click="this.$store.dispatch('appGlobal/setShowSnackBar',false)">
        <i class="i-close-line"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbarTest: false,
      snackText:null
    };
  },
  mounted(){
    this.snackbarTest = this.$store.getters['appGlobal/getGreenSnack'];
    this.snackText = this.$store.getters['appGlobal/getSnackText'];
  }
};
</script>
