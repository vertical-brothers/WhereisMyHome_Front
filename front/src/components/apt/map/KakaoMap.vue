<template>
  <div>
    <div>
      <button @click="showDetail">테스트</button>
    </div>
    <div id="map" @click="closeOverlay"></div>
  </div>
</template>
<script>
import { KAKAO_MAP_KEY } from "@/config";
import { mapActions, mapMutations, mapState } from "vuex";
const aptDetailStore = "aptDetailStore";
const mainStore = "mainStore";
// import { dongCodeList, houseNameList, aptCodeList } from "@/api/house";
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      aptList: [],
      markers: [],
      aptCode: null,
      dongCode: null,
      houseName: null,
    };
  },
  mounted() {
    // const script = document.createElement(script);
    //console.log(this.searchKeyword);
    this.loadMap();
    this.loadMarkers();
  },

  created() {
    this.aptList = this.$route.params.data;
  },
  methods: {
    ...mapActions(aptDetailStore, ["detailHouse", "getHouseListByAptname"]),
    ...mapMutations(aptDetailStore, ["CLEAR_HOUSE"]),
    ...mapMutations(mainStore, ["CLEAR_SEARCH"]),
    // 지도 객체 등록 22.11.17 이인재
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    // 카카오맵 div 클릭시 우측 오버레이 모두 끄는 함수
    // 22.11.18 장한결
    closeOverlay() {
      this.CLEAR_HOUSE();
    },
    // 카카오맵 마커 클릭시 우측 오버레이 시현 함수
    // input : aptCode (PK)
    // 22.11.18 장한결
    showDetail(aptCode) {
      this.detailHouse(aptCode);
    },
    // map객체에 마커 띄우는 함수
    // input : map object (null입력시 마커 삭제됨.)
    // 22.11.18 장한결
    setMarkers(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    // map 객체 생성하는 함수
    // 22.11.17 이인재
    loadMap() {
      console.log("loadmap");
      if (window.kakao) {
        console.log("Map object already loaded...", window.kakao);
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_KEY}`;
        script.addEventListener("load", () => {
          console.log("Initializing Map...");
          kakao.maps.load(this.initMap);
        });
        document.head.appendChild(script);
      }
    },
    // this.marker 생성하는 함수
    // 검색조건 있을때만 동작
    // 22.11.17 장한결
    loadMarkers() {
      this.setMarkers(null);
      console.log("검색 옵션", this.searchOption);
      console.log("검색 키워드", this.searchKeyword);
      if (this.searchOption) {
        // 검색 조건 아파트명
        if (this.searchOption === "apartmentName") {
          this.getHouseListByAptname(this.searchKeyword);
          for (var i = 0; i < this.houselist.length; i++) {
            let h = this.houselist[i];
            // 클릭가능한 마커 생성
            this.markers.push(
              new kakao.maps.Marker({
                position: new kakao.maps.LatLng(h.lat, h.lng),
                clickable: true,
              })
            );
            // 클릭시 화면 우측 오버레이 생성 이벤트 부착
            kakao.maps.event.addListener(this.markers[i], "click", () => {
              this.showDetail(h.aptCode);
            });
          }
          console.log("markers created", this.markers);
          this.setMarkers(this.map);
          this.CLEAR_SEARCH();
        }
      }
    },
  },
  computed: {
    ...mapState(mainStore, ["searchKeyword", "searchOption"]),
    ...mapState(aptDetailStore, ["houselist"]),
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
