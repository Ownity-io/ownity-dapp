<template>
    <footer>
        <div class="footer-row footer-row-nav">
            <div class="container">
                <div class="footer-section footer-section-first">
                    <div class="footer-block footer-block-logo">
                        <div v-if="$route.fullPath ==='/'" @click="goToTop()" class="footer-logo"></div>
                        <router-link :to="{name: 'Main'}" v-else class="footer-logo"></router-link>
                    </div>
                    <div class="footer-block" :class="{'unfolded' : !footerBlock1}">
                        <button class="footer-block-name" @click="footerBlock1 = !footerBlock1">
                            <span>{{translatesGet('MARKETPLACE')}}</span>
                            <i class="i-arrow-up-s-line"></i>
                        </button>
                        <ul class="footer-list">
                            <li><a href="">Active</a></li>
                            <li><a href="">Canceled</a></li>
                            <li><a href="">Purchased</a></li>
                            <li><a href="">On sale</a></li>
                            <li><a href="">Sold</a></li>
                        </ul>
                    </div>
                    <div class="footer-block" :class="{'unfolded' : !footerBlock2}">
                        <button class="footer-block-name" @click="footerBlock2 = !footerBlock2">
                            <span>{{translatesGet('COLLECTIONS')}}</span>
                            <i class="i-arrow-up-s-line"></i>
                        </button>
                        <ul class="footer-list">
                            <li><a href="https://jaxscan.com/collection/0xBC51d9f4A816d6Ad60E6A64DEFf0f820307A1e45">sad - sWJozDZPx2</a></li>
                            <li><a href="https://jaxscan.com/collection/0x1f419B9469D641D333805C4054CA3b65Af54d315">Snakes on a chain</a></li>
                            <li><a href="https://jaxscan.com/collection/0xd06166878623353947c8715e7F3e9f4D8585726F">Ownable BAYC</a></li>
                            <li><a href="https://jaxscan.com/collection/0x15987A0417D14cc6f3554166bCB4A590f6891B18">Masa Soul Name (MSN)</a></li>
                        </ul>
                    </div>
                    <div class="footer-block" :class="{'unfolded' : !footerBlock3}">
                        <button class="footer-block-name" @click="footerBlock3 = !footerBlock3">
                            {{translatesGet('RESOURCES')}}
                            <i class="i-arrow-up-s-line"></i>
                        </button>
                        <ul class="footer-list">
                            <li><a href="">{{translatesGet('HOME')}}</a>
                                <div v-if="$route.fullPath ==='/'" @click="goToTop()"></div>
                                <router-link :to="{name: 'Main'}" v-else></router-link>
                            </li>
                            <li><router-link :to="{ name: 'Marketplace' }">{{translatesGet('MARKETPLACE')}}</router-link></li>
                            <li
                            v-if="$route.fullPath ==='/'">
                                <a href="#screen-collections" >
                                    <span>{{translatesGet('COLLECTIONS')}}</span>
                                </a>
                            </li>
                            <li
                            v-else >
                                <router-link :to="{name: 'Main'}">
                                    <span>{{translatesGet('COLLECTIONS')}}</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :class="active" :to="{name: 'Serve'}">
                                    <span>{{translatesGet('HELP')}}</span>
                                </router-link>
                            </li>
                            <li><a href="">{{translatesGet('SITEMAP')}}</a></li>
                        </ul>
                    </div>
                    <div class="footer-block footer-block-form">
                        <div class="footer-block-name">
                            {{translatesGet('FOOTER_FORM')}}
                            <!-- <i class="i-arrow-up-s-line"></i> -->
                        </div>
                        <form action="" class="footer-form">
                            <div class="input-wrapper">
                                <input type="text" placeholder="Your email">
                                <button type="submit" class="btn btn-subscribe">{{translatesGet('SUBSCRIBE')}}</button>
                            </div>
                            <p class="agree">{{translatesGet('BY_SUBSCRIBING')}}
                                <router-link :to="{name: 'TermsOfUse'}">
                                    <span>{{translatesGet('TERMS_OF_USE')}}</span>
                                </router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-row footer-row-info">
            <div class="container">
                <div class="footer-section">
                    <div class="footer-part footer-service-links">
                        <span class="copyright">&#169; 2022 Marketplace</span>
                        <router-link :to="{name: 'TermsOfUse'}">
                            <span>{{translatesGet('TERMS_OF_USE')}}</span>
                        </router-link>
                        <router-link :to="{name: 'PrivacyPolicy'}">
                            <span>{{translatesGet('PRIVACY_POLICY')}}</span>
                        </router-link>
                    </div>
                    <div class="footer-part footer-social-links">
                        <ul class="social-links-wrap">
                            <li><a href=""><i class="i-twitter-fill"></i></a></li>  
                            <li><a href=""><i class="i-facebook-fill"></i></a></li>  
                            <li><a href=""><i class="i-telegram-fill"></i></a></li>  
                            <!-- <li><a href=""><i class="i-discord-line"></i></a></li>   -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import MultiLang from "@/core/multilang";

export default {
    
data() {
    return {
            footerBlock1: false,
            footerBlock2: false,
            footerBlock3: false,
            lang: new MultiLang(this),
        }
    },
    methods:{
        goToTop(){
            window.scrollTo(0, 0);
        },
        translatesGet(key) {
            return this.lang.get(key);
        },
    }
}
</script>