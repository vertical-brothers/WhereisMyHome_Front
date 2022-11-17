/* 
부동산 정보 검색관련 vuex
22.11.17 장한결
*/

const mainStore = {
  namespaced: true,
  state: {
    searchKeyword: "",
    searchOption: "",
    aptList: [],
  },
  mutations: {
    SET_SEARCH(state, searchOption) {
      state.searchOption = searchOption[0];
      state.searchKeyword = searchOption[1];
    },
  },
};
export default mainStore;
