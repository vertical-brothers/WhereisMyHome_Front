<template>
  <div class="home">
    <kakao-map />
  </div>
</template>

<script>
import KakaoMap from "@/components/apt/map/KakaoMap.vue";
export default {
  name: "AptView",
  components: { KakaoMap },
};
</script>
