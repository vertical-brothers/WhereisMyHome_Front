<template>
  <div class="home">
    <star-list />
    <!-- <main-home /> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import StarList from "@/components/star/StarList.vue";
export default {
  name: "StarView",
  components: { StarList },
};
</script>
