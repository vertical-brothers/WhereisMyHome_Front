<template>
  <div id="_overlay" class="col-12 d-flex justify-content-end" @click="close">
    <div id="_overlayrightend" class="col-md-3 d-flex flex-column me-5 mt-3">
      <!-- 우측 오버레이 검색바 시작 -->
      <div id="_searchdiv" class="row mb-3 col-md-12">
        <!-- <b-form-select
          class="form-select form-select-sm ms-10 me-1 w-5"
          v-model="selected"
          :options="options"
        ></b-form-select>
        <b-form-input
          @keyup.enter="search"
          type="text"
          v-model="keyword"
          class="form-control form-control-lg"
          placeholder="원하시는 건물명 또는 동을 입력해주세요"
        />
        <button @click="search" class="btn btn-primary" type="button">
          <b-icon icon="search" variant="info"></b-icon>
        </button> -->
        <form class="d-flex col-md-12">
          <select
            class="form-select me-2"
            aria-label="Default select example"
            v-model="searchOption"
          >
            <option disabled selected>검색조건</option>
            <option value="dongName">동별</option>
            <option value="apartmentName">아파트별</option>
          </select>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchKeyword"
          />
          <button
            class="btn btn-primary col-md-2 justify-content-center"
            @click="search"
          >
            <b-icon icon="search" variant="info"></b-icon>
          </button>
        </form>
      </div>
      <!-- 우측 오버레이 검색바 끝 -->
      <!-- 우측 오버레이 아파트정보칸 시작 -->
      <div v-if="house" id="_aptdetaildiv" class="table-responsive">
        <div class="card mb-4 rounded-3 shadow-sm border-primary">
          <div class="card-header py-3 text-white bg-primary border-primary">
            <table class="table mt-1 mb-1 text-white">
              <tr class="align-middle">
                <td class="col-1">
                  <!--아파트 정보보기 끄기 버튼-->
                  <button @click="close" class="btn btn-primary" type="button">
                    <b-icon icon="x"></b-icon>
                  </button>
                </td>
                <td class="col-8 fw-bold fs-5 text-start">
                  {{ house.apartmentName }}
                </td>
                <td class="col-2">
                  <!--아파트 관심추가 버튼-->
                  <button
                    @click="likeApt"
                    class="btn btn-primary"
                    type="button"
                  >
                    <b-icon icon="star"></b-icon>
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <!-- 아파트 정보 카드 시작 -->
          <div class="card-body">
            <table class="table mb-4 mt-2">
              <tr>
                <td class="col-4 fw-bold fs-6">주소</td>
                <td class="col-8 fs-6">
                  {{ house.roadName }} {{ house.roadNameBonbun }}
                </td>
              </tr>
              <tr>
                <td class="col-4 fw-bold fs-6">건축년도</td>
                <td class="col-8 fs-6">{{ house.buildYear }}년</td>
              </tr>
            </table>
            <h3 class="fw-bold">리뷰</h3>
            <table class="table mb-4">
              <tr class="col-4 fs-6">
                좋은 집이에요
              </tr>
              <tr class="col-4 fs-6">
                좋은 집이에요
              </tr>
              <tr class="col-4 fs-6">
                좋은 집이에요
              </tr>
              <tr class="col-4 fs-6">
                좋은 집이에요
              </tr>
            </table>
            <h3 class="fw-bold">실거래가</h3>
            <table class="table mb-2">
              <thead>
                <th>거래년</th>
                <th>가격</th>
                <th>면적</th>
                <th>층</th>
              </thead>
              <tbody>
                <tr>
                  <td class="col-md-2">2019</td>
                  <td class="col-md-6">36000</td>
                  <td class="col-md-2">87.1</td>
                  <td class="col-md-2">3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 아파트 정보 카드 끝 -->
        </div>
        <!-- 우측 오버레이 아파트정보칸 끝 -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

const aptDetailStore = "aptDetailStore";
const mainStore = "mainStore";

export default {
  name: "AptOverlay",
  data() {
    return {
      markerLocal: [],
      searchOption: "",
      searchKeyword: "",
    }; /* global kakao */
  },
  methods: {
    ...mapMutations(aptDetailStore, ["CLEAR_HOUSE", "CLEAR_HOUSE_LIST"]),
    ...mapMutations(mainStore, ["CLEAR_SEARCH, SET_SEARCH", "SET_MARKERS"]),
    ...mapActions(aptDetailStore, [
      "detailHouse",
      "getHouseListByAptname",
      "getHouseListByDongname",
    ]),
    likeApt() {},
    close() {
      this.CLEAR_HOUSE();
    },
    search(e) {
      e.preventDefault();
      this.loadMarkers();
      if (this.searchOption == "" || this.searchOption == null) {
        alert("검색 조건을 선택해주세요.");
      } else if (this.searchKeyword == "") {
        alert("검색 키워드를 입력해주세요.");
      }

      if (this.houselist.length > 0) {
        this.mapCenterMove(
          this.houselist[0].lat,
          this.houselist[0].lng,
          this.zoomLevel
        );
      }
    },
    // 검색조건 받아서 마커생성 함수 호출
    // 검색조건 있을때만 동작
    // 22.11.17 장한결
    loadMarkers() {
      // 1. 마커 전부 제거
      this.setMarkers(null);
      this.CLEAR_MARKER;
      this.CLEAR_HOUSE_LIST;
      console.log(
        "검색 옵션",
        this.searchOption,
        "검색 키워드",
        this.searchKeyword
      );
      if (this.searchOption) {
        // 검색 조건 아파트명
        if (this.searchOption === "apartmentName") {
          // 비동기호출
          this.getHouseListByAptname(this.searchKeyword);
          // 마커생성
          this.createMarkers();
          // 마커 부착
          this.setMarkers(this.map);
          this.CLEAR_SEARCH;
          // 검색 조건 동이름
        } else if (this.searchOption === "dongName") {
          this.getHouseListByDongname(this.searchKeyword);
          this.createMarkers();
          this.setMarkers(this.map);
          this.CLEAR_SEARCH;
        }
      }
    },
    // this.marker 생성하는 함수
    // 22.11.18 장한결
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
          this.mapCenterMove(h.lat, h.lng, 3);
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
    // 카카오맵 중심 이동 후 확대수준 결정
    // input : 위도, 경도, 확대 수준 (0~14)
    // 22.11.18 장한결
    mapCenterMove(lat, lng, level) {
      this.map.setCenter(new kakao.maps.LatLng(lat, lng));
      this.map.setLevel(level, { anchor: new kakao.maps.LatLng(lat, lng) });
    },
    // map객체에 마커 띄우는 함수
    // input : map object (null입력시 마커 삭제됨.)
    // 22.11.18 장한결
    setMarkers(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    // 카카오맵 마커 클릭시 우측 오버레이 시현 함수
    // input : aptCode (PK)
    // 22.11.18 장한결
    showDetail(aptCode) {
      this.detailHouse(aptCode);
    },
  },
  computed: {
    ...mapState(aptDetailStore, ["house", "isShow", "houselist"]),
    ...mapState(mainStore, ["map", "markers"]),
  },
  filters: {},
};
</script>
<style>
#_overlay {
  position: absolute;
  z-index: 1;
}
</style>
