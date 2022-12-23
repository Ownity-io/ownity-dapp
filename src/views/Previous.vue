<template>
    <div>

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
                    </div>
                </main>
            </div>

        </div>

        <FooterPrevious/>
    </div>
</template>

<script>

import '../assets/styles/previous.css'
import FirstBlock from "@/components/Previous/FirstBlock.vue";
import HeaderPrevious from '@/components/Previous/HeaderPrevious.vue';
import FooterPrevious from '@/components/Previous/FooterPrevious.vue'
import SecondBlock from "@/components/Previous/SecondBlock.vue";
import PreviousCard from "@/components/Previous/PreviousCard.vue";

export default {
	components: {
		SecondBlock,
		FirstBlock,
        HeaderPrevious,
        FooterPrevious,
        PreviousCard
	},
    data() {
        return{

        }
    },
    mounted(){
        document.body.classList.add('previous-page');
    },
    unmounted(){
        document.body.classList.remove('previous-page');
    },
}
</script>