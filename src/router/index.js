import {createRouter, createWebHistory} from 'vue-router'
import Main from '../views/Main.vue'
import Index from '../views/Index.vue'
import Marketplace from '../views/Marketplace.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        path: '/main',
        name: 'Index',
        children: [

            {
                path: '',
                name: 'Main',
                component: Main,
            },
            {
                path: '/referral_program',
                name: 'ReferralProgram',
                component: () => import('@/views/ReferralProgram.vue'),
            },
            {
                path: '/marketplace',
                component: Marketplace,
                
                children: [
                    {
                        path: ':tab?',
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
                    }
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
                path: '/profile/:tab?',
                component: Profile,
                name:'Profile',
                
            },
            {
                name: 'Serve',
                path: '/serve',
                component: () => import('@/views/services/Serve.vue'),     
            },
            {
                name: 'TermsOfUse',
                path: '/terms_of_use',
                component: () => import('@/views/services/TermsOfUse.vue'),  
            },
            {
                name: 'PrivacyPolicy',
                path: '/privacy_policy',
                component: () => import('@/views/services/PrivacyPolicy.vue'),  
            },
            {
                name: '404',
                path: '/:pathMatch(.*)*',
                component: () => import('@/views/404.vue'),
            },

        ]
    },
    {
        name: 'Previous',
        path: '/',
        component: () => import('@/views/Previous.vue'),  
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
