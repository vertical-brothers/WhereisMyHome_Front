<template>
  <div>
    <div class="col-sm-12 d-flex justify-content-center mt-4">
      <div
        class="row row-cols-3 col-md-10 h-50 w-100 border"
        style="height: 500%"
      >
        <!-- <div class="row row-cols-3 h-8 border" style="width: 100%"> -->
        <div
          class="rounded border w-20"
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
          <kakao-map />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarItem from "@/components/star/StarItem.vue";
import { listStar } from "@/api/star.js";
import { mapState } from "vuex";
import KakaoMap from "../star/map/KakaoMap.vue";

const memberStore = "memberStore";

export default {
  name: "StarList",
  components: { StarItem, KakaoMap },

  data() {
    return {
      stars: [],
      //   acesstoken: sessionStorage.getItem("access-token"),
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
};
</script>

<style scoped>
#starList {
  overflow: scroll;
}
</style>
