<template>
    <div class="tab-contain tab-info">
        <div class="data-table">

            <div class="data-tr">
                <div class="data-td data-td-name">
                    <span>Contract Address</span>
                </div>
                <div class="data-td data-td-value">
                    <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>{{String(item.collection.contract_address).substring(0,6)+'...'+String(item.collection.contract_address).substring(38,42)}}</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
            </div>
            
            <div class="data-tr">
                <div class="data-td data-td-name">
                    <span>Token ID</span>
                </div>
                <div class="data-td data-td-value">
                    <a class="td-wrap td-wrap-link" href="" target="_blank" rel="nofollow">
                        <span>{{item.token_id}}</span>
                        <i class="i-external-link-line"></i>
                    </a> 
                </div>
            </div>
                        
            <div class="data-tr">
                <div class="data-td data-td-name">
                    <span>Blockchain</span>
                </div>
                <div class="data-td data-td-value">
                    <span>{{item.collection.blockchain}}</span>
                </div>
            </div>
                        
            <div class="data-tr">
                <div class="data-td data-td-name">
                    <span>Token standard</span>
                </div>
                <div class="data-td data-td-value">
                    <span>ERC-{{item.collection.erc_type}}</span>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default{
    props:['item']
}
</script>