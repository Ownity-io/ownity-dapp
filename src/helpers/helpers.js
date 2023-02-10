import {ethers} from "ethers";
import {isNumber} from "@vueuse/core";

export default {
    abbrNum(number, decPlaces, fixAmount) {
        if(fixAmount) number = +Number(number).toFixed(fixAmount);

        decPlaces = Math.pow(10, decPlaces);
        var abbrev = ["k", "M", "b", "t"];
        for (var i = abbrev.length - 1; i >= 0; i--) {
            var size = Math.pow(10, (i + 1) * 3);
            if (size <= number) {
                number = Math.round(number * decPlaces / size) / decPlaces;
                if ((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];
                break;
            }
        }

        //? if fixAmount  === (false || undefined) - it means function call for 'ETH' not for '$'
        if(isNumber(number) && number !== 0 && number < 0.0001 && !fixAmount){
            return `≈ 0.0001`
        }

        return number;
    },

    toFixedIfNecessary(value, dp) {
        return +parseFloat(value).toFixed(dp);
    },

    convertToEther(value){
        try{
            return ethers.utils.formatEther(String(parseInt(value)));
        } catch (e) {
            //console.log('error from convertToEther:' + e.message);
        }

    },
}
