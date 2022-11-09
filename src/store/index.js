import { createStore } from "vuex";
import marketplace from "@/store/modules/marketplace.js";
import appGlobal from '@/store/modules/appGlobal.js'

const store = createStore({
  modules: {
    marketplace,
    appGlobal
  },
});

export default store;
