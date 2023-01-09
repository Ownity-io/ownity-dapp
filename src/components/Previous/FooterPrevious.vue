<template>
    <footer id="footer">
        <div class="footer-row footer-row-nav">
            <div class="container">
                <div class="footer-section footer-section-first">
                    <div class="footer-block footer-block-logo">
                        <div v-if="$route.fullPath ==='/'" @click="goToTop()" class="footer-logo"></div>
                        <router-link :to="{name: 'Main'}" v-else class="footer-logo"></router-link>
                        <p>Your Gateway To The Fractionalized World</p>
                        <div class="footer-part footer-social-links">
                            <ul class="social-links-wrap">
                                <li><a href="https://twitter.com/ownity_io" target="_blank"><i class="i-twitter-fill"></i></a></li>
<!--                                <li><a href=""><i class="i-facebook-fill"></i></a></li>-->
<!--                                <li><a href=""><i class="i-telegram-fill"></i></a></li>-->
                                 <li><a style="cursor: auto"><img src="@/assets/images/discord.svg" alt="" class="discord" ></a></li>
                            </ul>
                        </div>
                        <p>contact@ownity.io</p>
                    </div>
                    <div class="footer-block" :class="{'unfolded' : !footerBlock1}">
                        <button class="footer-block-name" @click="footerBlock1 = !footerBlock1">
                            <span>Explore</span>
                            <i class="i-arrow-up-s-line"></i>
                        </button>
                        <ul class="footer-list">
                            <li>
                              <a @click="goToTop()">{{translatesGet('HOME')}}</a>
                            </li>
                            <li><a href="#fractional">Fractional Ownership</a></li>
                            <li><a href="#aggregator">NFT Aggregator</a></li>
                        </ul>
                    </div>
<!--                    <div class="footer-block" :class="{'unfolded' : !footerBlock2}">-->
<!--                        <button class="footer-block-name" @click="footerBlock2 = !footerBlock2">-->
<!--                            <span>{{translatesGet('COLLECTIONS')}}</span>-->
<!--                            <i class="i-arrow-up-s-line"></i>-->
<!--                        </button>-->
<!--                        <ul class="footer-list">-->
<!--                            <li><a href="https://jaxscan.com/collection/0xBC51d9f4A816d6Ad60E6A64DEFf0f820307A1e45">sad - sWJozDZPx2</a></li>-->
<!--                            <li><a href="https://jaxscan.com/collection/0x1f419B9469D641D333805C4054CA3b65Af54d315">Snakes on a chain</a></li>-->
<!--                            <li><a href="https://jaxscan.com/collection/0xd06166878623353947c8715e7F3e9f4D8585726F">Ownable BAYC</a></li>-->
<!--                            <li><a href="https://jaxscan.com/collection/0x15987A0417D14cc6f3554166bCB4A590f6891B18">Masa Soul Name (MSN)</a></li>-->
<!--                        </ul>-->
<!--                    </div>-->
                    <div class="footer-block" :class="{'unfolded' : !footerBlock3}">
                        <button class="footer-block-name" @click="footerBlock3 = !footerBlock3">
                            {{translatesGet('RESOURCES')}}
                            <i class="i-arrow-up-s-line"></i>
                        </button>
                        <ul class="footer-list">
                            <li>
                              <a href="https://ownity.gitbook.io/ownity-documentation/" target="_blank">
                                 Documentation
                              </a>
                            </li>
                            <li>
                              <a target="_blank">
                              {{translatesGet('TERMS_OF_USE2')}}<span class="soon" style="padding-left: 5px; color: #474747"> (Soon)</span>
                              </a>
                            </li>
                            <li>
                              <a>
                                {{translatesGet('PRIVACY_POLICY')}}<span class="soon" style="padding-left: 5px; color: #474747"> (Soon)</span>
                              </a>
                            </li>
                            <li>
                              <a>
                                Brand Kit  <span class="soon" style="padding-left: 5px; color: #474747">(Soon)</span>
                              </a>
                            </li>
                        </ul>
                    </div>
                    <a class="footer-block footer-block-form">
                        <a target="_blank" href="https://t.me/Ownity" class="btn btn-previous">
                          Contact Us
                        </a>
                        <!-- <div class="footer-block-name">
                            {{translatesGet('FOOTER_FORM')}}
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
                        </form> -->
                    </a>
                </div>
            </div>
        </div>
        <!-- <div class="footer-row footer-row-info">
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
                </div>
            </div>
        </div> -->
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
