import { searchApartmentReviewByAptcode } from "@/api/apartmentReview.js";

/*
아파트 리뷰 관련 통신 vuex
2022.11.20 장한결
*/

const aptReviewStore = {
  namespaced: true,
  state: {
    // 아파트 정보
    reviews: [],
    // 리뷰정보 디테일 위한 객체
    review: null,
    reviewModalShow: false,
  },
  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
    CLEAR_REVIEWS(state) {
      state.reivews = [];
    },
    SET_REVIEW(state, review) {
      state.review = review;
    },
    CLEAR_REVIEW(state) {
      state.review = null;
    },
    SET_REVIEW_MODAL_SHOW(state) {
      state.reviewModalShow = true;
      console.log(state.reviewModalShow);
    },
    CLEAR_REVIEW_MODAL_SHOW(state, value) {
      state.reviewModalShow = value;
      state.reviewModalShow = false;
    },
  },
  actions: {
    /* 아파트 코드로 아파트 리뷰 정보 가져오기 (비동기 호출)
input : aptCode (PK)
output : review List
22.11.20 장한결
*/
    getReviews: ({ commit }, aptCode) => {
      searchApartmentReviewByAptcode(
        aptCode,
        ({ data }) => {
          commit("SET_REVIEWS", data);
        },
        (error) => {
          console.log(error);
          commit("CLEAR_REVIEWS");
        }
      );
    },
    clearModal: ({ commit }) => {
      commit("CLEAR_REVIEW_MODAL_SHOW");
    },
  },
};
export default aptReviewStore;
