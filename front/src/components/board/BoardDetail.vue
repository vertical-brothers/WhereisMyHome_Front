<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">공지사항</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="row my-2">
        <h2 class="text-secondary px-5">{{ subject }}</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center text-start">
            <p>
              <span>
                <img
                  class="avatar me-2 float-md bg-light p-2"
                  src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                />
              </span>
              <span class="fw-bold">{{ userId }}</span> <br />
              <span class="text-secondary fw-light"> </span>
            </p>
          </div>
        </div>
        <div class="col-md-4 align-self-center text-end">
          {{ registerTime }}
          <p>조회 : {{ hit }}</p>
        </div>
        <div class="divider mb-3"></div>
        <div v-html="content"></div>
        <div class="divider mt-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <router-link to="/board">
            <button
              type="button"
              id="btn-list"
              class="btn btn-outline-primary mb-3"
            >
              글목록
            </button>
          </router-link>
          <button
            v-if="userInfo != null && userInfo.userName == userId"
            type="button"
            id="btn-mv-modify"
            class="btn btn-outline-success mb-3 ms-1"
            @click="moveModify(articleNo)"
          >
            글수정
          </button>
          <button
            v-if="userInfo != null && userInfo.userRole == 1"
            type="button"
            id="btn-delete"
            class="btn btn-outline-danger mb-3 ms-1"
            @click="deleteArticle(articleNo)"
          >
            글삭제
          </button>
          <button
            v-if="userInfo != null && userInfo.userRole == 'admin'"
            type="button"
            id="btn-delete"
            class="btn btn-outline-danger mb-3 ms-1"
            @click="deleteArticle(articleNo)"
          >
            글삭제
          </button>
          <button
            v-else-if="userInfo != null && userInfo.userName == userId"
            type="button"
            id="btn-delete"
            class="btn btn-outline-danger mb-3 ms-1"
            @click="deleteArticle(articleNo)"
          >
            글삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
import { mapState } from "vuex";
const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      articleNo: "",
      userId: "",
      subject: "",
      content: "",
      registerTime: "",
      hit: 0,
    };
  },
  created() {
    let no = this.$route.params.no;
    http
      .get(`board/${no}`)
      .then(({ data }) => {
        this.articleNo = data.articleNo;
        this.userId = data.userId;
        this.subject = data.subject;
        this.content = data.content;
        this.registerTime = data.registerTime;
        this.hit = data.hit;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    moveModify(no) {
      this.$router.push(`/board/modify/${no}`);
    },
    deleteArticle(no) {
      http.delete(`board/${no}`).then(({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        // 현재 route를 /list로 변경.
        this.$router.push({ name: "list" });
      });
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
};
</script>
<style scoped></style>
