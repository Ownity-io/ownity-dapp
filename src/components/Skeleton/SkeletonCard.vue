<template>
  <section class="s-card-loader">
    <div class="s-card">
      <div class="s-card-img">

      </div>
      <div class="s-card-bottom">
        <div class="s-card-wrapper">
          <p class="s-card-name"></p>
          <p class="s-card-price"></p>
        </div>
        <p class="s-card-info"></p>
        <button class="s-card-button">

        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
	name: "SkeletonCard"
}
</script>

<style scoped>
.s-card{
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: 4px 4px 20px rgba(129, 136, 153, 0.1);
    border-radius: 8px;
    max-width: 275px;
    width: 100%;
    height: 433px;
    margin-bottom: 16px;
}

.s-card-loader{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
}

.s-card-img{
    border-radius: 8px 8px 0px 0px;
    width: 100%;
    height: 275px;
}

.s-card-wrapper{
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.s-card-price,
.s-card-name{
    border-radius: 8px;
    width: 80px;
    height: 20px;
}

.s-card-info{
    border-radius: 8px;
    width: 80px;
    height: 12px;
    margin-top: 8px;
}

.s-card-bottom{
    padding: 16px;
}

.s-card-button{
    background: #EEEFF3;
    border-radius: 8px;
    height: 48px;
    width: 100%;
    margin-top: 32px;
}
.s-card-button,
.s-card-info,
.s-card-price,
.s-card-name,
.s-card-img {
    background: #EEEFF3;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 300% 150%;
    -webkit-animation: 2.5s shine linear infinite;
    animation: 2.5s shine linear infinite;
}

@-webkit-keyframes shine {
    to {
        background-position-x: -300%;
    }
}

@keyframes shine {
    to {
        background-position-x: -300%;
    }
}

.s-card{}

</style>