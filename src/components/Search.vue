<template>
    <div class="search">
        <div class="input-wrapper search-wrapper">
            <i class="i-search-line"></i>
            <input type="text" v-model="search" placeholder="Search NFT, collections, id">
        </div>
        <div class="search-results" :class="{'unfolded' : search != ''}">
            <div class="search-results-wrapper">
                <ul>
                    <li>
                        <div class="results-icon" :style="{backgroundImage:`url(${testBg})`}"></div>
                        <div class="results-data">
                            <div class="name">18234</div>
                            <div>Mutant Ape Yacht Club</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            testBg: '',
            testOpenSearch: false,
            search: '',
        }
    }
}
</script>