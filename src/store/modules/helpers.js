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

                if(res.status === 200 || res.status === 201){
                    const rates = resJson.quotes.map(el => {
                        return {symbol: el.symbol, price: +Number(el.priceUsd).toFixed(2)}
                    })

                    commit('updateUsdRate', {rates})
                }
            } catch (e) {
                console.log('From fetchUsdRate:',  e.message)
            }
        }
    },
    getters:{
        getUsdRate(state) {
            return state.usdRate
        }
    },
};