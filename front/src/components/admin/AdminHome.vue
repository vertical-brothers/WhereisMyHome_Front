<template>
  <!--검색 carousel 시작 -->
  <div id="carouselExampleCaptions" class="carousel" data-bs-ride="carousel">
    <div class="carousel-inner" style="background-color: rgb(54, 54, 54)">
      <div class="carousel-item active"></div>
    </div>
    <!--검색 carousel 끝 -->
    <!--게시판 시작-->
    <div class="col-md-12 justify-content-center mt-4">
      <div class="row row-cols-5 col-md-10">
        <div class="rounded" id="totalUser">
          <h4 class>게시판 1</h4>
          <admin-total-user />
        </div>
        <div class="rounded" id="totalUser">
          <h4>게시판 2</h4>
          <admin-total-login />
        </div>
        <div class="rounded" id="totalUser">
          <h4>게시판 3</h4>
          <admin-login-time />
        </div>
      </div>
      <div class="row row-cols-5 col-md-10">차트넣을 공간</div>
    </div>
    <!--게시판 끝-->
    <!--그래프 두개 들어갈 칸-->
  </div>
</template>

<script>
import AdminTotalUser from "./sub/AdminTotalUser.vue";
import AdminTotalLogin from "./sub/AdminTotalLogin.vue";
import AdminLoginTime from "./sub/AdminLoginTime.vue";
export default {
  components: { AdminTotalUser, AdminTotalLogin, AdminLoginTime },
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
#totalUser {
  /* width: 20%; */
}
</style>
