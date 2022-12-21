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
                    </div>
                </main>
            </div>

        </div>

        <FooterComponent/>
    </div>
</template>

<script>

import '../assets/styles/previous.css'
import FirstScreen from "@/views/PreviousBlock/FirstScreen.vue";
import FirstBlock from "@/components/Previous/FirstBlock.vue";
import HeaderPrevious from '@/components/Previous/HeaderPrevious.vue';
import FooterComponent from '@/components/FooterComponent.vue'

export default {
	components: {
		FirstBlock,
        HeaderPrevious,
        FooterComponent
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