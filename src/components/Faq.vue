<template>
  <div class="faq">
    <div class="faq-block" :class="{ 'collapse-block': !faqBlock1 }">
      <button class="btn-faq" @click="faqBlock1 = !faqBlock1">
        What is Lorem Ipsum?
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      faqBlock1: false,
      faqBlock2: false,
      faqBlock3: false,
    };
  },
};
</script>