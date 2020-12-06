<template>
  <div class="login-container">
    <h1>登入</h1>
    <p>還沒有帳號嗎？<nuxt-link to="/register">註冊</nuxt-link></p>
    <br />
    <v-text-field
      label="帳號"
      v-model="form.username"
      :disabled="loading"
      outlined
    ></v-text-field>
    <v-text-field
      label="密碼"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      outlined
      @click:append="showPassword = !showPassword"
      v-model="form.password"
      :disabled="loading"
    />
    <v-btn color="primary" block @click="login" :loading="loading">
      登入
    </v-btn>
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
    loading: false,
    form: {
      username: "",
      password: "",
    },
  }),
  methods: {
    async login() {
      this.loading = true;
      let { username, password } = this.form;
      try {
        let loginResult = await this.$axios.post("/oauth2/token", {
          username,
          password,
          grant_type: "password",
        });
        console.log(loginResult.data);
        localStorage["access_token"] = loginResult.data.access_token;
        localStorage["username"] = loginResult.data.info.username;
        localStorage["role"] = loginResult.data.role;
        this.loading = false;
        this.$router.push("/");
      } catch (e) {
        alert("登入失敗，可能是帳號或密碼輸入錯誤，請重試。");
        this.loading = false;
      }
    },
  },
};
</script>