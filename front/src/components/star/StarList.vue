<template>
  <div>
    <div class="col-sm-12 d-flex justify-content-center mt-4">
      <div class="row row-cols-3 col-md-10 h-50 w-100" style="height: 400%">
        <!-- <div class="row row-cols-3 h-8 border" style="width: 100%"> -->
        <div
          class="rounded border w-20 h-10"
          id="starlist"
          style="height: 800px; overflow: scroll"
        >
          <!-- <h4 class>관심지역 목록</h4> -->
          <table class="table rounded">
            <star-item
              v-for="(star, index) in stars"
              :key="index"
              :star="star"
              :index="index"
            >
            </star-item>
          </table>
        </div>

        <div class="col-lg-8 rounded border">
          <!-- <star-kakao-map> <star-overlay /></star-kakao-map> -->
          <star-kakao-map />
          <star-overlay />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarItem from "@/components/star/StarItem.vue";
import { listStar } from "@/api/star.js";
import StarKakaoMap from "@/components/star/map/StarKakaoMap.vue";
import StarStore from "@/store/modules/StarStore.js";

import { mapActions, mapState } from "vuex";
import StarOverlay from "@/components/star/StarOverlay.vue";

const memberStore = "memberStore";

export default {
  name: "StarList",
  components: { StarItem, StarKakaoMap, StarOverlay },

  data() {
    return {
      stars: [],
      // acesstoken: sessionStorage.getItem("access-token"),
    };
  },
  created() {
    console.log("test");
    listStar(
      sessionStorage.getItem("access-token"),
      ({ data }) => {
        console.log("관심지역 가져오기 성공");
        this.stars = data;
        console.log(JSON.stringify(this.stars));
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },

  methods: {
    ...mapActions(StarStore, [
      "detailHouse",
      "getHouseListByAptname",
      "getHouseListByDongname",
      "getDealByAptcode",
    ]),
  },
};
</script>

<style scoped>
#starList {
  overflow: scroll;
}
</style>
