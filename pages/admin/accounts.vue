<template>
  <div class="max-512-container">
    <div class="lr-container">
      <div class="l">
        <h1>帳號</h1>
      </div>
      <div class="r">
        <v-btn
          color="primary"
          icon
          depressed
          @click="showAddUserCard = !showAddUserCard"
        >
          <v-icon> mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-expand-transition>
      <v-card v-show="showAddUserCard">
        <v-card-title>新增使用者</v-card-title>
        <v-card-text class="text--primary">
          <v-select :items="roles" v-model="form.role" label="Role" />
          <v-text-field label="Username" v-model="form.username" />
          <v-text-field label="Password" v-model="form.password" hide-details />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="orange" text @click="addUser"> 新增 </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
    <v-list v-if="accountList.length">
      <template v-for="(account, index) in accountList">
        <v-list-item :key="account.id">
          <v-list-item-icon>
            <v-icon color="green" v-if="account.role == 'admin'">
              mdi-star
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="account.username" />
            <v-list-item-subtitle v-text="account.role" />
          </v-list-item-content>
          <v-btn icon @click="openEditDialog(account)">
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
          <v-btn color="red" icon @click="deleteAccount(account)">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-list-item>
        <v-divider
          v-if="index < accountList.length - 1"
          :key="account.id + 'd'"
        ></v-divider>
      </template>
    </v-list>
    <v-dialog v-model="editUserDialog" width="500" v-if="editUserForm">
      <v-card>
        <v-card-title> 編輯使用者 </v-card-title>

        <v-card-text>
          <v-text-field label="ID" v-model="editUserForm.id" disabled />
          <v-select :items="roles" v-model="editUserForm.role" label="Role" />
          <v-text-field label="Username" v-model="editUserForm.username" />
          <v-text-field
            label="Password"
            v-model="editUserForm.password"
            disabled
          />
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="orange" text @click="changeAccountPassword">
            更改密碼
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="editUserDialog = false">
            取消
          </v-btn>
          <v-btn color="primary" text @click="editAccount"> 完成 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  layout: "admin",
  head() {
    const title = "帳號";
    return {
      title,
    };
  },
  data: () => ({
    accountList: [],
    showAddUserCard: false,
    editUserDialog: false,
    editUserForm: null,
    roles: ["admin", "guest", "member"],
    form: {
      role: "member",
      username: "",
      password: "",
    },
  }),
  mounted() {
    this.getAccountList();
  },
  methods: {
    async getAccountList() {
      this.accountList = (await this.$api.get("/accounts")).data;
    },
    async deleteAccount(account) {
      if (confirm("安捏甘好？")) {
        if (account.role != "admin" || confirm("安捏甘好？你素管理員捏")) {
          try {
            await this.$api.delete(`/accounts/${account.id}`);
          } catch (error) {}
          await this.getAccountList();
        }
      }
    },
    async addUser() {
      try {
        await this.$api.post("/accounts", this.form);
      } catch (error) {}
      await this.getAccountList();
      this.showAddUserCard = false;
    },
    openEditDialog(account) {
      this.editUserForm = JSON.parse(JSON.stringify(account));
      this.editUserDialog = true;
    },
    async editAccount() {
      let { username, role } = this.editUserForm;
      try {
        await this.$api.patch(`/accounts/${this.editUserForm.id}`, {
          username,
          role,
        });
      } catch (error) {}
      await this.getAccountList();
      this.editUserDialog = false;
    },
    async changeAccountPassword() {
      let newPassword = prompt("新密碼：");
      if (newPassword) {
        try {
          let changePassRes = await this.$api.patch(
            `/accounts/${this.editUserForm.id}`,
            {
              password: newPassword,
            }
          );
          this.editUserForm.password = changePassRes.data[0].password;
        } catch (error) {}
      }
    },
  },
};
</script>