<template>
  <div id="_overlay" class="col-12 d-flex justify-content-end">
    <div v-if="house">{{ house }}</div>
    <div id="_overlayrightend" class="col-md-2 d-flex flex-column me-5 mt-3">
      <div id="_searchdiv">검색바</div>
      <!-- 우측 오버레이 아파트정보칸 시작 -->
      <div id="_aptdetaildiv" class="table-responsive">
        <div class="card mb-4 rounded-3 shadow-sm border-primary">
          <div class="card-header py-3 text-white bg-primary border-primary">
            <table class="table mt-1 mb-1 text-white">
              <tr class="align-middle">
                <td class="col-1"></td>
                <td class="col-8 fw-bold fs-4 text-start">아파트명</td>
                <td class="col-2">
                  <!--아파트 관심추가 버튼-->
                  <button
                    @click="likeApt"
                    class="btn btn-primary"
                    type="button"
                  >
                    <b-icon icon="star"></b-icon>
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <div class="card-body">
            <table class="table mb-4 mt-2">
              <tr>
                <td class="col-4 fw-bold fs-4">주소</td>
                <td class="col-8 fs-5">남문로 43번길 3</td>
              </tr>
              <tr>
                <td class="col-4 fw-bold fs-4">건축년도</td>
                <td class="col-8 fs-5">2018</td>
              </tr>
            </table>
            <h3 class="fw-bold">리뷰</h3>
            <table class="table mb-4">
              <tr class="col-4 fs-5">
                좋은 집이에요
              </tr>
              <tr class="col-4 fs-5">
                좋은 집이에요
              </tr>
              <tr class="col-4 fs-5">
                좋은 집이에요
              </tr>
              <tr class="col-4 fs-5">
                좋은 집이에요
              </tr>
            </table>
            <h3 class="fw-bold">실거래가</h3>
            <table class="table mb-2">
              <thead>
                <th>거래년</th>
                <th>가격</th>
                <th>면적</th>
                <th>층</th>
              </thead>
              <tbody>
                <tr>
                  <td class="col-md-2">2019</td>
                  <td class="col-md-6">36000</td>
                  <td class="col-md-2">87.1</td>
                  <td class="col-md-2">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 우측 오버레이 아파트정보칸 끝 -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

const aptDetailStore = "aptDetailStore";

export default {
  name: "AptOverlay",
  data() {
    return {};
  },
  methods: {
    likeApt() {},
  },
  computed: {
    ...mapState(aptDetailStore, ["house", "isShow"]),
  },
};
</script>
<style>
#_overlay {
  position: absolute;
  z-index: 1;
}
</style>
