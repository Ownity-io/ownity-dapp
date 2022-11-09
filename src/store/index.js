import { createStore } from "vuex";
import marketplace from "@/store/modules/marketplace.js";
import appGlobal from '@/store/modules/appGlobal.js'
import walletsAndProvider from "./modules/walletsAndProvider";
const store = createStore({
  modules: {
    marketplace,
    appGlobal,
    walletsAndProvider
  },
});

export default store;
