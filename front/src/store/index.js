import Vue from "vue";
import Vuex from "vuex";

import mainStore from "@/store/modules/mainStore";
import aptDetailStore from "@/store/modules/aptDetailStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { mainStore, aptDetailStore },
});
