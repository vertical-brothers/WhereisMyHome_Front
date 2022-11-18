import axios from "axios";

import { apiInstance } from "@/api/index.js";

const api = apiInstance();

async function login(user, success, fail) {
  console.log(JSON.stringify(user));

  await axios
    .post(
      `http://localhost:8080/whereismyhome/user/login`,
      JSON.stringify(user),
      {
        // json을 json타입의 text로 변환
        headers: {
          "Content-Type": `application/json`, // application/json 타입 선언
        },
      }
    )
    .then(success)
    .catch(fail);

  // await api
  //   .post(`/user/login`, JSON.stringify(parameter))
  //   .then(success)
  //   .catch(fail);
  // const tmp = axios.create({
  //   baseURL: `http://localhost:8080`,
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // });
  // tmp.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
  console.log("test");
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  // await api.get(`/user/info/${userid}`).then(success).catch(fail);
  await api.get(`/user/`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] =
    sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout };
