import { aptCodeList } from "@/api/house.js";

const aptDetailStore = {
  namespaced: true,
  state: {
    house: null,
    isShow: false,
  },
  mutations: {
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
      state.isShow = true;
    },
    SET_CLEAR_HOUSE(state) {
      state.house = null;
      state.isShow = false;
    },
  },
  actions: {
    detailHouse: ({ commit }, aptCode) => {
      aptCodeList(
        aptCode,
        ({ data }) => {
          commit("SET_DETAIL_HOUSE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
export default aptDetailStore;
