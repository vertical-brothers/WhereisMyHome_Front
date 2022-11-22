import { tokenInstance } from "@/api/index.js";
import axios from "axios";

function listStar(token, success, fail) {
  const api = tokenInstance(token);
  console.log("관심지역 리스트를 불러옵니다.");
  api.get(`/star`).then(success).catch(fail);
}

function deleteStar(starno, token, success, fail) {
  const api = tokenInstance(token);
  api.delete(`/star/${starno}`).then(success).catch(fail);
}

function checkStar(aptCode, token, success, fail) {
  const api = tokenInstance(token);
  api.get(`/star/check/${aptCode}`).then(success).catch(fail);
}

async function writeStarApi(star, token, success, fail) {
  // const api = tokenInstance(token);
  // api.post(`/star`, star).then(success).catch(fail);
  await axios
    .post(`http://localhost:8080/whereismyhome/star`, JSON.stringify(star), {
      // json을 json타입의 text로 변환
      headers: {
        "Content-Type": `application/json`,
        "access-token": token, // application/json 타입 선언
      },
    })
    .then(success)
    .catch(fail);
}

export { listStar, deleteStar, checkStar, writeStarApi };
