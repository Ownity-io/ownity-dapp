<template>
  <div class="filter">
    <div class="filter-section" :class="{'collapse-section' : filterSection1}">
      <button class="filter-section-name"
        @click="filterSection1 = !filterSection1"
        >
        <span>Status</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox1" />
            <label for="test-checkbox1">
              <span>Canceled</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox2" />
            <label for="test-checkbox2">
              <span>Active</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox3" />
            <label for="test-checkbox3">
              <span>Purchased</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        filterSection1: false,
        filterSection2: false,
        filterSection3: false,
        filterSection4: false,
    }
  },
};
</script>
