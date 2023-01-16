<template>
    X
    <div class="params-block params-block-sort" v-if="this.$route.name=='Profile'">
        <div class="param-wrap sort" :class="{ unfolded: testOpenSort }">
            <button class="btn-param btn-sort" @click="testOpenSort = !testOpenSort">
            <span v-if="this.selectedSort == null">Sort by</span>
            <span v-else>{{this.selectedSort.name}}</span>
            <i class="i-arrow-down-s-line"></i>
            </button>
            <div class="drop-down">                                    
            <ul v-if="activeTab == 'ActivityTable'">                                    
                <li v-for="element in config.sortParamsActivities" :key="element" @click="testOpenSort = !testOpenSort;selectedSort=element;fetchAndSetListingsStartInfo();">
                    <span>{{element.name}}</span>
                </li>                        
            </ul>
            <ul v-else>                                    
                <li v-for="element in config.sortParams" :key="element" @click="testOpenSort = !testOpenSort;selectedSort=element;fetchAndSetListingsStartInfo();">
                    <span>{{element.name}}</span>
                </li>                        
            </ul>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.json';

export default{
    data(){
        return{
            testOpenSort:false,
            config:config
        }        
    },
    mounted(){
        console.log('kek');
    },
    computed:{
        selectedSort:{
            get(){
                return this.$store.getters['marketplace/getSelectedSort'];
            },
            async set(value){
                console.log(value);
                this.$store.dispatch('marketplace/setSelectedSort',value);
                console.log(await this.$store.getters['marketplace/getSelectedSort']);
            }
        }
    },
    props:['activeTab'],
    methods:{
        async fetchAndSetListingsStartInfo() {
            if (this.$route.name=='Profile') {
                console.log('yes');
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
    }
}
</script>