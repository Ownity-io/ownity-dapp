import { createStore } from "vuex";
import marketplace from "@/store/modules/marketplace.js";
import appGlobal from '@/store/modules/appGlobal.js'
import walletsAndProvider from "./modules/walletsAndProvider";
import marketplaceListing from "./modules/marketplaceListing";
const store = createStore({
  modules: {
    marketplace,
    appGlobal,
    walletsAndProvider,
    marketplaceListing
  },
});

export default store;
