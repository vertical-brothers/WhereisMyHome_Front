/* 
부동산 정보 검색관련 vuex
22.11.17 장한결
*/

const StarSubStore = {
  namespaced: true,
  state: {
    searchKeyword: "",
    searchOption: "",
    aptList: [],
    map: null,
    markers: [],
  },
  mutations: {
    SET_MAP(state, map) {
      state.map = map;
    },
    CLEAR_MAP(state) {
      state.map = null;
    },
    SET_MARKERS(state, markers) {
      state.markers = markers;
    },
    CLEAR_MARKERS(state) {
      state.markers = [];
    },
  },
};
export default StarSubStore;
