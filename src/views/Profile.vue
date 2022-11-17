<template>
    <div class="page-wrapper page-profile">
        <main>
            <div class="container">
                <section class="section-breadcrumbs">
                    <Breadcrumbs />
                </section>
            </div>

            <section>
                <div class="container">
                    <div class="profile-header">
                        <div class="icon-profile"></div>
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
                            <button class="btn btn-log-out">
                                <i class="i-logout-box-line"></i>
                                <span>Log Out</span>
                            </button>
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
                            @click="letsCheck('ListCards')"
                            >
                                <span>Items</span>                                
                                <span>Items</span>
                            </button>
                        </li>
                        <li>
                            <button>
                                <span>Favourites</span>                                
                                <span>Favourites</span>
                            </button>
                        </li>
                        <li>
                            <button >
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
                                <button class="btn-param btn-param-mobile">
                                    <i class="i-filter-2-line" ></i>
                                    <span>Filter</span>
                                </button>
                            </div>
                        </div>
                        <div class="params-block params-block-sort">
                            <div class="param-wrap sort" :class="{ unfolded: testOpenSort }">
                                <button class="btn-param btn-sort" @click="testOpenSort = !testOpenSort">
                                <span>Sort by</span>
                                <i class="i-arrow-down-s-line"></i>
                                </button>
                                <div class="drop-down">
                                <ul>
                                    <li>
                                    <span>Price low to higt</span>
                                    </li>
                                    <li>
                                    <span>Price higt to low</span>
                                    </li>
                                    <li>
                                    <span>Newest</span>
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
                    <div v-if="filter" class="section-nft-filter">
                    <Filter />
                    </div>
                    <div class="section-nft-list" :class="{'card-collapse' : switchActive == 1}">
                        <SelectedFilters v-if="filter" />
                        <ListCards v-if="activeTab === 'ListCards'" />
                        <ActivityTable v-if="activeTab === 'ActivityTable'" />
                        <button v-if="activeTab == 0" class="btn-filter-mobile">
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

export default {
    data() {
        return {
            switchActive: 0,
            activeTab: '',
            testOpenSort: false,
            filter: true,
        };
    },
    components:{
        Filter,
        Breadcrumbs,
        SelectedFilters,
        ListCards
    }, 
    mounted() {
        this.activeTab = "ListCards";
    },
    methods: {
        letsCheck(name) {
          this.activeTab = name;
        },
    },
}
</script>