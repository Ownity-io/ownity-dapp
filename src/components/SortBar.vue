<template>
    <div class="params-block params-block-sort" >
        <div class="param-wrap sort" :class="{ unfolded: testOpenSort }">
            <button class="btn-param btn-sort" @click="testOpenSort = !testOpenSort">
                <span v-if="this.selectedSort == null">{{translatesGet('SORT_BY')}}</span>
                <span v-else>{{this.selectedSort.name}}</span>
                <i class="i-arrow-down-s-line"></i>
            </button>
            <div class="drop-down">
                <ul v-if="activeTab == 1 || activeTab == 'ActivityTable'">
                    <li v-for="element in config.sortParamsActivities" :key="element"
                        @click="testOpenSort = !testOpenSort;selectedSort=element;initInfo();">
                        <span>{{element.name}}</span>
                    </li>
                </ul>
                <ul v-else>
                    <li v-for="element in config.sortParams" :key="element"
                        @click="testOpenSort = !testOpenSort;selectedSort=element;initInfo();">
                        <span>{{element.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-if="testOpenSort" class="fullSort" @click="testOpenSort = false"></div>
</template>

<script>
import config from '@/config.json';
import MultiLang from "@/core/multilang";
export default{
    data(){
        return{
            testOpenSort:false,
            config:config,
            lang: new MultiLang(this),
        }        
    },
    computed:{
        selectedSort:{
            get(){
                return this.$store.getters['marketplace/getSelectedSort'];
            },
            async set(value){
                // //console.log(value);
                this.$store.dispatch('marketplace/setSelectedSort',value);
                // //console.log(await this.$store.getters['marketplace/getSelectedSort']);
            }
        }
    },
    props:['activeTab'],
    methods:{
        async initInfo() {
            if (this.$route.name == 'Collection') {
                if (this.activeTab == 1) {
                    await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult', { userAddress: null, collectionAddress: this.$route.params.contract_address });
                }
                else {
                    await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo', this.$route.params.contract_address);
                    await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
                    await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
                }
            }
            if (this.$route.name == 'Marketplace') {
                if (this.activeTab == 1) {
                    await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult', { userAddress: null, collectionAddress: null });
                }
                if(this.activeTab == 2) {
                  await this.$store.dispatch('marketplace/fetchSharesSale');
                } else {
                    await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
                    await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
                    await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
                }
            }
            if (this.$route.name=='Profile') {
                // //console.log('yes');
                if (this.activeTab == 'Favourites') {
                    await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
                }
                else if (this.activeTab == 'Vote') {
                    await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
                }
                else if (this.activeTab == 'ActivityTable') {
                    await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult', { userAddress: this.userAddress, collectionAddress: null });
                }
                else {
                    await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
                }
            }
        },
        translatesGet(key) {
            return this.lang.get(key);
        },
    }
}
</script>

<style>
.fullSort{
    position: fixed;
    /* background-color: antiquewhite; */
    /* opacity: .4; */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 55;
}
.params-block .param-wrap.sort.unfolded{
    z-index: 58 !important;
}
</style>