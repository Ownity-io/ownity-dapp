<template>
<div class="s-card-listing"></div>
</template>

<script>
export default {
	name: "SkeletonCardListing"
}
</script>

<style scoped>
.s-card-listing{
    position: sticky;
    border-radius: 8px;
    overflow: hidden;
    background-repeat: no-repeat;
    background: #EEEFF3;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 500% 350%;
    background-position: center;
    -webkit-animation: 2.5s shine linear infinite;
    animation: 2.5s shine linear infinite;
    width: 586px;
    height: 586px;
}
@-webkit-keyframes shine {
    to {
        background-position-x: -500%;
    }
}

@keyframes shine {
    to {
        background-position-x: -400%;
    }
}
</style>