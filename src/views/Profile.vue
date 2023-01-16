<template>
    <div class="page-wrapper page-profile">
        <main>
            <FilterMobile v-if="filterMobile" />
            <!-- <div  class="filter-mobile-wrap">
                <div class="filter-mobile-container">
                    <div class="filter-mobile-header">
                        <div>{{translatesGet('FILTERS')}}</div>
                        <button class="btn-close" @click="filterMobile=false">
                            <i class="i-close-line"></i>
                        </button>
                    </div>
                    <Filter :onlyFav="activeTab == 'Favourites'" :vote="activeTab == 'Vote'" :activities = "activeTab == 'ActivityTable'"/>
                    <div class="filter-mobile-footer">
                        <button class="btn btn-clear">{{translatesGet('CLEAR_ALL')}}</button>
                        <button class="btn btn-submit">{{translatesGet('APPLY')}}</button>
                    </div>
                </div>
            </div> -->
            <div class="container">
                <section class="section-breadcrumbs">
                    <Breadcrumbs />
                </section>
            </div>

            <section>
                <div class="container">
                    <div class="profile-header">
                        <jazzicon :address="userAddress" :diameter="120" class="icon-profile" v-if="userAddress" />
                        <div class="icon-profile" v-else></div>
                        <div class="drop-down-mobile">                                
                            <div class="drop-down-container" 
                                :class="{'unfolded' : mobileDropDown }">
                                <button class="btn-drop-down" @click="mobileDropDown = !mobileDropDown">
                                    <i class="i-more-2-line"></i>
                                </button>
                                <div class="drop-down">
                                    <ul>
                                        <li>
                                            <i class="i-pencil-line"></i>
                                            <span>
                                                {{translatesGet('EDIT')}}
                                            </span>
                                        </li>
                                        <li>
                                            <i class="i-share-line"></i>
                                            <span>
                                                {{translatesGet('SHARE')}}
                                            </span>
                                        </li>
                                        <li>
                                            <i class="i-logout-box-line"></i>
                                            <span>
                                                {{translatesGet('LOG_OUT')}}
                                            </span>
                                        </li>
                                        <li>
                                            <router-link :to="{name:'Main'}" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',false);clearLocalStorage()">
                                                <i class="i-logout-box-line"></i>
                                                <span>
                                                    {{translatesGet('LOG_OUT')}}
                                                </span>
                                            </router-link>                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="profile-data">
                            <div class="section-name-h1">
                                {{this.$store.getters['walletsAndProvider/getUserShortAddress']}}
                            </div>
                            <div class="btn link-wrapper">
                                <div class="link">{{this.$store.getters['walletsAndProvider/getUserShortAddress']}}</div>
                                <button class="btn-copy" @click='copy()'><i class="i-checkbox-multiple-blank-line"></i></button>
                            </div>
                        </div>
                        <div class="profile-container-btns">
                            <router-link :to="{name:'Main'}" class="btn btn-log-out" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',false);clearLocalStorage()">
                                <i class="i-logout-box-line"></i>
                                <span>
                                    {{translatesGet('LOG_OUT')}}
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-tabs">
                <div class="container">
                    <ul class="tabs">
                        <li>
                            <button
                            :class="{ 'active-tab': activeTab === 'ListCards' }"
                            @click="letsCheck('ListCards');this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');"
                            >
                                <span>{{translatesGet('ITEMS')}}</span>
                                <span>{{translatesGet('ITEMS')}}</span>
                            </button>
                        </li>
                        <li>
                            <button
                            :class="{ 'active-tab': activeTab === 'Favourites' }"
                            @click="letsCheck('Favourites');this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');">
                                <span>{{translatesGet('FAVOURITES')}}</span>
                                <span>{{translatesGet('FAVOURITES')}}</span>
                            </button>
                        </li>
                        <li>
                            <button :class="{ 'active-tab': activeTab === 'Vote' }"
                            @click="letsCheck('Vote');this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');">
                                <span>{{translatesGet('VOTES')}}</span>
                                <span>{{translatesGet('VOTES')}}</span>
                            </button>
                        </li>
                        <li>
                            <button
                            :class="{ 'active-tab': activeTab === 'ActivityTable'}"
                            @click="letsCheck('ActivityTable');this.$store.dispatch('marketplace/setAllFiltersToNull');this.fetchAndSetListingsStartInfo()"
                            >
                                <span>{{translatesGet('ACTIVITIES')}}</span>
                                <span>{{translatesGet('ACTIVITIES')}}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="section-params">
                <div class="container">
                    <div class="params params-profile">
                        <div class="params-block params-block-filter">
                            <div class="param-wrap">
                                <button class="btn-param btn-param-desktop" @click="filter = !filter">
                                    <i
                                        :class="{ 'i-arrow-left-s-line': filter, 'i-filter-2-line': !filter }"
                                    ></i>
                                    <span>{{translatesGet('FILTER')}}</span>
                                </button>
                                <button class="btn-param btn-param-mobile"  @click="filterMobile=true">
                                    <i class="i-filter-2-line" ></i>
                                    <span>{{translatesGet('FILTER')}}</span>
                                </button>
                            </div>
                        </div>
                        <SortBar :activeTab="activeTab"/>
                        <!-- <div class="params-block params-block-sort">
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
                        </div> -->
                        <div class="params-block params-block-switch" v-if="activeTab !== 'ActivityTable'">
                            <div class="param-wrap switch">
                                <button
                                class="btn btn-param btn-switch"
                                @click="switchActive = 0"
                                :class="{ 'switch-active': switchActive == 0 }"
                                >
                                <i class="i-layout-grid-line"></i>
                                </button>
                                <button
                                class="btn btn-param btn-switch"
                                @click="switchActive = 1"
                                :class="{ 'switch-active': switchActive == 1 }"
                                >
                                <i class="i-layout-2-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container">
                <section class="section-nft" :class="{ 'with-filter': filter }">
                    <div v-if="filter" class="section-nft-filter" :class="{'filter-mobile':filterMobile}">
                        <Filter :onlyFav="activeTab == 'Favourites'" :vote="activeTab == 'Vote'" :activities = "activeTab == 'ActivityTable'"/>
                    </div>
                    <div class="section-nft-list" :class="{'card-collapse' : switchActive == 1}">
                        <SelectedFilters v-if="filter" :activities = "activeTab == 'ActivityTable'"/>
                        <ListCards v-if="activeTab === 'ListCards'" :onlyFav="false" :vote="false"/>
                        <ListCards v-if="activeTab === 'Favourites'" :onlyFav="true" :vote="false"/>
                        <ListCards v-if="activeTab === 'Vote'" :onlyFav="false" :vote="true"/>
                        <ActivityTable v-if="activeTab === 'ActivityTable'" />
                        <button v-if="activeTab == 0" class="btn-filter-mobile"  @click="filterMobile=true">
                            <i class="i-filter-2-line" ></i>
                            <span>{{translatesGet('FILTER')}}</span>
                        </button>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
