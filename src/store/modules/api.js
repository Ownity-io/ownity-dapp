import { createStore } from "vuex";

export default {
    namespaced:true,
    state() {
      return {
          testValue:'OK'
      };
    },
    getters:{
      getTestValue(state){
          return state.testValue;
      }
    }
  }
