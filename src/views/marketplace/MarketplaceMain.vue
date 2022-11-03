<template>
    <main>
        <div class="container">
            <section class="section-breadcrumbs">
                <div class="container">
                    <Breadcrumbs />
                </div>
            </section>
        </div>
        <div class="container">
            <section>
                <div class="section-header">
                    <h1 class="section-name-h1">Marketplace NFT </h1>
                </div>

                <ul class="tabs">
                    <li><button @click="activeTab = 1" :class="{'active-tab':activeTab == 1}">Items</button></li>
                    <li><button @click="activeTab = 2" :class="{ 'active-tab': activeTab == 2 }">Activity</button></li>
                </ul>
            </section>
        </div>
    </main>
</template>

<script>

import Breadcrumbs from '@/components/Breadcrumbs.vue'
export default {
    data() {
        return {
            activeTab: 1,
        }
    },
    components: {
        Breadcrumbs,
    },
}
</script>
