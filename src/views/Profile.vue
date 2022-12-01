<template>
    <div class="page-wrapper page-profile">
        <main>
            <div v-if="filterMobile" class="filter-mobile-wrap">
                <div class="filter-mobile-container">
                    <div class="filter-mobile-header">
                        <div>Filters</div>
                        <button class="btn-close" @click="filterMobile=false">
                            <i class="i-close-line"></i>
                        </button>
                    </div>
                    <Filter :onlyFav="activeTab == 'ListCards'" :vote="activeTab == 'Vote'"/>
                    <div class="filter-mobile-footer">
                        <button class="btn btn-clear">Clear all</button>
                        <button class="btn btn-submit">Apply</button>
                    </div>
                </div>
            </div>
            <div class="container">
                <section class="section-breadcrumbs">
                    <Breadcrumbs />
                </section>
            </div>

            <section>
                <div class="container">
                    <div class="profile-header">
                        <div class="icon-profile"></div>
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
                                            <span>Edit</span>
                                        </li>
                                        <li>
                                            <i class="i-share-line"></i>
                                            <span>Share</span>
                                        </li>
                                        <li>
                                            <router-link :to="{name:'Main'}" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',false);clearLocalStorage()">
                                                <i class="i-logout-box-line"></i>
                                                <span>Log Out</span>
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
                                <button class="btn-copy"><i class="i-checkbox-multiple-blank-line"></i></button>
                            </div>
                        </div>
                        <div class="profile-container-btns">
                            <router-link :to="{name:'Main'}" class="btn btn-log-out" @click="this.$store.dispatch('appGlobal/setShowConnectWalletModal',false);clearLocalStorage()">
                                <i class="i-logout-box-line"></i>
                                <span>Log Out</span>
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
                                <span>Items</span>                                
                                <span>Items</span>
                            </button>
                        </li>
                        <li>
                            <button
                            :class="{ 'active-tab': activeTab === 'Favourites' }"
                            @click="letsCheck('Favourites');this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');">
                                <span>Favourites</span>                                
                                <span>Favourites</span>
                            </button>
                        </li>
                        <li>
                            <button :class="{ 'active-tab': activeTab === 'Vote' }"
                            @click="letsCheck('Vote');this.$store.dispatch('marketplace/setAllFiltersToNull');this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');">
                                <span>Vote</span>                                
                                <span>Vote</span>
                            </button>
                        </li>
                        <li>
                            <button
                            :class="{ 'active-tab': activeTab === 'ActivityTable' }"
                            @click="letsCheck('ActivityTable')"
                            >
                                <span>Activities</span>                                
                                <span>Activities</span>
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
                                <span>Filter</span>
                                </button>
                                <button class="btn-param btn-param-mobile"  @click="filterMobile=true">
                                    <i class="i-filter-2-line" ></i>
                                    <span>Filter</span>
                                </button>
                            </div>
                        </div>
                        <div class="params-block params-block-sort">
                            <div class="param-wrap sort" :class="{ unfolded: testOpenSort }">
                                <button class="btn-param btn-sort" @click="testOpenSort = !testOpenSort">
                                <span v-if="this.selectedSort == null">Sort by</span>
                                <span v-else>{{this.selectedSort.name}}</span>
                                <i class="i-arrow-down-s-line"></i>
                                </button>
                                <div class="drop-down">
                                <ul>
                                    <li v-for="element in config.sortParams" :key="element" @click="testOpenSort = !testOpenSort;selectedSort=element;fetchAndSetListingsStartInfo();">
                                        <span>{{element.name}}</span>
                                    </li>                        
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div class="params-block params-block-switch">
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
                        <Filter :onlyFav="activeTab == 'ListCards'" :vote="activeTab == 'Vote'"/>
                    </div>
                    <div class="section-nft-list" :class="{'card-collapse' : switchActive == 1}">
                        <SelectedFilters v-if="filter" />
                        <ListCards v-if="activeTab === 'ListCards'" :onlyFav="false" :vote="false"/>
                        <ListCards v-if="activeTab === 'Favourites'" :onlyFav="true" :vote="false"/>
                        <ListCards v-if="activeTab === 'Vote'" :onlyFav="false" :vote="true"/>
                        <ActivityTable v-if="activeTab === 'ActivityTable'" />
                        <button v-if="activeTab == 0" class="btn-filter-mobile"  @click="filterMobile=true">
                            <i class="i-filter-2-line" ></i>
                            <span>Filter</span>
                        </button>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
<script>
import Filter from "@/components/Filter.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import SelectedFilters from "@/components/SelectedFilters.vue";
import ListCards from "@/components/ListCards.vue";
import config from '@/config.json';

export default {
    data() {
        return {
            switchActive: 0,
            activeTab: '',
            testOpenSort: false,
            filter: true,
            filterMobile: false,
            mobileDropDown: false,
            config:config
        };
    },
    components:{
        Filter,
        Breadcrumbs,
        SelectedFilters,
        ListCards
    }, 
    async mounted() {
        this.activeTab = "ListCards";
        await this.$store.dispatch('marketplace/fetchAndSetNftCollections');
        await this.$store.dispatch('marketplace/fetchAndSetMarketplaces');
        await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
    },
    methods: {
        letsCheck(name) {
          this.activeTab = name;
        },
        clearLocalStorage(){
            localStorage.clear();
        },
        async fetchAndSetListingsStartInfo() {
            if (this.$route.name == 'Marketplace') {
                await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo');
            }
            else if (this.$route.name == 'Collection') {
                console.log(this.currentlyGathering);
                await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfo', this.$route.params.contract_address);
            }
            else if (this.$route.name == 'Profile') {
                console.log(this.checkedStatus);
                if (this.onlyFav) {
                    await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUser');
                }
                else if (this.vote) {
                    await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserVote');
                }
                else {
                    await this.$store.dispatch('marketplace/fetchAndSetListingsStartInfoByUserFav');
                }

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