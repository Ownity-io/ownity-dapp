<template>
<!--     <MobileMenu :class="{show: (mobileMenu==true)}" :walletConnected="(walletConnected=walletConnected)" />-->

    <div class="mobile-menu previousMob" :class="{show: (mobileMenu==true)}">
        <div class="mobile-menu-content">
        <div class="mobile-menu-main-btn">
            <div class="mobile-menu-container container">
            <div class="btn-container">
              <a href="/main" class="btn btn-connect">
                <span>Try Beta</span>
              </a>
            </div>
            </div>
        </div>
        <div class="mobile-menu-container container">
            <nav class="mobile-menu-list">
            <ul class="">
                <li class="mobile-menu-item">
                    <a href=""><span>Home</span></a>
                </li>
                <li class="mobile-menu-item drop-down-item" :class="{more :mobItem0}">
                    <button @click="mobItem0 = !mobItem0" >
                        <span>About</span>
                        <i class="i-arrow-down-s-line"></i>
                    </button>
                    <ul class="header-drop-down">
                        <li>
                            <a href="#litepaper">About Us</a>
                        </li>
                        <li><a href="#faqs">FAQ</a></li>
                    </ul>
                </li>
                <li class="mobile-menu-item drop-down-item" :class="{more :mobItem1}">
                    <button @click="mobItem1 = !mobItem1" >
                        <span>Community</span>
                        <i class="i-arrow-down-s-line"></i>
                    </button>
                    <ul class="header-drop-down">
                        <li>
                            <a href="https://twitter.com/ownity_io" target="_blank">
                                <Twitter />
                                Twitter
                            </a>
                        </li>
                      <li>
                        <a href="https://discord.com/invite/j2zMN6CJd7">
                          <Discord />
                          Discord
                        </a>
                      </li>
                    </ul>
                </li>
                <!-- <li class="mobile-menu-item drop-down-item" :class="{more :mobItem3}">
                    <button @click="mobItem3 = !mobItem3" >
                        <span>About</span>
                        <i class="i-arrow-down-s-line"></i>
                    </button>
                    <ul class="header-drop-down">
                        <li>
                            <a href="">About Us</a>
                        </li>
                        <li><a href="">FAQ</a></li>
                        <li><a href="">Team</a></li>
                    </ul>
                </li> -->

                    <li class="mobile-menu-item drop-down-item">
                        <a href="https://ownity.gitbook.io/ownity-documentation/" target="_blank">
                            <span>Documentation</span>
                        </a>                        
                    </li>
            </ul>
            </nav>
        </div>
        </div>
    </div>
    <header>
        <div class="container">
            <div class="header-wrapper">
                <!-- <div v-if="$route.fullPath ==='/'" @click="goToTop()" class="header-logo"></div> -->
                <!-- <router-link :to="{name: 'Main'}" v-else class="header-logo"></router-link> -->
                <button @click="goToTop" class="header-logo"></button>
         
                <div class="header-nav">
                    <nav>
                        <ul class="">
                            <li>
                                <button @click="goToTop">
                                    <span>Home</span>
                                </button>
                            </li>

                            <li class="drop-down-item">
                                <button>
                                    <span>About</span>
                                    <i class="i-arrow-down-s-line"></i>
                                </button>
                                <ul class="header-drop-down">
                                    <li>
                                        <a href="#litepaper">About Us</a>
                                    </li>
                                    <li><a href="#faqs">FAQ</a></li>
                                </ul>
                            </li>

                            <li class="drop-down-item">
                                <button>
                                    <span>Community</span>
                                    <i class="i-arrow-down-s-line"></i>
                                </button>
                                <ul class="header-drop-down">
                                    <li>
                                        <a href="https://twitter.com/ownity_io" target="_blank">
                                            <Twitter />
                                            Twitter
                                        </a>
                                    </li>
                                  <li>
                                    <a href="https://discord.com/invite/j2zMN6CJd7">
                                      <Discord />
                                      Discord
                                    </a>
                                  </li>
                                </ul>
                            </li>

                            <li class="drop-down-item">
                                <a href="https://ownity.gitbook.io/ownity-documentation/" target="_blank">
                                    <span>Documentation</span>
                                </a>                        
                            </li>
                        </ul>
                    </nav>
                    <div class="btn-container">
                        <a href="/main" class="btn btn-connect">
                            Try Beta
                        </a>
                    </div>
                </div>
                <div class="header-mobile">
                    <button @click="(mobileMenu=true)" class="btn-mob-header"  v-if="(mobileMenu==false)">
                        <i class="i-menu-line"></i>
                    </button>
                    <button @click="(mobileMenu=false)" class="btn-mob-header"  v-if="(mobileMenu==true)">
                        <i class="i-close-line"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

import MultiLang from "@/core/multilang";
// import Search from '@/components/Search.vue'
// import MobileMenu from '@/components/MobileMenu.vue'
import Telegram from "@/components/icons/Telegram.vue"
import Twitter from "@/components/icons/Twitter.vue"
import Discord from "@/components/icons/Discord.vue"

export default {
    data(){
        return{
            walletConnected:1,
            mobileMenu: false,
            mobItem0:false,
            mobItem1:false,
            mobItem2:false,
            lang: new MultiLang(this),
        }
    },
    components: {
        Telegram,
        Twitter,
        Discord
    },
    methods:{
        getWalletFromLS() {
            this.walletConnected = localStorage.getItem('connectedWallet');
        },
        clearLocalStorage(){
            localStorage.clear();
        },
        goToTop(){
            window.scrollTo(0, 0);
        },
        translatesGet(key) {
            return this.lang.get(key);
        },
    },
    async mounted(){
        this.getWalletFromLS();
        const delay = (delayInms) => {
            return new Promise(resolve => setTimeout(resolve, delayInms));
        }
        while (true) {
            await delay(1000);
            this.getWalletFromLS();
        }
    }
}
</script>