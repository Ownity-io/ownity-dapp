<template>
        <div class="wrapper-main">
            <HeaderPrevious/>
            <div class="page-wrapper">
                <main>
                    <div class="main-bg">
                        <section class="previous-first-screen">
                           <first-block/>
                        </section>
                        <section class="previous-second-screen" id="fractional">
                            <div class="container">
                                <second-block/>
                            </div>
                        </section>
                        <section class="previous-cards-screen" >
                            <div class="container">
                                <div class="previous-screen-header">
                                    <div class="previous-title">Hot Fractionalization Listings</div>
                                <div class="previous-describe">
                                  Check out what NFTs are fresh on the Ownity fractionalization list to pick up a fraction of one from your fave collection.
                                </div>
<!--                            <div class="previous-link">More on Fractionalization Listings</div>-->
                                </div>
                                <div class="previous-cards-list">
                                    <div class="cards-container">
                                        <PreviousCard />
                                    </div>
<!--                                    <button class="btn btn-previous">To All Listings</button>-->
                                </div>
                            </div>
                        </section>
                        <section class="previous-third-screen" id="aggregator">
                          <div class="container">
                            <third-block/>
                          </div>
                        </section>
                        <section class="previous-third-screen">
                          <div class="container">
                            <four-block/>
                          </div>
                        </section>
                      <div id="faqs" style="margin-bottom: 20px"></div>
                        <section class="previous-faq-screen">
                            <div class="container">
                                <p class="faq-title">{{translatesGet('FAQ_TITLE_SHORT')}}</p>
                                <faq-block id="litepaper"/>
                            </div>
                        </section>
                        <section class="previous-five-screen" >
                            <div class="container">
                              <fifth-block/>
                            </div>
                        </section>
                        <section class="previous-last-screen">
                            <six-block/>
                        </section>
                    </div>
                </main>
            </div>

        </div>

        <FooterPrevious/>
</template>

<script>
import MultiLang from "@/core/multilang";

import '../assets/styles/previous.css'
import FirstBlock from "@/components/Previous/FirstBlock.vue";
import HeaderPrevious from '@/components/Previous/HeaderPrevious.vue';
import FooterPrevious from '@/components/Previous/FooterPrevious.vue'
import SecondBlock from "@/components/Previous/SecondBlock.vue";
import ThirdBlock from "@/components/Previous/ThirdBlock.vue";
import PreviousCard from "@/components/Previous/PreviousCard.vue";
import FourBlock from "@/components/Previous/FourBlock.vue";
import FaqBlock from "@/components/Previous/FaqBlock.vue";
import FifthBlock from "@/components/Previous/FifthBlock.vue";
import SixBlock from "@/components/Previous/SixBlock.vue";
import { assignMetas } from "../metas";

export default {
	components: {
		SixBlock,
		FifthBlock,
		FaqBlock,
		FourBlock,
		ThirdBlock,
		SecondBlock,
		FirstBlock,
        HeaderPrevious,
        FooterPrevious,
        PreviousCard,
	},
    data() {
        return{
            lang: new MultiLang(this),
        }
    },
    methods:{
        translatesGet(key) {
        return this.lang.get(key);
        },
    },
    mounted(){

        assignMetas(this.$route.name); //? assigning the title and description to the <header> tag

        document.body.classList.add('previous-page');
	      window.onload = function(e){
		    window.scrollBy(1,1);
	    }
    },
    unmounted(){
        document.body.classList.remove('previous-page');
        assignMetas('') //? //? temporary resetting the title and description to the <header> tag
    },
}
</script>

<style>
@media (max-width: 991px) {
    .previous-title {
        text-align: left;
        font-size: 32px;
    }
    .previous-describe{
        text-align: left;
        font-size: 18px;

    }
    .previous-cards-screen .previous-screen-header {
        padding-left: 15px;
        padding-right: 15px;
    }
}

@media (max-width: 460px){
    .previous-title{
        font-size: 24px;
        margin-bottom: 16px;
        line-height: normal;
        text-align: left;
        margin-right: auto;
    }
    .previous-describe {
        font-size: 16px;
        text-align: left;
    }
}
</style>