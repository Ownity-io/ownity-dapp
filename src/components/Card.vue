<template>
  <div class="card">
    <div class="card-main">
      <div class="card-img" :style="{backgroundImage: `url(${item.media})`}" ></div>
      <div class="card-header">
        <div class="icon-card-label"></div>
        <button class="btn-like" @click="testLike = !testLike">
          <i :class="{ 'icon-like': testLike, 'icon-dislike': !testLike }"></i>
        </button>
      </div>
      <div class="card-footer">
        <div class="card-progress progress">
          <div class="progress-value" :style="{ width: testProgressValue + '%' }">
            {{ testProgressValue }}%
          </div>
        </div>
      </div>
    </div>
    <div class="card-data">
      <div class="data-table">
        <div class="data-tr data-tr-main">
          <div class="card-id">{{item.name}}</div>
          <div class="card-value">
            <div class="icon-value"></div>
            0.40 / <span>1 ETH</span>
          </div>
        </div>
        <div class="data-tr">
          <div>{{item.collection.name}}</div>
          <div>≈ $ 1000</div>
        </div>
        <div class="data-tr data-tr-date">
          <div>Ends in 07:47:21</div>
        </div>
      </div>
      <div class="btn-container">
        <button class="btn">Start collecting</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testLike: false,
      testProgressValue: 40,
    };
  },
  props:[
    'item'
  ]
};
</script>
