import { tokenInstance } from "@/api/index.js";

function listStar(token, success, fail) {
  const api = tokenInstance(token);
  console.log("관심지역 리스트를 불러옵니다.");
  api.get(`/star`).then(success).catch(fail);
}

export { listStar };
