<template>
  <div class="filter">
    <div class="filter-section" :class="{ 'collapse-section': filterSection1 }">
      <button class="filter-section-name" @click="filterSection1 = !filterSection1">
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
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox4" />
            <label for="test-checkbox4">
              <span>On sale</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox5" />
            <label for="test-checkbox5">
              <span>Sold</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection2 }">
      <button class="filter-section-name" @click="filterSection2 = !filterSection2">
        <span>Collection</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox11" />
            <label for="test-checkbox11">
              <div class="icon-filter-checkbox"></div>
              <span>Mutant Ape Yacht Club</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox12" />
            <label for="test-checkbox12">
              <div class="icon-filter-checkbox"></div>
              <span>Mutant Ape Yacht Club</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection3 }">
      <button class="filter-section-name" @click="filterSection3 = !filterSection3">
        <span>Marketplace</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <ul class="filter-ul">
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox21" />
            <label for="test-checkbox21">
              <div class="icon-filter-checkbox"></div>
              <span>OpenSea</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox22" />
            <label for="test-checkbox22">
              <div class="icon-filter-checkbox"></div>
              <span>LooksRare</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
        <li class="filter-li">
          <div class="input-checkbox">
            <input type="checkbox" id="test-checkbox23" />
            <label for="test-checkbox23">
              <div class="icon-filter-checkbox"></div>
              <span>X2Y2</span>
              <i class="i-check-line"></i>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="filter-section" :class="{ 'collapse-section': filterSection4 }">
      <button class="filter-section-name" @click="filterSection4 = !filterSection4">
        <span>Price (ETH)</span>
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="container-enter-price">
        <div class="container-input">
          <div class="input-wrapper">
            <input type="number" placeholder="Min" />
          </div>
        </div>
        <span class="between-inputs">to</span>
        <div class="container-input">
          <div class="input-wrapper">
            <input type="number" placeholder="Max" />
          </div>
        </div>
      </div>
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
    };
  },
};
</script>
