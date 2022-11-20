<template>
  <div>
    <div class="mt-3"><h3>회원 가입</h3></div>
    <div class="col-md-12 d-flex justify-content-center">
      <form>
        <div class="mb-3 col">
          <label for="userId" class="form-label">아이디</label>
          <input
            type="text"
            class="form-control"
            id="userId"
            v-model="memberDto.userId"
          />
          <button type="submit" class="btn btn-primary" @click="duplicateCheck">
            중복 확인
          </button>
        </div>
        <div class="mb-3">
          <label for="userPwd" class="form-label">비밀번호</label>
          <input
            type="password"
            class="form-control"
            id="userPwd"
            v-model="memberDto.userPwd"
          />
        </div>
        <div class="mb-3">
          <label for="userName" class="form-label">이름</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            v-model="memberDto.userName"
          />
        </div>
        <div class="mb-3">
          <label for="userEmail" class="form-label">이메일</label>
          <input
            type="email"
            class="form-control"
            id="userEmail"
            v-model="memberDto.userEmail"
          />
        </div>
        <div class="mb-3">
          <label for="userPhone" class="form-label">전화번호</label>
          <input
            type="tel"
            class="form-control"
            id="userPhone"
            v-model="memberDto.userPhone"
          />
        </div>
        <button type="submit" class="btn btn-primary" @click="onClickJoinUser">
          회원 가입
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "UserRegister",
  data() {
    return {
      // isLoginError: false,
      memberDto: {
        userId: null,
        userPwd: null,
        userName: null,
        userEmail: null,
        userPhone: null,
        userRole: 0,
      },
      isDuplicatedChecked: false,
    };
  },
  methods: {
    ...mapActions(memberStore, ["useridcheck", "userjoin"]),
    async onClickJoinUser(e) {
      e.preventDefault();
      if (this.memberDto.userId === null || this.memberDto.userId === "") {
        alert("아이디를 입력해주세요.");
        return;
      } else if (
        this.memberDto.userPwd === null ||
        this.memberDto.userPwd === ""
      ) {
        alert("비밀번호를 입력해주세요.");
        return;
      } else if (
        this.memberDto.userName === null ||
        this.memberDto.userName === ""
      ) {
        alert("이름을 입력해주세요.");
        return;
      } else if (
        this.memberDto.userEmail === null ||
        this.memberDto.userEmail === ""
      ) {
        alert("이메일을 입력해주세요.");
        return;
      } else if (
        this.memberDto.userPhone === null ||
        this.memberDto.userPhone === ""
      ) {
        alert("전화번호를 입력해주세요.");
        return;
      }
      if (!this.isDuplicatedChecked) {
        alert("아이디 중복 여부를 확인해주세요.");
        return;
      }
      await this.userjoin(this.memberDto);
      this.$router.push({ name: "main" });
    },
    async duplicateCheck(e) {
      e.preventDefault();
      if (this.memberDto.userId === null || this.memberDto.userId === "") {
        alert("아이디를 입력해주세요.");
        return;
      }

      await this.useridcheck(this.memberDto.userId);
      if (this.isDuplicatedId) {
        alert("아이디가 중복되었습니다. 다른 아이디를 입력해주세요.");
        this.isDuplicatedChecked = false;
      } else {
        alert("사용 가능한 아이디입니다.");
        this.isDuplicatedChecked = true;
      }
    },
  },
  computed: {
    ...mapState(memberStore, ["isDuplicatedId", "isRegisterError"]),
  },
};
</script>

<style></style>
