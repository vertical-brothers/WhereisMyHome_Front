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

      aptCode: null,
      dongCode: null,
      houseName: null,
    };
  },
  mounted() {
    // const script = document.createElement(script);
    if (window.kakao && window.kakao.maps) {
      console.log("already loaded", window.kakao);
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_KEY}`;
      script.addEventListener("load", () => {
        console.log("init map");
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    }
    console.log(this.searchKeyword);
    if (this.searchOption) {
      if (this.searchOption === "apartmentName") {
        this.getHouseListByAptname(this.searchKeyword);
        console.log(this.houselist);
      }
    }
  },

  created() {
    this.aptList = this.$route.params.data;
  },
  methods: {
    ...mapActions(aptDetailStore, ["detailHouse", "getHouseListByAptname"]),
    ...mapMutations(aptDetailStore, ["CLEAR_HOUSE"]),
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    closeOverlay() {
      this.CLEAR_HOUSE();
    },
    showDetail() {
      this.detailHouse("11110000000002");
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
