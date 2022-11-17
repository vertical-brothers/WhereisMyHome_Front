<template>
  <div id="_overlay" class="col-12 d-flex justify-content-end">
    <div id="_overlayrightend" class="col-2 d-flex flex-column">
      <div id="_searchdiv">검색바</div>
      <div id="_detaildiv">디테일</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AptOverlay",
  data() {
    return {};
  },
};
</script>
<style>
#_overlay {
  position: absolute;
  z-index: 1;
}
</style>
