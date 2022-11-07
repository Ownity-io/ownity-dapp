import { createStore } from "vuex";
import api from "@/store/modules/api.js";

const store = createStore({
  modules: {
    api,
  },
});

export default store;
