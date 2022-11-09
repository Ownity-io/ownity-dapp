import { createStore } from "vuex";
import api from "@/store/modules/api.js";
import appGlobal from '@/store/modules/appGlobal.js'

const store = createStore({
  modules: {
    api,
    appGlobal
  },
});

export default store;
