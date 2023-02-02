<template>
    <div class="page-wrapper page-profile">
        <main>
            <FilterMobile v-if="getFilterMobile" :onlyFav="activeTab == 'Favourites'" :vote="activeTab == 'Vote'" :activities = "activeTab == 'ActivityTable'" />
            <!-- <div  class="filter-mobile-wrap">
                <div class="filter-mobile-container">
                    <div class="filter-mobile-header">
                        <div>{{translatesGet('FILTERS')}}</div>
                        <button class="btn-close" @click="updateFilterMobile(false)">
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
                                <button class="btn-copy profile-copied" @click='copy();showCopyMessage();'><i class="i-checkbox-multiple-blank-line"></i></button>
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
                            @click="letsCheck('ListCards', true)"
                            >
                                <span>{{translatesGet('ITEMS')}}</span>
                                <span>{{translatesGet('ITEMS')}}</span>
                            </button>
                        </li>
                        <li>
                            <button
                            :class="{ 'active-tab': activeTab === 'Favourites' }"
                            @click="letsCheck('Favourites', true)">
                                <span>{{translatesGet('FAVOURITES')}}</span>
                                <span>{{translatesGet('FAVOURITES')}}</span>
                            </button>
                        </li>
                        <li>
                            <button :class="{ 'active-tab': activeTab === 'Vote' }"
                            @click="letsCheck('Vote', true)">
                                <span>{{translatesGet('VOTES')}}</span>
                                <span>{{translatesGet('VOTES')}}</span>
                            </button>
                        </li>
                        <li>
                            <button
                            :class="{ 'active-tab': activeTab === 'ActivityTable'}"
                            @click="letsCheck('ActivityTable', true)"
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
                                <button class="btn-param btn-param-mobile"  @click="updateFilterMobile(true)">
                                    <i class="i-filter-2-line" ></i>
                                    <span>{{translatesGet('FILTER')}}</span>
                                </button>
                            </div>
                        </div>
                        <SortBar :activeTab="activeTab"/>
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
                    <div v-if="filter" class="section-nft-filter" :class="{'filter-mobile': getFilterMobile}">
                        <Filter :onlyFav="activeTab == 'Favourites'" :vote="activeTab == 'Vote'" :activities = "activeTab == 'ActivityTable'"/>
                    </div>
                    <div class="section-nft-list" :class="{'card-collapse' : switchActive == 1}">
                        <SelectedFilters v-if="filter" :activities = "activeTab == 'ActivityTable'" :onlyFav="activeTab == 'Favourites'" :vote="activeTab == 'Vote'"/>
                        <ListCards v-if="activeTab === 'ListCards'" :onlyFav="false" :vote="false"/>
                        <ListCards v-if="activeTab === 'Favourites'" :onlyFav="true" :vote="false"/>
                        <ListCards v-if="activeTab === 'Vote'" :onlyFav="false" :vote="true"/>
                        <ActivityTable v-if="activeTab === 'ActivityTable'" />
                        <button v-if="activeTab == 0" class="btn-filter-mobile"  @click="updateFilterMobile(true)">
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
import {mapActions, mapGetters, mapMutations} from "vuex";
const source = localStorage.getItem('userAddress');
const { copy } = useClipboard({ source })

export default {
  data() {
      return {
          switchActive: 0,
          tabList: {
            all: 'ListCards',
            favorites: 'Favourites',
            votes: 'Vote',
            activity: 'ActivityTable'
          },
          activeTab: 'ListCards',
          testOpenSort: false,
          filter: true,
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
  computed:{
    ...mapGetters(['getFilterMobile']),
    selectedSort:{
      get(){
        return this.$store.getters['marketplace/getSelectedSort'];
      },
      async set(value){
        this.$store.dispatch('marketplace/setSelectedSort',value);
        // console.log(await this.$store.getters['marketplace/getSelectedSort']);
      }
    }
  },
    methods: {
        ...mapMutations(['updateFilterMobile']),
        ...mapActions({
          setAllFiltersToNull: 'marketplace/setAllFiltersToNull',
          fetchAndSetListingsStartInfoByUser: 'marketplace/fetchAndSetListingsStartInfoByUser',
          fetchAndSetListingsStartInfoByUserFav: 'marketplace/fetchAndSetListingsStartInfoByUserFav',
          fetchAndSetListingsStartInfoByUserVote: 'marketplace/fetchAndSetListingsStartInfoByUserVote',
          fetchAndSetActivitiesResult: 'marketplace/fetchAndSetActivitiesResult',
          fetchAndSetMarketplaces: 'marketplace/fetchAndSetMarketplaces',
          fetchAndSetNftCollections: 'marketplace/fetchAndSetNftCollections'
        }),
        translatesGet(key) {
        return this.lang.get(key);
        },
        letsCheck(name, isFirst) {
          for (const el in this.tabList) {
            if(this.tabList[el] === name){
              this.$router.push({path: `/profile/${el}`})
              this.activeTab = name;
              break;
            }
          }
          this.setAllFiltersToNull()
          if(this.activeTab === 'ListCards'){
            this.fetchAndSetListingsStartInfoByUser(isFirst)
          }
          if(this.activeTab === 'Favourites'){
            this.fetchAndSetListingsStartInfoByUserFav(isFirst)
          }
          if(this.activeTab === 'Vote'){
            this.fetchAndSetListingsStartInfoByUserVote(isFirst)
          }
          if(this.activeTab === 'ActivityTable'){
            this.fetchAndSetActivitiesResult({userAddress: this.userAddress, collectionAddress: null, isFirst})
          }
        },
        clearLocalStorage(){
            localStorage.clear();
        },
        async showCopyMessage(){
            await this.$store.dispatch('appGlobal/setSnackText', 'Copied!')
            await this.$store.dispatch('appGlobal/setGreenSnack', true)
            await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout', 2)
        }
    },

  async mounted() {
    this.userAddress = localStorage.getItem('userAddress');

    this.activeTab = this.$route.params.tab ? this.tabList[`${this.$route.params.tab}`] : this.tabList.all
    this.letsCheck(this.activeTab, true)

    await this.fetchAndSetNftCollections()
    await this.fetchAndSetMarketplaces()
  },
}
</script>