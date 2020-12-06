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
    <div style="margin-top: 8px" />
    <v-btn color="primary" block text to="/"> 以來賓身份繼續使用 </v-btn>
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
      let { username, password } = this.form;
      if (username != "" && password != "") {
        this.loading = true;
        try {
          let loginResult = await this.$api.post("/oauth2/token", {
            username,
            password,
            grant_type: "password",
          });
          localStorage["access_token"] = loginResult.data.access_token;
          localStorage["username"] = loginResult.data.info.username;
          localStorage["role"] = loginResult.data.role;
          this.$api.defaults.headers.common = {
            Authorization: `Bearer ${loginResult.data.access_token}`,
          };
          this.loading = false;
          this.$router.push("/");
        } catch (e) {
          alert("登入失敗，可能是帳號或密碼輸入錯誤，請重試。");
          this.loading = false;
        }
      } else {
        alert("請輸入帳號與密碼");
      }
    },
  },
};
</script>