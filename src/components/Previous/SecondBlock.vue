<template>
  <div class="fractional">
    <div class="fractional-left">
      <p class="fractional-title">Fractional Ownership</p>
      <p class="fractional-subtitle">
        The mechanics of fractional ownership enable users to purchase an NFT in a group.
        Each user can contribute the required part and start or maintain the fundraising for the listing purchase.
      </p>
      <p class="fractional-options-title" >
        Flexible interaction options
      </p>
      <div class="fractional-options">
        <div class="fractional-inner">
          <div><div class="design"></div><p>Buy 1% to 100% of NFT</p></div>
          <div ref="fractional"><div class="design"></div><p>Make decisions in DAO mode</p></div>
        </div>
        <div class="fractional-inner">
          <div><div class="design"></div><p>Sell your part at any time</p></div>
          <div><div class="design"></div><p>Explore profitable listings</p></div>
        </div>
      </div>
    </div>
    <div class="fractional-right">
      <div class="factional-nft square-transition" ref="square">
        <div class="factional-nft-1">
          <span class="nft-procent">
            <p class="nft-procent-title">25% (≈$25,000)</p>
            <span class="nft-procent-user">
              <span class="nft-procent-user-icon"></span>
              <p class="nft-procent-user-name">Aaron Stuffs</p>
            </span>
          </span>
        </div>
        <div class="factional-nft-2">
          <span class="nft-procent">
            <p class="nft-procent-title">23% (≈$23,000)</p>
            <span class="nft-procent-user">
              <span class="nft-procent-user-icon"></span>
              <p class="nft-procent-user-name">Amethyst</p>
            </span>
          </span>

        </div>
        <div class="factional-nft-3">
          <span class="nft-procent">
            <p class="nft-procent-title">17% (≈$17,000)</p>
            <span class="nft-procent-user">
              <span class="nft-procent-user-icon"></span>
              <p class="nft-procent-user-name">Star Muffin</p>
            </span>
          </span>

        </div>
        <div class="factional-nft-4">
          <span class="nft-procent">
            <p class="nft-procent-title">16% (≈$16,000)</p>
            <span class="nft-procent-user">
              <span class="nft-procent-user-icon"></span>
              <p class="nft-procent-user-name">Sammy</p>
            </span>
          </span>

        </div>
        <div class="factional-nft-5">
          <span class="nft-procent">
            <p class="nft-procent-title">19% (≈$19,000)</p>
            <span class="nft-procent-user">
              <span class="nft-procent-user-icon"></span>
              <p class="nft-procent-user-name">fractur3.eth</p>
            </span>
          </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "SecondBlock",
  mounted() {
	  const square = this.$refs.square;
	  square.classList.remove('square-transition');

	  const observer = new IntersectionObserver(entries => {
		  entries.forEach(entry => {
			  if (entry.isIntersecting) {
				  square.classList.add('square-transition');
				  return;
			  }
			  square.classList.remove('square-transition');
		  });
	  });
	  observer.observe(this.$refs.fractional);
  }
}
</script>

<style scoped>
.factional-nft-5 .nft-procent-user-icon{
    background-image: url("src/assets/images/ph1.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.factional-nft-4 .nft-procent-user-icon{
    background-image: url("src/assets/images/ph1.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.factional-nft-3 .nft-procent-user-icon{
    background-image: url("src/assets/images/ph2.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.factional-nft-2 .nft-procent-user-icon{
    background-image: url("src/assets/images/ph2.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.factional-nft-1 .nft-procent-user-icon{
    background-image: url("src/assets/images/ph1.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
</style>