<template>
    <div class="tab-contain tab-properties">
        <ul class="tab-blocks-list" v-if="card!=null">
            <li class="tab-block" v-for="attribute in card.metadata.attributes">
                <span>{{attribute.trait_type}}</span>
                <span class="value">{{attribute.value}}</span>
                <!-- <span>1791 (9.22%)</span> -->
            </li>            
        </ul>
    </div>
</template>

<script>
export default{
    props:['item'],
    data(){
        return{
            card:null
        };
    },
    async mounted() {
        this.card = await this.item;
    }
}
</script>