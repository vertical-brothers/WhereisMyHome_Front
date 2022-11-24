import { apiInstance } from "@/api/index.js";

const api = apiInstance();
// const house = apiInstance();

async function addApartLog(aptCode, success, fail) {
  await api.post(`/log/apartlog/${aptCode}`).then(success).catch(fail);
}
function getApartLog(success, fail) {
  api.get(`/log/apartlog`).then(success).catch(fail);
}

/*
  2022-11-24 이인재
  로그인 카운트 추가 api
*/
function addLoginLog(success, fail) {
  api.post(`/log/login`).then(success).catch(fail);
}

/*
2022-11-24 이인재
로그인 카운트 조회 api
*/
async function getLoginLog(success, fail) {
  await api.get(`/log/login`).then(success).catch(fail);
}
/*
  2022-11-24 이인재
  유저 수 조회 api
*/
async function getUserCount(success, fail) {
  await api.get(`/user/count`).then(success).catch(fail);
}
export { addApartLog, getApartLog, getUserCount, addLoginLog, getLoginLog };