<script>
import Filter from "@/components/Filter.vue";
import FilterMobile from "@/components/FilterMobile.vue";

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import SelectedFilters from "@/components/SelectedFilters.vue";
import ListCards from "@/components/ListCards.vue";
import SortBar from "@/components/SortBar.vue";
import MultiLang from "@/core/multilang";
import config from '@/config.json';
import ActivityTable from "@/components/ActivityTable.vue";
import { useClipboard } from '@vueuse/core'
const source = localStorage.getItem('userAddress');
const { copy } = useClipboard({ source })

export default {
    data() {
        return {
            switchActive: 0,
            activeTab: '',
            testOpenSort: false,
            filter: true,
            filterMobile: false,
            mobileDropDown: false,
            config:config,
            lang: new MultiLang(this),
            userAddress:null,
            copy:copy
        };
    },
    components:{
        Filter,
        FilterMobile,
        Breadcrumbs,
        SelectedFilters,
        ListCards,
        ActivityTable,
        SortBar
    }, 
    async mounted() {
        this.userAddress = localStorage.getItem('userAddress');
        this.activeTab = "ListCards";
        await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
        await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
        await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
    },
    methods: {
        translatesGet(key) {
        return this.lang.get(key);
        },
        letsCheck(name) {
          this.activeTab = name;
        },
        clearLocalStorage(){
            localStorage.clear();
        },
        async fetchAndSetListingsStartInfo() {
            if (this.activeTab == 'Favourites') {
                await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
            }
            else if (this.activeTab == 'Vote') {
                await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
            }
            else if(this.activeTab == 'ActivityTable'){
                await this.$store.dispatch('marketplace/fetchAndSetActivitiesResult',{userAddress:this.userAddress,collectionAddress:null}); 
            }
            else {
                await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
            }
        },
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
    }
}
</script>