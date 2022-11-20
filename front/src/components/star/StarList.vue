<template>
  <div>
    <div class="col-md-12 d-flex justify-content-center mt-4">
      <div class="row row-cols-3 col-md-10 h-100 border">
        <div class="rounded border col-lg-4">
          <h4 class>게시판 1</h4>
          <table class="table rounded">
            <tr>
              title
            </tr>
          </table>
        </div>

        <div>
          <h4>게시판 2</h4>
          <table class="table rounded">
            <tr>
              title
            </tr>
          </table>
        </div>
        <div>
          <h4>게시판 3</h4>
          <table class="table rounded">
            <tr>
              title
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarItem from "@/components/star/StarItem.vue";
export default {
  name: "StarList",
  comments: {
    StarItem,
  },
  data() {
    return {
      stars: [],
    };
  },
  created() {},
};
</script>
