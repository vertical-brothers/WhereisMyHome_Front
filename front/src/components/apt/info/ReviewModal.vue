<template>
  <b-modal
    v-if="review"
    size="xl"
    id="_modal"
    v-model="modalShow"
    scrollable
    title="아파트 리뷰"
    ok-only
  >
    <div class="row">
      <div class="col-md-9">
        <h2>{{ review.subject }}</h2>
      </div>
      <div class="col-md-3">
        <b-form-rating v-model="review.star1" readonly></b-form-rating>
      </div>
    </div>
    <div class="row">
      <b-icon
        icon="calendar2-date"
        scale="1"
        class="col-md-1 mt-1 ms-2"
      ></b-icon>
      <h5 class="col">{{ review.date }}</h5>
    </div>
    <div class="row">
      <b-icon icon="person" scale="2" class="col-md-1 mt-2 ms-2"></b-icon>
      <h4 class="col">{{ review.userId }}</h4>
    </div>
    <div>
      <p v-html="review.content"></p>
    </div>
  </b-modal>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
const aptReviewStore = "aptReviewStore";
export default {
  name: "ReviewModal",
  computed: {
    ...mapState(aptReviewStore, ["reviewModalShow", "review"]),
    modalShow: {
      get() {
        return this.reviewModalShow;
      },
      set() {
        return this.CLEAR_REVIEW_MODAL_SHOW();
      },
    },
  },
  methods: {
    ...mapActions(aptReviewStore, ["clearModal"]),
    ...mapMutations(aptReviewStore, [
      "CLEAR_REVIEW",
      "CLEAR_REVIEW_MODAL_SHOW",
    ]),
  },
};
</script>
<style scoped>
#_modal {
  position: absolute;
  z-index: 1;
}
</style>
