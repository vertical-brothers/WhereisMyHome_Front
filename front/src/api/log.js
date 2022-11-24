import { apiInstance } from "@/api/index.js";

const api = apiInstance();
// const house = apiInstance();

async function addLog(aptCode, success, fail) {
  await api.post(`/log/apartlog/${aptCode}`).then(success).catch(fail);
}
function getLog(success, fail) {
  api.get(`/log/apartlog`).then(success).catch(fail);
}

/*
  2022-11-24 이인재
  로그인 카운트 추가 api
*/
function addLoginLog(success, fail) {
  api.post(`/loginlog`).then(success).catch(fail);
}

/*
2022-11-24 이인재
로그인 카운트 조회 api
*/
function getLoginLog(success, fail) {
  api.get(`/loginlog`).then(success).catch(fail);
}
/*
  2022-11-24 이인재
  유저 수 조회 api
*/
function getUserCount(success, fail) {
  api.get(`/user/count`).then(success).catch(fail);
}
export { addLog, getLog, getUserCount, addLoginLog, getLoginLog };
