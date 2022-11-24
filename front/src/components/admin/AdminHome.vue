<template>
  <!--검색 carousel 시작 -->
  <div id="carouselExampleCaptions" class="carousel" data-bs-ride="carousel">
    <!-- <div class="carousel-inner" style="background-color: rgb(54, 54, 54)">
      <div class="carousel-item active"></div>
    </div> -->
    <!--검색 carousel 끝 -->
    <!--게시판 시작-->
    <div class="display-1 my-5 mb-3">Admin Dashboard</div>
    <div class="justify-content-center col-md-12 mt-5 border" id="useComponent">
      <div class="row row-cols-4 col-md-15 my-4 border justify-content-center">
        <div class="rounded" id="totalUser">
          <admin-total-user />
        </div>
        <div class="rounded" id="totalUser">
          <admin-total-login />
        </div>
        <div class="rounded" id="totalUser">
          <admin-login-time />
        </div>
      </div>

      <div
        class="row row-cols-3 col-md-13 border justify-content-center"
        id="chartComponents"
      >
        <div class="rounded border mx-5" id="graph">
          <admin-rank />
        </div>
        <div class="rounded border mx-5" id="graph">
          <admin-keyword />
        </div>
      </div>
      <!-- <div class="row row-cols-2 col-md-10">차트넣을 공간</div> -->
    </div>
    <!--게시판 끝-->
    <!--그래프 두개 들어갈 칸-->
  </div>
</template>

<script>
import AdminTotalUser from "./sub/AdminTotalUser.vue";
import AdminTotalLogin from "./sub/AdminTotalLogin.vue";
import AdminLoginTime from "./sub/AdminLoginTime.vue";
import AdminKeyword from "@/components/admin/sub/AdminKeyword.vue";
import AdminRank from "@/components/admin/sub/AdminRank.vue";
export default {
  components: {
    AdminTotalUser,
    AdminTotalLogin,
    AdminLoginTime,
    AdminRank,
    AdminKeyword,
  },
  name: "AdminHome",

  data() {
    return {
      thumbNail: require("@/assets/home_apartment.jpg"),
      keyword: "",

      selected: null,
      options: [
        { value: null, text: "검색 조건" },
        { value: "dongName", text: "동 이름" },
        { value: "apartmentName", text: "아파트 이름" },
      ],
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#useComponent {
  /* width: 20%; */
  /* border: #42b983; */
  height: 100%;
}

#graph {
  height: 100%;
}

#chartComponents {
  height: 60%;
}
</style>
