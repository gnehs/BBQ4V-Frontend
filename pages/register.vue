<template>
  <div class="login-container">
    <h1>註冊</h1>
    <p>已有帳號？<nuxt-link to="/login">登入</nuxt-link></p>
    <br />
    <v-text-field
      label="邀請碼"
      v-model="form.token"
      :disabled="tokenLocked"
      outlined
    ></v-text-field>
    <v-text-field label="帳號" v-model="form.username" outlined></v-text-field>
    <v-text-field
      label="密碼"
      v-model="form.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      outlined
      @click:append="showPassword = !showPassword"
    />
    <v-text-field
      label="確認密碼"
      v-model="form.password2"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      outlined
      @click:append="showPassword = !showPassword"
    />
    <v-btn color="primary" block @click="register"> 註冊 </v-btn>
  </div>
</template>
<script>
export default {
  layout: "login",
  head() {
    const title = "註冊";
    return {
      title,
    };
  },
  mounted() {
    let regToken = this.$route.query?.token;
    console.log(regToken);
    if (regToken) {
      this.form.token = regToken;
      this.tokenLocked = true;
    }
  },
  data: () => ({
    form: { token: "", username: "", password: "", password2: "" },
    showPassword: false,
    tokenLocked: false,
  }),
  methods: {
    async register() {
      let { token, username, password, password2 } = this.form;
      if (token == "" || username == "" || password == "" || password2 == "") {
        return alert("請填寫所有欄位。");
      }
      if (password != password2) {
        return alert("密碼與確認密碼不符。");
      }
      try {
        let registerResult = await this.$api.post(`/register/${token}`, {
          username,
          password,
        });
        this.$router.push("/login");
      } catch (e) {}
    },
  },
};
</script>