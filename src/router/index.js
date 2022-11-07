import {createRouter, createWebHistory} from 'vue-router'
import Main from '../views/Main.vue'
import Marketplace from '../views/Marketplace.vue'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        redirect: "/marketplace",
    },
    {
        path: '/marketplace',
        component: Marketplace,

        children: [
            {
                path: '',
                name: 'Marketplace',
                component: () => import('@/views/marketplace/MarketplaceMain.vue'),
            },
            {
                path: '/listing',
                name: 'Listing',
                component: () => import('@/views/marketplace/MarketplaceListing.vue'),
            },
            // {
            //     path: '',
            //     name: 'Marketplace',
            //     component: () => import('@/views/marketplace/MarketplaceMain.vue'),
            // },
        ]
        // component:  () => {
            // ('@/views/MarketplaceMain.vue')
            // if (localStorage.userInfo) {
            //     return import('@/views/Cabinet.vue')
            // } else {
            //     return import('@/views/error/Error404.vue')
            // }
        // },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
