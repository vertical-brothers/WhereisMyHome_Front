<template>
  <!--검색 carousel 시작 -->
  <div id="carouselExampleCaptions" class="carousel" data-bs-ride="carousel">
    <div class="carousel-inner" style="background-color: rgb(54, 54, 54)">
      <div class="carousel-item active">
        <img
          style="object-fit: cover"
          src="@/assets/home_apartment.jpg"
          class="d-block w-100"
          height="400"
        />
        <div class="carousel-caption d-flex flex-column align-items-center">
          <div class="display-1 mb-3">Happy House</div>
        </div>
      </div>
    </div>
    <!--검색 carousel 끝 -->
    <!--게시판 시작-->
    <div class="col-md-12 d-flex justify-content-center mt-4">
      <div class="row row-cols-3 col-md-10">
        <div class="rounded">
          <h4 class>게시판 1</h4>
          <table class="table rounded">
            <tr>
              title
            </tr>
          </table>
        </div>
        <div>
          <h4>게시판 2</h4>
          <table class="table rounded">
            <tr>
              title
            </tr>
          </table>
        </div>
        <div>
          <h4>게시판 3</h4>
          <table class="table rounded">
            <tr>
              title
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!--게시판 끝-->
  </div>
</template>

<script>
import AdminTotalUser from "./sub/AdminTotalUser.vue";
export default {
  name: "AdminHome",
  comments: {
    AdminTotalUser,
  },
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
</style>
