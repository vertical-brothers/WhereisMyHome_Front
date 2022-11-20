import Vue from "vue";
import Vuex from "vuex";

import mainStore from "@/store/modules/mainStore";
import aptDetailStore from "@/store/modules/aptDetailStore";
import memberStore from "@/store/modules/memberStore";
import aptReviewStore from "@/store/modules/aptReviewStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { mainStore, aptDetailStore, memberStore, aptReviewStore },
});
