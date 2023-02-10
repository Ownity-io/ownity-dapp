<template>
    <footer>
        <div class="footer-row footer-row-nav">
            <div class="container">
                <div class="footer-section footer-section-first">
                    <div class="footer-block footer-block-logo" @click="goToTop()">
                        <div v-if="$route.fullPath ==='/'" class="footer-logo"></div>
                        <router-link :to="{name: 'Main'}" v-else  class="footer-logo"></router-link>
                    </div>
<!--                    <div class="footer-block" :class="{'unfolded' : !footerBlock1}">-->
<!--                        <div class="footer-block-name">-->
<!--                            <span>{{translatesGet('MARKETPLACE')}}</span>-->
<!--                        </div>-->
<!--                        <button class="footer-block-name" @click="footerBlock1 = !footerBlock1">-->
<!--                            <span>{{translatesGet('MARKETPLACE')}}</span>-->
<!--                            <i class="i-arrow-up-s-line"></i>-->
<!--                        </button>-->
<!--                        <ul class="footer-list">-->
<!--                            <li><a href="">Active</a></li>-->
<!--                            <li><a href="">Canceled</a></li>-->
<!--                            <li><a href="">Purchased</a></li>-->
<!--                            <li><a href="">On sale</a></li>-->
<!--                            <li><a href="">Sold</a></li>-->
<!--                        </ul>-->
<!--                    </div>-->
                    <div class="footer-block" :class="{'unfolded' : !footerBlock2}">
                        <div class="footer-block-name">
                            <span>{{translatesGet('COLLECTIONS')}}</span>
                        </div>
                        <button class="footer-block-name" @click="footerBlock2 = !footerBlock2">
                            <span>{{translatesGet('COLLECTIONS')}}</span>
                            <i class="i-arrow-up-s-line"></i>
                        </button>

                        <ul v-if="getCollectionsFooter && getCollectionsFooter.length" class="footer-list">
                            <li v-for="collection in getCollectionsFooter" :key="collection.contract_address">
                              <a :href="`/collection/${collection.contract_address}`">
                                {{collection.name}}
                              </a>
                            </li>
                        </ul>

                    </div>
                    <div class="footer-block" :class="{'unfolded' : !footerBlock3}">
                        <div class="footer-block-name">
                            <span>{{translatesGet('RESOURCES')}}</span>
                        </div>
                        <button class="footer-block-name" @click="footerBlock3 = !footerBlock3">
                            {{translatesGet('RESOURCES')}}
                            <i class="i-arrow-up-s-line"></i>
                        </button>
                        <ul class="footer-list">
                            <li>
                              <a href="/">{{translatesGet('HOME')}}</a>
                                <div v-if="$route.fullPath ==='/'" @click="goToTop()"></div>
                                <router-link :to="{name: 'Main'}" v-else></router-link>
                            </li>
                            <li><router-link :to="{ name: 'Marketplace' }">{{translatesGet('MARKETPLACE')}}</router-link></li>
                            <li
                            v-if="$route.path ==='/'">
                                <a ref="screenCollections" href="#screen-collections" >
                                    <span>{{translatesGet('COLLECTIONS')}}</span>
                                </a>
                            </li>
                            <li
                            v-else  @click="$refs.screenCollections.click()">
                                <router-link :to="{name: 'Main'}">
                                    <span>{{translatesGet('COLLECTIONS')}}</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :class="active" :to="{name: 'Serve'}">
                                    <span>{{translatesGet('HELP')}}</span>
                                </router-link>
                            </li>
<!--                            <li><a href="">{{translatesGet('SITEMAP')}}</a></li>-->
                        </ul>
                    </div>
                    <div class="footer-block footer-block-form">
                        <div class="footer-block-name">
                            {{translatesGet('FOOTER_FORM')}}
                            <!-- <i class="i-arrow-up-s-line"></i> -->
                        </div>
                        <div action="" class="footer-form">
                            <div class="input-wrapper">
                                <input placeholder="Your email" v-model="email" >
                                <button type="submit" class="btn btn-subscribe" @click="validateEmail">{{translatesGet('SUBSCRIBE')}}</button>
                            </div>
                            <p class="agree">{{translatesGet('BY_SUBSCRIBING')}}
                                <router-link :to="{name: 'TermsOfUse'}">
                                    <span>{{translatesGet('TERMS_OF_USE2')}}</span>
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-row footer-row-info">
            <div class="container">
                <div class="footer-section">
                    <div class="footer-part footer-service-links">
                        <span class="copyright">&#169; Ownity 2022 - 2023 | All rights reserved.</span>
                        <router-link :to="{name: 'TermsOfUse'}">
                            <span>Term Of Use</span>
                        </router-link>
                        <router-link :to="{name: 'PrivacyPolicy'}">
                            <span>Privacy Policy</span>
                        </router-link>
                    </div>
                    <div class="footer-part footer-social-links">
                        <ul class="social-links-wrap">
                            <li><a target="_blank" href="https://twitter.com/ownity_io"><i class="i-twitter-fill"></i></a></li>
<!--                            <li><a target="_blank" href=""><i class="i-facebook-fill"></i></a></li>  -->
<!--                            <li><a target="_blank" href=""><i class="i-telegram-fill"></i></a></li>  -->
                            <li><a target="_blank" href="https://discord.com/invite/j2zMN6CJd7"><i class="i-discord-line"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import MultiLang from "@/core/multilang";
import config from '@/config.json';
import {mapActions, mapGetters} from "vuex";
export default {
data() {
    return {
            footerBlock1: false,
            footerBlock2: false,
            footerBlock3: false,
            lang: new MultiLang(this),
            email:null,
            config:config
        }
    },
    computed: {
    ...mapGetters(['getCollectionsFooter'])
    },
    methods:{
        ...mapActions(['fetchCollectionsFooter']),
        goToTop(){
            window.scrollTo(0, 0);
        },
        translatesGet(key) {
            return this.lang.get(key);
        },
        async validateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                console.log('Nice email!');
                //sendEmailHere
                let requestLink = `${this.config.backendApiEntryPoint}mailing-list-add/`;
                let requestOptions = {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': this.email
                    }),
                };
                let request = await fetch(requestLink, requestOptions);
                if (request.ok){
                    this.email=null;
                    await this.$store.dispatch('appGlobal/setSnackText','Congrats! Your email was successfully written!')
                    await this.$store.dispatch('appGlobal/setGreenSnack',true)
                    await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)
                }
            } else {
              this.email=null;
                    await this.$store.dispatch('appGlobal/setSnackText','Something went wrong… Try again later')
                    await this.$store.dispatch('appGlobal/setGreenSnack',false)
                    await this.$store.dispatch('appGlobal/setShowSnackBarWithTimeout',2)
            }
        }
    },
    mounted(){
      this.fetchCollectionsFooter()
    }
}
</script>