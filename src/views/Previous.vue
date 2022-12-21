<template>
    <div>
        
        <div class="wrapper-main">
            <div>
                Previous-page mob-menu
            </div>
            <header>
                <div class="container">
                    <div class="header-wrapper">
                Previous-page Header

                    </div>
                </div>
            </header>
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

export default {
	components: {
		FirstBlock
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