<template>
  <div class="max-512-container">
    <h1>帳號</h1>
    <v-list v-if="accountInfo">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>權限</v-list-item-title>
          <v-list-item-subtitle v-text="accountInfo.role" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>帳號</v-list-item-title>
          <v-list-item-subtitle v-text="accountInfo.username" />
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="changeAccountPassword">
        <v-list-item-content>
          <v-list-item-title>密碼</v-list-item-title>
          <v-list-item-subtitle>輕觸這裡更改密碼</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="deleteAccount">
        <v-list-item-content>
          <v-list-item-title>刪除帳號</v-list-item-title>
          <v-list-item-subtitle>輕觸這裡刪除帳號</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  head() {
    const title = "帳號";
    return {
      title,
    };
  },
  data: () => ({
    accountInfo: null,
  }),
  mounted() {
    this.getAccountInfo();
  },
  methods: {
    async getAccountInfo() {
      this.accountInfo = (
        await this.$api.get(`/accounts/${localStorage["id"]}`)
      ).data[0];
    },
    async changeAccountPassword() {
      let newPassword = prompt("新密碼：");
      if (newPassword) {
        try {
          let changePassRes = await this.$api.patch(
            `/accounts/${localStorage["id"]}`,
            {
              password: newPassword,
            }
          );
          this.editUserForm.password = changePassRes.data[0].password;
        } catch (error) {}
      }
    },
    async deleteAccount() {
      if (confirm("確定要刪除您的帳號嗎？")) {
        let accountPrompt = prompt("請輸入您的帳號來確認刪除：");
        if (accountPrompt) {
          if (accountPrompt == localStorage["username"]) {
            try {
              await this.$api.delete(`/accounts/${localStorage["id"]}`);
            } catch (error) {}
            this.$router.push("/login");
            this.$nextTick(() => {
              alert("帳號已刪除！");
            });
          } else {
            alert("帳號輸入錯誤！");
          }
        }
      }
    },
  },
};
</script>