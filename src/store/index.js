import { createStore } from "vuex";
import marketplace from "@/store/modules/marketplace.js";
import appGlobal from '@/store/modules/appGlobal.js'
import walletsAndProvider from "./modules/walletsAndProvider";
import marketplaceListing from "./modules/marketplaceListing";
import site from "./modules/site";
import user from './modules/user'
import helpers from './modules/helpers'

const store = createStore({
  modules: {
    marketplace,
    appGlobal,
    walletsAndProvider,
    marketplaceListing,
    user,
    site,
    helpers
  },
});

export default store;
