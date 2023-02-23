<template>
  <div class="inner">
    <p class="warning">Staff Only</p>
    <div class="login-form">
      <form name="login_form" id="login_form" method="post" @submit.prevent="onSubmit" >
        <p class="label">아이디</p>
        <input type="text" name="login_id" placeholder="Staff ID" v-model="this.id"/>
        <p class="label">패스워드</p>
        <input type="password" name="password" placeholder="Staff PW" autocomplete="off" v-model="this.password"/>
        <input type="submit" value="로그인" />
      </form>
    </div>
  </div>
</template>
<script>
import {useAuthStore} from '@/_stores';

export default {
  components: {
  },
  data() {
    return {
      id: "",
      password: "",
    }
  },
  methods: {
    onSubmit() {
      const authStore = useAuthStore();
      // const param = JSON.stringify(values, null, 2);
      // console.log("param", param);
      return authStore.login(this.id, this.password)
          .catch(error => console.log(error));
    },
    validateId(value) {
      // if the field is empty
      if (!value) {
        return '아이디를 입력해 주세요.';
      }
      // if the field is not a valid email
      // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      // if (!regex.test(value)) {
      //   return 'This field must be a valid email';
      // }
      // All is good
      return true;
    },
    validatePassword(value) {
      if (!value) {
        return '비밀번호를 입력해 주세요.';
      }
      return true;
    },
  },
};
</script>
