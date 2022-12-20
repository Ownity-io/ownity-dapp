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
                            <div class="previous-animation">
                                
                            </div>
                            <div class="previous-container">
                                <div class="previous-first-screen-content">

                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

        </div>

    </div>
</template>

<script>

import '../assets/styles/previous.css'

export default {
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