import { apiInstance } from "@/api/index.js";

const api = apiInstance();
// const house = apiInstance();

async function addLog(aptCode, success, fail) {
  await api.post(`/log/apartlog/${aptCode}`).then(success).catch(fail);
}
function getLog(success, fail) {
  api.get(`/log/apartlog`).then(success).catch(fail);
}
export { addLog, getLog };
