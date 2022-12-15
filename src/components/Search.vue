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
                <div class="empty-list">
                    {{translatesGet('NOTHING_FOUND')}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MultiLang from "@/core/multilang";

export default {
    data() {
        return {
            testBg: '',
            testOpenSearch: false,
            search: '',

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

<style >
.search-results-wrapper .empty-list{
    padding: 60px 16px; 
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
}
</style>