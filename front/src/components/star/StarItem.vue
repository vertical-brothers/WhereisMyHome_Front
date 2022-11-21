<template>
  <b-card
    :title="star.dong"
    img-src="https://cdn.pixabay.com/photo/2016/11/13/12/52/kuala-lumpur-1820944_960_720.jpg"
    img-height="150"
    img-alt="Image"
    img-top
    width="200"
    tag="article"
    class="mb-2"
    style="text-align: left"
  >
    <div class="row">
      <div class="col-10">
        <b-card-text
          >{{ star.roadName }} {{ star.dong }}
          {{ star.apartmentName }}</b-card-text
        >
      </div>
      <div class="col-2">
        <b-button variant="outline-danger" @click="test(star.starNo)"
          >삭제</b-button
        >
      </div>
    </div>
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
