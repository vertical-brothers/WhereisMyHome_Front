import Vue from "vue";
import Vuex from "vuex";

import mainStore from "@/store/modules/mainStore";
import aptDetailStore from "@/store/modules/aptDetailStore";
import userStore from "@/store/modules/userStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { mainStore, aptDetailStore, userStore },
});
