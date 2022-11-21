<template>
  <b-card
    :title="star.dong"
    img-src="https://littledeep.com/wp-content/uploads/2020/09/apartments-illustration-1024x600.png"
    img-height="170"
    img-alt="Image"
    img-top
    tag="article"
    class="mb-2"
    style="text-align: left"
  >
    <b-card-text
      >{{ star.roadName }} {{ star.dong }} {{ star.apartmentName }}</b-card-text
    >

    <b-button
      href="#"
      variant="danger"
      @click="test(star.starNo)"
      style="align: right"
      >삭제</b-button
    >
  </b-card>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "@/config/index";
export default {
  name: "StarItem",
  props: {
    star: {},
    index: Number,
  },
  methods: {
    test(starno) {
      let token = sessionStorage.getItem("access-token");
      console.log(this.star.starno + " " + starno);
      axios
        .create({
          baseURL: API_BASE_URL,
          headers: {
            "Content-type": "application/json",
            "access-token": token,
          },
        })
        .delete(`/star/${starno}`)
        .then(({ data }) => {
          console.log(data.message);
          this.$router.go(this.$router.current);
          // this.$router.push(`/star/list`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {},
};
</script>
<style scoped></style>
