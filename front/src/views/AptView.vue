<template>
  <div class="home">
    <kakao-map></kakao-map>
    <apt-overlay :key="this.reviewForceUpdate"></apt-overlay>
  </div>
</template>

<script>
import KakaoMap from "@/components/apt/map/KakaoMap.vue";
import AptOverlay from "@/components/apt/info/AptOverlay.vue";
import { mapState } from "vuex";

const aptReviewStore = "aptReviewStore";
export default {
  name: "AptView",
  components: { KakaoMap, AptOverlay },
  computed: {
    ...mapState(aptReviewStore, ["reviewForceUpdate"]),
  },
};
</script>
