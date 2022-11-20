<template>
  <div>
    <div class="col-md-12 d-flex justify-content-center mt-4">
      <div class="row row-cols-3 col-md-10 h-100 border">
        <div class="rounded border col-lg-4 overflow-auto">
          <h4 class>관심지역 목록</h4>
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
          <h4>게시판 2</h4>
          <table class="table rounded">
            <tr>
              title
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarItem from "@/components/star/StarItem.vue";
import { listStar } from "@/api/star.js";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "StarList",
  components: { StarItem },
  comments: {
    StarItem,
  },
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
