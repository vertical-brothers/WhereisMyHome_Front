<template style="height: 300px">
  <b-card>
    <b-card-title>일일 로그인 횟수</b-card-title>
    <b-card-text> 31회 </b-card-text>
    <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "AdminTotalLogin",
  data() {
    return {
      total: 0,
    };
  },

  method() {},
};
</script>
