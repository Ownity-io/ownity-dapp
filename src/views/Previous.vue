<template>
    <div>
        
        <div class="wrapper-main">
            <HeaderComponent2/>
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

    </div>
</template>

<script>

import '../assets/styles/previous.css'
import FirstScreen from "@/views/PreviousBlock/FirstScreen.vue";
import FirstBlock from "@/components/Previous/FirstBlock.vue";
import HeaderComponent2 from '@/components/HeaderComponent2.vue';

export default {
	components: {
		FirstBlock,
        HeaderComponent2
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