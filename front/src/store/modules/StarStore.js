import { aptCodeList, houseNameList, searchByDongName } from "@/api/house.js";
import { searchDealByAptcode } from "@/api/housedeal.js";

/*
아파트 관련 통신 vuex
2022.11.17 장한결
*/

const StarStore = {
  namespaced: true,
  state: {
    // 아파트 정보
    house: null,
    // 아파트 상세정보창 띄울지 여부
    isShow: false,
    // 아파트 리스트
    houselist: [],
    // 아파트 거래내역
    deallist: [],
  },
  mutations: {
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
      state.isShow = true;
    },
    CLEAR_HOUSE(state) {
      state.house = null;
      state.isShow = false;
    },
    CLEAR_HOUSE_LIST(state) {
      state.houselist = [];
      state.house = null;
      state.isShow = false;
    },
    SET_HOUSE_LIST(state, data) {
      state.houselist = data;
    },
    SET_DEAL_LIST(state, data) {
      state.deallist = data;
    },
    CLEAR_DEAL_LIST(state) {
      state.deallist = [];
    },
  },
  actions: {
    /* 아파트 코드로 아파트 정보 가져오기 (비동기 호출)
    input : aptCode (PK)
    output : house object
    22.11.17 장한결
    */
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
    /* 아파트 이름으로 아파트 정보 가져오기 (비동기 호출)
    input : aptName 
    output : houses[]
    22.11.17 장한결
    */
    getHouseListByAptname: ({ commit }, aptName) => {
      houseNameList(
        aptName,
        ({ data }) => {
          //console.log(data);
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    /* 동 이름으로 아파트 정보 가져오기 (비동기 호출)
    input : dongName 
    output : houses[]
    22.11.17 장한결
    */
    getHouseListByDongname: ({ commit }, dongName) => {
      searchByDongName(
        dongName,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    /* 아파트 코드로 아파트 거래정보 가져오기 (비동기 호출)
    input : aptCode 
    output : deallist[]
    22.11.17 장한결
    */
    getDealByAptcode: ({ commit }, aptCode) => {
      searchDealByAptcode(
        aptCode,
        ({ data }) => {
          commit("SET_DEAL_LIST", data);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
export default StarStore;