<template>
  <b-modal id="_modal" title="BootstrapVue" v-model="reviewModalShow">
    <p class="my-4">{{ review }}</p>
  </b-modal>
</template>
<script>
import { mapState, mapMutations } from "vuex";
const aptReviewStore = "aptReviewStore";
export default {
  name: "ReviewModal",
  computed: {
    ...mapState(aptReviewStore, ["reviewModalShow", "review"]),
    set() {
      return this.CLEAR_REVIEW_MODAL_SHOW(false);
    },
  },
  methods: {
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
