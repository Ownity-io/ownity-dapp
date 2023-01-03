<template>
        <div class="wrapper-main">
            <HeaderPrevious/>
            <div class="page-wrapper">
                <main>
                    <div class="main-bg">
                        <section class="previous-first-screen">
                           <first-block/>
                        </section>
                        <section class="previous-second-screen">
                          <second-block/>
                        </section>
                        <section class="previous-cards-screen">
                            <div class="container">
                                <div class="previous-screen-header">
                                    <div class="previous-title">Open Fraction Deals</div>
                                <div class="previous-describe">
                                    The best open deals you can take part in right now. 
                                    Join a deal that's already started, contribute your part, and become an official owner.
                                </div>
                            <div class="previous-link">Learn more about open deals</div>
                                </div>
                                <div class="previous-cards-list">
                                    <div class="cards-container">
                                        <PreviousCard />
                                    </div>
                                    <button class="btn btn-previous">See All Deals</button>
                                </div>
                            </div>
                        </section>
                        <section class="previous-third-screen">
                          <third-block/>
                        </section>
                        <section class="previous-third-screen">
                          <four-block/>
                        </section>
                        <section class="previous-faq-screen">
                          <p class="faq-title">FAQ</p>
                          <faq-block/>
                        </section>
                        <section class="previous-five-screen">
                          <fifth-block/>
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

        }
    },
    mounted(){
        document.body.classList.add('previous-page');
	    window.onload = function(e){
		    window.scrollBy(1,1);
	    }
    },
    unmounted(){
        document.body.classList.remove('previous-page');
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