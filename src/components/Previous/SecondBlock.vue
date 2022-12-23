<template>
  <div class="fractional">
<!--    <div class="fractional-left">-->
<!--      <p class="fractional-title">Fractional Ownership</p>-->
<!--      <p class="fractional-subtitle">-->
<!--        The mechanics of fractional ownership enable users to purchase an NFT in a group.-->
<!--        Each user can contribute the required part and start or maintain the fundraising for the listing purchase.-->
<!--      </p>-->
<!--      <p class="fractional-options-title" >-->
<!--        Flexible interaction options-->
<!--      </p>-->
<!--      <div class="fractional-options">-->
<!--        <div class="fractional-inner">-->
<!--          <div><div class="design"></div><p>Buy 1% to 100% of NFT</p></div>-->
<!--          <div ref="fractional"><div class="design"></div><p>Make decisions in DAO mode</p></div>-->
<!--        </div>-->
<!--        <div class="fractional-inner">-->
<!--          <div><div class="design"></div><p>Sell your part at any time</p></div>-->
<!--          <div><div class="design"></div><p>Explore profitable listings</p></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="fractional-right">-->
<!--      <div class="factional-nft square-transition" ref="square">-->
<!--        <div class="factional-nft-1">-->
<!--          <span class="nft-procent">-->
<!--            <p class="nft-procent-title">10% (≈$7.000)</p>-->
<!--            <span class="nft-procent-user">-->
<!--              <span class="nft-procent-user-icon"></span>-->
<!--              <p class="nft-procent-user-name">Aaron Stuffs</p>-->
<!--            </span>-->
<!--          </span>-->
<!--        </div>-->
<!--        <div class="factional-nft-2">-->
<!--          <span class="nft-procent">-->
<!--            <p class="nft-procent-title">10% (≈$7.000)</p>-->
<!--            <span class="nft-procent-user">-->
<!--              <span class="nft-procent-user-icon"></span>-->
<!--              <p class="nft-procent-user-name">Star Muffin</p>-->
<!--            </span>-->
<!--          </span>-->

<!--        </div>-->
<!--        <div class="factional-nft-3">-->
<!--          <span class="nft-procent">-->
<!--            <p class="nft-procent-title">10% (≈$7.000)</p>-->
<!--            <span class="nft-procent-user">-->
<!--              <span class="nft-procent-user-icon"></span>-->
<!--              <p class="nft-procent-user-name">Star Muffin</p>-->
<!--            </span>-->
<!--          </span>-->

<!--        </div>-->
<!--        <div class="factional-nft-4">-->
<!--          <span class="nft-procent">-->
<!--            <p class="nft-procent-title">15% (≈$13.500)</p>-->
<!--            <span class="nft-procent-user">-->
<!--              <span class="nft-procent-user-icon"></span>-->
<!--              <p class="nft-procent-user-name">Sammy</p>-->
<!--            </span>-->
<!--          </span>-->

<!--        </div>-->
<!--        <div class="factional-nft-5">-->
<!--          <span class="nft-procent">-->
<!--            <p class="nft-procent-title">10% (≈$7.000)</p>-->
<!--            <span class="nft-procent-user">-->
<!--              <span class="nft-procent-user-icon"></span>-->
<!--              <p class="nft-procent-user-name">Aaron Stuffs</p>-->
<!--            </span>-->
<!--          </span>-->

<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
	name: "SecondBlock",
  mounted() {
	  const square = this.$refs.square;
	  square.classList.remove('square-transition');

	  console.log(square)

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

</style>