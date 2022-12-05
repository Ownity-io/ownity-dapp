import {createRouter, createWebHistory} from 'vue-router'
import Main from '../views/Main.vue'
import Marketplace from '../views/Marketplace.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        // redirect: "/marketplace",
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
                path: '/listing/:contract_address/:tokenID&:id',
                name: 'Listing',
                component: () => import('@/views/marketplace/MarketplaceListing.vue'),
            },
            {
                path: '/collection/:contract_address',
                name: 'Collection',
                component: () => import('@/views/marketplace/MarketplaceCollections.vue'),
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
    {
        path: '/profile',
        component: Profile,
        name:'Profile'
        
    },
    {
        path: '/serve',
        component: () => import('@/views/services/Serve.vue'),     
    },
    {
        path: '/terms_of_use',
        component: () => import('@/views/services/TermsOfUse.vue'),  
    },
    {
        path: '/privacy_policy',
        component: () => import('@/views/services/PrivacyPolicy.vue'),  
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
