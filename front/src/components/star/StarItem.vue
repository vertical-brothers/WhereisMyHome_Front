<template>
  <b-card
    :title="star.dong"
    img-src="https://cdn.pixabay.com/photo/2016/11/13/12/52/kuala-lumpur-1820944_960_720.jpg"
    img-height="150"
    img-alt="Image"
    img-top
    width="200"
    tag="article"
    class="mb-2"
    style="text-align: left"
    @click="search(star.lat, star.lng, star.aptCode, $event)"
  >
    <div class="row">
      <div class="col-10">
        <b-card-text
          >{{ star.roadName }} {{ star.dong }}
          {{ star.apartmentName }}</b-card-text
        >
      </div>
      <div class="col-2">
        <b-button variant="outline-danger" @click="deleteStar(star.starNo)"
          >삭제</b-button
        >
      </div>
    </div>
  </b-card>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "@/config/index";
import { mapState, mapMutations, mapActions } from "vuex";
import mainStore from "@/store/modules/mainStore";

const StarStore = "StarStore";
const StarSubStore = "StarSubStore";
const aptDetailStore = "aptDetailStore";
const aptReviewStore = "aptReviewStore";
export default {
  name: "StarItem",
  props: {
    star: {},

    index: Number,
  },
  data() {
    return {
      markerLocal: {},
      coord: [],
      review: null,

      reviewModalShow: false,
      writeModalShow: false,
      isWriteError: false,
    }; /* global kakao */
  },
  methods: {
    ...mapMutations(StarStore, [
      "CLEAR_HOUSE",
      "CLEAR_HOUSE_LIST",
      "CLEAR_DEAL_LIST",
    ]),
    ...mapActions(aptDetailStore, [
      "detailHouse",
      "getHouseListByAptname",
      "getHouseListByDongname",
      "getDealByAptcode",
    ]),
    ...mapMutations(aptReviewStore, [
      "CLEAR_REVIEWS",
      "SET_REVIEW",
      "CLEAR_REVIEW",
      "SET_REVIEW_MODAL_SHOW",
      "CLEAR_REVIEW_MODAL_SHOW",
      "SET_WRITE_MODAL_SHOW",
    ]),
    ...mapActions(aptReviewStore, ["getReviews"]),
    ...mapMutations(mainStore, ["SET_MARKERS"]),

    /* 
    관심 지역 삭제 method
    2022-11-22  이인재
    */
    async deleteStar(starno) {
      let token = sessionStorage.getItem("access-token");
      console.log(this.star.starno + " " + starno);
      await axios
        .create({
          baseURL: API_BASE_URL,
          headers: {
            "Content-type": "application/json",
            "access-token": token,
          },
        })
        .delete(`/star/${starno}`)
        .then(({ data }) => {
          console.log(data.message);
          this.$router.go(this.$router.current);
          // this.$router.push(`/star/list`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    close() {
      this.CLEAR_HOUSE();
    },

    /*
    마커 조회 method
    2022-11-22 이인재
    */
    search(lat, lng, aptCode, e) {
      e.preventDefault;
      // this.loadMarkers();
      this.markerLocal = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(lat, lng),
        clickable: true,
      });
      this.mapCenterMove(lat, lng, this.zoomLevel);
      this.showDetail(aptCode);
      kakao.maps.event.addListener(this.markerLocal, "click", () => {
        this.showDetail(aptCode);
        this.mapCenterMove(lat, lng, 3);
      });
    },
    loadMarkers() {
      this.setMarkers(null);
      this.CLEAR_MARKER;
      this.CLEAR_HOUSE_LIST;
      // this.getHouseListByAptname(apt);
      // 마커생성
      this.createMarkers();
      // 마커 부착
      this.setMarkers(this.map);
    },
    createMarkers() {
      console.log(this.houselist);
      this.markerLocal = [];
      for (var i = 0; i < this.houselist.length; i++) {
        let h = this.houselist[i];
        // 클릭가능한 마커 생성
        this.markerLocal.push(
          new kakao.maps.Marker({
            position: new kakao.maps.LatLng(h.lat, h.lng),
            clickable: true,
          })
        );
        // 클릭시 화면 우측 오버레이 생성 이벤트 부착
        // 그 후 지도 중심 이동
        kakao.maps.event.addListener(this.markerLocal[i], "click", () => {
          this.showDetail(h.aptCode);
          this.mapCenterMove(h.lat, h.lng, 5);
        });
      }
      console.log(
        "markers created with ",
        this.searchOption,
        this.searchKeyword,
        this.markers
      );
      this.SET_MARKERS(this.markerLocal);
    },
    mapCenterMove(lat, lng, level) {
      this.map.setCenter(new kakao.maps.LatLng(lat, lng));
      this.map.setLevel(level, { anchor: new kakao.maps.LatLng(lat, lng) });
    },
    setMarkers(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },

    // 카카오맵 마커 클릭시 우측 오버레이 시현 함수
    // input : aptCode (PK)
    // 22.11.18 장한결
    showDetail(aptCode) {
      // 아파트 상세정보 불러오기
      this.detailHouse(aptCode);
      console.log("상세 정보 불러옴 : ", this.houselist);
      // 거래내역 불러오기
      this.getDealByAptcode(aptCode);
      console.log("거래내역 정보 불러옴 : ", this.deallist);

      // 리뷰 불러오기
      this.getReviews(aptCode);
      console.log("리뷰 정보 불러옴");
    },
    reviewDetail(review) {
      this.SET_REVIEW(review);
      this.SET_REVIEW_MODAL_SHOW();
    },
    writeReview() {
      this.SET_WRITE_MODAL_SHOW();
    },
  },
  created() {},
  computed: {
    ...mapState(StarStore, ["house", "ishow", "houselist", "deallist"]),
    ...mapState(StarSubStore, ["map", "markers"]),
    ...mapState(aptReviewStore, ["reviews", "reviewForceUpdate"]),
  },
  filters: {
    roadNumberFilter(value) {
      return parseInt(value);
    },
    dateFilter(value) {
      let year = value.substring(2, 4);
      let month = value.substring(5, 7);
      let day = value.substring(8, 10);
      return `${year}.${month}.${day}`;
    },
  },
};
</script>
<style scoped></style>
