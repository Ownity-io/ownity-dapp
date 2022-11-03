<template>
    <header>
        <div class="container">
            <div class="header-wrapper">
                <div class="header-logo">Marketplace</div>
                <div class="header-search">
                    <div class="input-wrapper search-wrapper">
                        <i class="i-search-line"></i>
                        <input type="text" placeholder="Search NFT, collections, id">
                    </div>
                </div>
                <div class="header-nav">
                    <nav>
                        <ul class="">
                            <li><a :class="{active: headerItemActive1}" href="">Marketplace</a></li>
                            <li><a :class="{active: headerItemActive2}" href="">Collections</a></li>
                            <li><a :class="{active: headerItemActive3}" href="">Help</a></li>
                        </ul>
                    </nav>
                    <div class="btn-container">
                        <button class="btn btn-connect">
                            Connect Wallet
                        </button>
                    </div>
                </div>
                <div class="header-mobile"></div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data(){
        return{
            headerItemActive1:true,
            headerItemActive2:false,
            headerItemActive3:false,
        }
    }
}
</script>