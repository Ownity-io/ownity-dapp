<template>
    <ul class="breadcrumbs" v-if="this.$route.name == 'Marketplace'">
        <li><a href="/"><i class="i-arrow-right-s-line"></i><span>Home</span></a></li>
        <li><a href="/marketplace"><i class="i-arrow-right-s-line"></i><span>Marketplace</span></a></li>
    </ul>
    <ul class="breadcrumbs" v-else-if="this.$route.name == 'Listing'">
        <li><a href="/"><i class="i-arrow-right-s-line"></i><span>Home</span></a></li>
        <li><a href="/marketplace"><i class="i-arrow-right-s-line"></i><span>Marketplace</span></a></li>
        <li><a :href="collectionLink" v-if="item"><i class="i-arrow-right-s-line"></i><span>{{this.item.collection.name}}</span></a></li>
        <li><a href="" v-if="item"><i class="i-arrow-right-s-line"></i><span>{{this.item.name}}</span></a></li>
    </ul>
    <ul class="breadcrumbs" v-else-if="this.$route.name == 'Collection'">
        <li><a href="/"><i class="i-arrow-right-s-line"></i><span>Home</span></a></li>
        <li><a href="/marketplace"><i class="i-arrow-right-s-line"></i><span>Marketplace</span></a></li>
        <li><a href="" v-if="collection"><i class="i-arrow-right-s-line"></i><span>{{this.collection.name}}</span></a></li>    
    </ul>
    <ul class="breadcrumbs" v-else>
        <li><a href="/"><i class="i-arrow-right-s-line"></i><span>Home</span></a></li>
        <li><a href=""><i class="i-arrow-right-s-line"></i><span>{{this.$route.name}}</span></a></li> 
    </ul>
</template>

<script>
import config from '@/config';
export default{
    data(){
        return{
            item:null,
            collectionLink:null,
            collection:null
        }
    },
    async mounted(){
      this.item = await this.$store.getters['marketplaceListing/getItem'];  
      if (this.item){
        this.collectionLink = `/collection/${this.item.collection.contract_address}`;
      }
      let requestUrl = `${config.backendApiEntryPoint}nft-collections/?contract_address=${this.$route.params.contract_address}`;
      let request = await fetch(requestUrl);
      let requestJson = await request.json();
      this.collection = requestJson[0];
    }
}
</script>