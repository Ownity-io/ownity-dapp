import {backendApiEntryPoint} from '@/config.json'

export default {
    state:{
        usdRate: null,
        activeCollectionLink: false
    },
    mutations:{
        updateUsdRate(state, data) {
            state.usdRate = data.rates
        },
        updateActiveCollectionLink(state, data){
            state.activeCollectionLink = data
        }
    },
    actions:{
        async fetchUsdRate({commit}, data){

            try {
                let link = `${backendApiEntryPoint}rates/?symbol=${data.rates.join('&symbol=')}`

                let res = await fetch(link);
                let resJson = await res.json();
                let rates = {};
                if(res.status === 200 || res.status === 201){
                    for (let i = 0; i < resJson.length; i++) {
                        const rate = resJson[i];
                        rates[`${rate.rates_json.symbol}`] = +Number(rate.rates_json.priceUsd).toFixed(2);
                    }

                    commit('updateUsdRate', {rates});
                }
            } catch (e) {
                console.log('From fetchUsdRate:',  e.message);
            }
        }
    },
    getters:{
        getUsdRate(state) {
            return state.usdRate
        },
        getActiveCollectionLink(state){
            return state.activeCollectionLink
        }
    },
};