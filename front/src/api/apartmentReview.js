import { apiInstance } from "@/api/index.js";

const api = apiInstance();

// function sidoList(success, fail) {
//   api.get(`/map/sido`).then(success).catch(fail);
// }
function searchApartmentReviewByAptcode(aptcode, success, fail) {
  api.get(`/aptreview/aptcode/${aptcode}`).then(success).catch(fail);
}

export { searchApartmentReviewByAptcode };
