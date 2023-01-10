<template>
  <div class="faq prev">
    <div class="faq-block" :class="{ 'collapse-block': !faqBlock1 }">
      <button class="btn-faq" @click="faqBlock1 = !faqBlock1">
        What Is Ownity?
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p>
          Ownity is a groundbreaking co-ownership & aggregator platform for all things NFT.
          First, Ownity enables would-be owners to break – fractionalize – NFTs, which otherwise can be too pricey, into a number of smaller parts – fractions – they can invest in as a group, split possible NFT-generated rewards, and manage the whole NFT as a DAO.
          Second, Ownity aggregates NFT sale listings from the major NFT marketplaces from one place without ever having to jump back and forth, searching for the right one.
        </p>
      </div>
    </div>

    <div class="faq-block" :class="{ 'collapse-block': !faqBlock2 }">
      <button class="btn-faq" @click="faqBlock2 = !faqBlock2">
        What Is NFT Co-Ownership?
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p>
          Also known as fractional or shared NFT ownership, it is a new and lower-barrier way to invest in NFTs that involves splitting up non-fungible tokens – collectibles, artworks, PFPs, photos & videos, gamified ones, membership passes, memorabilia, domain names, etc. – into smaller pieces to own and take advantage from their utility together.
        </p>
      </div>
    </div>

    <div class="faq-block" :class="{ 'collapse-block': !faqBlock3 }">
      <button class="btn-faq" @click="faqBlock3 = !faqBlock3">
        What Are Fractionalized NFTs?
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p>
          Also referred to as fNFTs, they are whole NFTs divvied up into smaller pieces for ownership by several people. Fractionalized NFTs are designed to appeal to those wanting to participate in the booming NFT market without breaking the bank, or simply own non-fungible tokens with friends, family, or for business purposes.
        </p>
      </div>
    </div>

    <div class="faq-block" :class="{ 'collapse-block': !faqBlock4 }">
      <button class="btn-faq" @click="faqBlock4 = !faqBlock4">
        Can I Fractionalize Any NFT with Ownity?
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p>
          Ownity empowers its users to fractionalize any NFT listed for sale on OpenSea, LooksRare, X2Y2, and other marketplaces into chunks as small as 1% whatever the price. You can also buy the whole (100%) NFT with Ownity.
        </p>
      </div>
    </div>

    <div class="faq-block" :class="{ 'collapse-block': !faqBlock5 }">
      <button class="btn-faq" @click="faqBlock5 = !faqBlock5">
        Can I Sell My NFT Fractions?
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p>
          On Ownity, any fraction is sold as quickly as it is bought. You are free to handle NFT fractions you own with just a couple of clicks anytime.
        </p>
      </div>
    </div>

    <div class="faq-block" :class="{ 'collapse-block': !faqBlock6 }">
      <button class="btn-faq" @click="faqBlock6 = !faqBlock6">
        What if I Sold Fraction of My Fraction?
        <i class="i-arrow-up-s-line"></i>
      </button>
      <div class="content-faq">
        <p>
          Selling a portion of your fraction, say 15% of the 20% stake you hold in an fNFT, you retain your voting and reward-splitting rights coming with the 5% that remain in your possession.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import MultiLang from "@/core/multilang";

export default {
	name: "FaqBlock",
	data() {
		return {
			faqBlock1: false,
			faqBlock2: false,
			faqBlock3: false,
			faqBlock4: false,
			faqBlock5: false,
			faqBlock6: false,
			lang: new MultiLang(this),
		};
	},
	methods:{
		translatesGet(key) {
			return this.lang.get(key);
		},
	}
};
</script>