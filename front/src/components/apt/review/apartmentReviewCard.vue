<template>
  <div class="border rounded">
    <div class="card-header row">
      <b-icon icon="person" scale="1" class="col col-md-2 mt-1"></b-icon>
      <div class="col col-md-4 text-start fw-bold">
        {{ review.userId }}
      </div>
      <b-icon icon="calendar2-date" scale="1" class="col-md-2 mt-1"></b-icon>
      <div class="col-md-4 text-start fw-bold">
        {{ review.date | dateFilter }}
      </div>
    </div>
    <div class="card-body">
      <div class="row mb-2">
        <h4 class="card-title fw-bold">
          {{ review.subject }}
        </h4>
      </div>

      <p>
        <!-- <b-form-rating v-model="review.star1" readonly></b-form-rating> -->
      </p>
      <button
        type="button"
        class="btn btn-primary"
        @click="goApartment(review.aptCode)"
      >
        아파트 보러가기
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
const mainStore = "mainStore";
export default {
  name: "ArticleItemForMain",
  props: {
    review: {},
    index: Number,
  },
  methods: {
    ...mapMutations(mainStore, ["SET_SEARCH"]),
    goApartment(aptCode) {
      this.SET_SEARCH(["aptCode", aptCode]);
      this.$router.push({ name: "apt" });
    },
  },
};
</script>
<style scoped></style>
