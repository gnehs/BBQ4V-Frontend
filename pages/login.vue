<template>
  <div class="login-container">
    <h1>登入</h1>
    <p>還沒有帳號嗎？<nuxt-link to="/register">註冊</nuxt-link></p>
    <br />
    <v-text-field label="帳號" outlined></v-text-field>
    <v-text-field
      label="密碼"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      outlined
      @click:append="showPassword = !showPassword"
    />
    <v-btn color="primary" block> 登入 </v-btn>
  </div>
</template>
<script>
export default {
  layout: "login",
  head() {
    const title = "登入";
    return {
      title,
    };
  },
  data: () => ({
    showPassword: false,
    loginFailure: false,
  }),
};
</script>