import { apiInstance } from "@/api/index.js";

const api = apiInstance();

function searchDealByAptcode(aptCode, success, fail) {
  api.get(`/housedeal/name/${aptCode}`).then(success).catch(fail);
}
export { searchDealByAptcode };
