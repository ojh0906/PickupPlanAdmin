<template>
  <div class="inner">
    <p class="warning">Staff Only</p>
    <div class="login-form">
      <form name="login_form" id="login_form" method="post" @submit.prevent="formSubmit" >
        <p class="label">아이디</p>
        <input type="text" name="login_id" placeholder="Staff ID" v-model="this.email"/>
        <p class="label">패스워드</p>
        <input type="password" name="password" placeholder="Staff PW" autocomplete="off" v-model="this.password"/>
        <input type="submit" value="로그인" />
      </form>
    </div>
  </div>
</template>
<script>

</script>
