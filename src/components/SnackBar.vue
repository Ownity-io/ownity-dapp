<template>
  <div class="snackbar-wrap">
    <div
      class="snackbar"
      :class="{
        success: snackbarTest === 'success',
        wrong: snackbarTest === 'wrong',
      }"
    >
      <div class="snackbar-status">
        <i v-if="snackbarTest === 'success'" class="i-check-line"></i>
        <i v-if="snackbarTest === 'wrong'" class="i-error-warning-line"></i>
      </div>
      <div class="snackbar-describe">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum ipsum distinctio
        nesciunt delectus qui nulla pariatur maiores consequuntur molestiae eos iste
        suscipit quo error quidem, impedit repudiandae aliquam obcaecati dolores.
      </div>
      <button class="btn-close">
        <i class="i-close-line"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbarTest: "success",
    };
  },
};
</script>
