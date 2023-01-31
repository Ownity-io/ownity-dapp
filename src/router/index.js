import {createRouter, createWebHistory} from 'vue-router'
import Main from '../views/Main.vue'
import Index from '../views/Index.vue'
import Marketplace from '../views/Marketplace.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        path: '/index',
        name: 'Index',
        children: [
    {
        path: '',
        name: 'Main',
        redirect: "/",
        // redirect: "/marketplace",
    },
    {
        path: '/marketplace',
        redirect: "/",
        children: [

            {
                path: '',
                name: 'Marketplace',
                redirect: "/",
            },
            {
                path: '/listing/:contract_address/:tokenID&:id',
                name: 'Listing',
                redirect: "/",
            },
            {
                path: '/collection/:contract_address',
                name: 'Collection',
                redirect: "/",
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
        name:'Profile',
        redirect: "/",
        
    },
    {
        name: 'Serve',
        path: '/serve',
        redirect: "/",
    },
    {
        name: 'TermsOfUse',
        path: '/terms_of_use',
        redirect: "/",
    },
    {
        name: 'PrivacyPolicy',
        path: '/privacy_policy',
        redirect: "/",
    },

        ]
    },
    {
        name: 'Ownity',
        path: '/',
        component: () => import('@/views/Previous.vue'),  
        beforeEnter() {
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
        },
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (
        to.fullPath.toLowerCase().includes('marketplace/index.php') ||
        to.fullPath.toLowerCase().includes('marketplace/home.php') ||
        to.fullPath.toLowerCase().includes('marketplace/index.html') ||
        to.fullPath.toLowerCase().includes('marketplace/home.html')
    ) {
        next('404')
    } else if (to.fullPath.toLowerCase().includes('//')) {
        let a = to.fullPath.toLowerCase().replaceAll(/\/+/g, '/')
        if(a[a.length-1] === '/'){
            a = a.slice(0, -1);
        }
        next(a)
    }else if(to.fullPath[to.fullPath.length-1].includes('/') && to.fullPath !== '/'){
        let a =  to.fullPath.slice(0, -1);
        next(a)
    } else if(to.fullPath.toLowerCase() !== to.fullPath) {
        let a = to.fullPath.toLowerCase()
        if(a[a.length-1] === '/'){
            a = a.slice(0, -1);
        }
        next(a)
    } else {
        next()
    }
})

export default router
