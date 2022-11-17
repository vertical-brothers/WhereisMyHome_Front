<template>
  <div class="home">
    <h1>test</h1>
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
