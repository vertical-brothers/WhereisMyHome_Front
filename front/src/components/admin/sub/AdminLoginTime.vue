<template style="height: 300px">
  <b-card>
    <b-card-title>금주 총 로그인 시간</b-card-title>
    <b-card-text> 1024분 </b-card-text>
    <b-card-text class="small text-muted"
      >지난주에 비해 1024분 더 높습니다</b-card-text
    >
  </b-card>
</template>

<script>
export default {
  name: "AdminLoginTime",
  data() {
    return {
      total: 0,
    };
  },

  method() {},
};
</script>
