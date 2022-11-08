<template>
    <div class="recommendations-wrap">
        <div class="header-title-btn">
          <div class="title">Your Recommendations</div>
          <div class="btn-wrap">
            <div class="btn btn-router-to">
              To the Collections
              <i class="i-arrow-right-s-line"></i>
            </div>
          </div>
        </div>
        <ul class="recommendations-list">
          <li>
            <Card/>
          </li>
          <li>
            <Card/>
          </li>
          <li>
            <Card/>
          </li>
          <li>
            <Card/>
          </li>
          <li>
            <Card/>
          </li>
        </ul>
    </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  data() {
    return {};
  },
  components: {
    Card,
  },
};
</script>
