export default {
    state:{
        usdRate: null
    },
    mutations:{
        updateUsdRate(state, data) {
            state.usdRate = data.rates
        }
    },
    actions:{
        async fetchUsdRate({commit}, data){

            try {
                let res = await fetch(`https://api.octogamex.com/rates?symbol=${data.rates}`);
                let resJson = await res.json();
                let rates = {};

                if(res.status === 200 || res.status === 201){
                    for (let i = 0; i < resJson.quotes.length; i++) {
                        const rate = resJson.quotes[i];
                        rates[`${rate.symbol}`] = +Number(rate.priceUsd).toFixed(2);
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
        }
    },
};