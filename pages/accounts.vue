<template>
  <div class="max-512-container">
    <div class="lr-container">
      <div class="l">
        <h1>帳號</h1>
      </div>
      <div class="r">
        <v-btn color="primary" icon depressed>
          <v-icon> mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-list>
      <template v-for="(account, index) in accountList">
        <v-list-item :key="account.id">
          <v-list-item-icon>
            <v-icon color="green" v-if="account.role == 'admin'">
              mdi-star
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="account.username"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          v-if="index < accountList.length - 1"
          :key="account.id + 'd'"
        ></v-divider>
      </template>
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
    accountList: [],
  }),
  mounted() {
    this.getAccountList();
  },
  methods: {
    async getAccountList() {
      this.$axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage["access_token"]}`,
      };
      let vue = this;
      this.accountList = (await this.$api.get("/accounts")).data;
    },
  },
};
</script>