<template>
  <div class="max-512-container">
    <div class="lr-container">
      <div class="l">
        <h1>邀請碼</h1>
      </div>
      <div class="r">
        <v-btn
          color="primary"
          icon
          depressed
          @click="showGenerateTokenCard = !showGenerateTokenCard"
        >
          <v-icon> mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-expand-transition>
      <v-card elevation="2" v-show="showGenerateTokenCard">
        <v-card-title>產生邀請碼</v-card-title>
        <v-card-text class="text--primary">
          <v-select :items="roles" v-model="form.role" label="Role" />
          <v-text-field
            label="Remaining"
            type="number"
            v-model="form.remaining"
            hide-details
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="orange" text @click="generateToken"> 產生 </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
    <v-list v-if="inviteList.length">
      <template v-for="(invite, index) in inviteList">
        <v-list-item :key="invite.token">
          <v-list-item-icon>
            {{ invite.remaining }}
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="invite.token" />
            <v-list-item-subtitle v-text="invite.role" />
          </v-list-item-content>
          <v-btn color="primary" icon @click="copyRegisterLink(invite.token)">
            <v-icon> mdi-link </v-icon>
          </v-btn>
          <v-btn color="red" icon @click="deleteToken(invite.token)">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-list-item>
        <v-divider
          v-if="index < inviteList.length - 1"
          :key="invite.token + 'd'"
        ></v-divider>
      </template>
    </v-list>
    <p v-else>空ㄉ</p>
  </div>
</template>
<script>
export default {
  layout: "admin",
  head() {
    const title = "邀請碼";
    return {
      title,
    };
  },
  data: () => ({
    inviteList: [],
    roles: ["admin", "guest", "user"],
    showGenerateTokenCard: false,
    form: {
      role: "user",
      remaining: 1,
    },
  }),
  mounted() {
    this.getInviteList();
  },
  methods: {
    async getInviteList() {
      this.inviteList = (await this.$api.get("/invite")).data;
    },
    copyRegisterLink(token) {
      let link = `${location.origin}/register?token=${token}`;
      navigator.clipboard.writeText(link);
      alert("已複製");
    },
    async generateToken() {
      await this.$api.post("/invite", this.form);
      await this.getInviteList();
      this.showGenerateTokenCard = false;
    },
    async deleteToken(token) {
      await this.$api.delete(`/invite/${token}`);
      await this.getInviteList();
    },
  },
};
</script>