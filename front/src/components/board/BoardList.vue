<template>
  <div>
    <b-container fluid="bv-example-row">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <h2 class="my-3 py-3 shadow-sm bg-light text-center">
            <mark class="sky">공지사항</mark>
          </h2>
        </div>

        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="row align-self-center mb-2">
            <div class="col-md-2 text-start">
              <b-button
                v-if="userInfo.userId != null"
                variant="btn btn-outline-primary btn-sm"
                @click="moveWrite"
                >글쓰기</b-button
              >
            </div>
            <div class="col-md-7 offset-3">
              <b-form class="d-flex">
                <input type="hidden" name="act" value="list" />
                <input type="hidden" name="pgno" value="1" />
                <b-form-select
                  class="form-select form-select-sm ms-5 me-1 w-50"
                  v-model="selected"
                  :options="options"
                ></b-form-select>
                <div class="input-group input-group-sm">
                  <b-form-input
                    v-model="searchText"
                    class="form-control"
                    placeholder="검색어..."
                  />
                  <b-button
                    id="btn-search"
                    class="btn btn-dark"
                    type="button"
                    @click="moveWrite"
                  >
                    검색
                  </b-button>
                </div>
              </b-form>
            </div>
          </div>
          <b-table-simple striped hover small caption-top responsive>
            <colgroup>
              <col style="width: 5%" />
              <col style="width: 35%" />
              <col style="width: 25%" />
              <col style="width: 5%" />
              <col style="width: 30%" />
            </colgroup>
            <b-thead>
              <b-tr class="text-center">
                <b-th scope="col">글번호</b-th>
                <b-th scope="col">제목</b-th>
                <b-th scope="col">작성자</b-th>
                <b-th scope="col">조회수</b-th>
                <b-th scope="col">작성일</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <article-item
                v-for="(article, index) in articles"
                :key="index"
                :article="article"
                :index="index"
              ></article-item>
            </b-tbody>
          </b-table-simple>
        </div>
      </div>
    </b-container>
    <div class="row">
      <ul class="pagination justify-content-center">
        <div v-if="(test = this.pgno - 1 > 0)">
          <li class="page-item">
            <a
              class="page-link"
              href="${root}/board/list?pgno=${param.pgno-1}&key=&word="
              >이전</a
            >
          </li>
        </div>
        <div v-else-if="(test = this.pgno - 1 <= 0)">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              onClick="alert('이전 페이지가 없습니다.')"
              >이전</a
            >
          </li>
        </div>

        <v-for
          var="page"
          begin="${startpageno}"
          end="${endpage}"
          varStatus="page_num"
        >
          <!-- <c:choose>
            <c:when test="${page_num.count eq param.pgno}">
              <li class="page-item active">
                <a
                  class="page-link"
                  href="${root}/board/list?pgno=${page }&key=&word=&articleno=#"
                  >${page}</a
                >
              </li>
            </c:when>
            <c:otherwise>
              <li class="page-item">
                <a
                  class="page-link"
                  href="${root}/board/list?pgno=${page }&key=&word=&articleno=#"
                  >${page}</a
                >
              </li>
            </c:otherwise>
          </c:choose> -->
        </v-for>

        <div v-if="test == this.pgno + 1 <= lastpage">
          <li class="page-item">
            <a
              class="page-link"
              href="${root }/board/list?pgno=${param.pgno + 1}&key=&word="
              >다음</a
            >
          </li>
        </div>
        <div v-else-if="test == this.pgno + 1 > lastpage">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              onClick="alert('다음 페이지가 없습니다.')"
              >다음</a
            >
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
import { listArticle } from "@/api/board.js";
import ArticleItem from "@/components/board/ArticleItem.vue";
import { mapState } from "vuex";
const memberStore = "memberStore";
export default {
  name: "BoardList",
  components: {
    ArticleItem,
  },
  data() {
    return {
      articles: [],
      pgno: 1,
      subkey: "",
      word: "",
      searchText: "",
      selected: null,
      options: [
        { value: null, text: "검색조건" },
        { value: "subject", text: "제목" },
        { value: "user_id", text: "작성자" },
      ],
    };
  },
  created() {
    let param = {
      pgno: this.pgno,
      // spp: 20,
      key: this.subkey,
      word: this.word,
    };
    // this.boardlist();
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    setPgno(tmp) {
      this.pgno = tmp;
    },
    boardlist() {
      http
        .get(
          `/board?pgno=${this.pgno}&spp=15&key=${this.selected}&word=${this.word}`
        )
        .then(({ data }) => {
          this.articles = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    moveWrite() {
      this.$router.push(`/board/write`);
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
};
</script>
