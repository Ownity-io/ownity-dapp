import { createStore } from "vuex";
import marketplace from "@/store/modules/marketplace.js";
import appGlobal from '@/store/modules/appGlobal.js'
import walletsAndProvider from "./modules/walletsAndProvider";
import marketplaceListing from "./modules/marketplaceListing";
import user from './modules/user'
const store = createStore({
  modules: {
    marketplace,
    appGlobal,
    walletsAndProvider,
    marketplaceListing,
    user
  },
});

export default store;
