<template>
  <div class="not-found">
    <div class="wrapper">
      <h1 class="title-404">404</h1>
      <p class="subtitle-404">Not Found</p>
      <p class="disc-404">The page requested can not be found.</p>
      <button>
        Explore Marketplace
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>
.not-found {
    min-height: 90vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("../assets/images/404.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
button {
    padding: 12px 28px;
    background: linear-gradient(89.43deg, #3E80FF -3.17%, #2457D5 109.46%);
    box-shadow: 0px 0px 20px rgba(73, 129, 239, 0.5);
    border-radius: 8px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: #FFFFFF;
    margin: 0 auto;
}

.subtitle-404{
    font-weight: 700;
    font-size: 48px;
    line-height: 57px;
    text-align: center;
    color: #333333;
    margin-bottom: 40px;


}
.title-404{
    font-weight: 700;
    font-size: 200px;
    line-height: 237px;
    text-align: center;
    color: #333333;
}
.disc-404 {
    font-size: 24px;
    line-height: 28px;
    text-align: center;

    color: #333333;
    margin-bottom: 40px;
}

@media (max-width: 600px) {
    .title-404{
        font-size: 150px;
        line-height: 200px;}
    .disc-404{
        font-size: 24px;
        margin-bottom: 30px;}
    .subtitle-404{
        font-size: 40px;
        margin-bottom: 20px;}
}

</style>