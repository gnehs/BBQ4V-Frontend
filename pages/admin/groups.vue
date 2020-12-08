<template>
  <div class="max-512-container">
    <div class="lr-container">
      <div class="l">
        <h1>翻譯組</h1>
      </div>
      <div class="r">
        <v-btn
          color="primary"
          icon
          depressed
          @click="showAddGroupCard = !showAddGroupCard"
        >
          <v-icon> mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-expand-transition>
      <v-card v-show="showAddGroupCard">
        <v-card-title>新增翻譯組</v-card-title>
        <v-card-text class="text--primary">
          <v-text-field label="Name" v-model="form.name" />
          <v-textarea
            label="Description"
            v-model="form.description"
            hide-details
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="orange" text @click="addGroup"> 新增 </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
    <v-list v-if="groupList.length">
      <template v-for="(item, index) in groupList">
        <v-list-item :key="item.id">
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
            <v-list-item-subtitle v-text="item.description || '(無介紹)'" />
          </v-list-item-content>
          <v-btn icon @click="openEditDialog(item)">
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
          <v-btn color="red" icon @click="deleteGroup(item)">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-list-item>
        <v-divider
          v-if="index < groupList.length - 1"
          :key="item.id + 'd'"
        ></v-divider>
      </template>
    </v-list>
    <v-dialog v-model="editGroupDialog" width="500" v-if="editGroupForm">
      <v-card>
        <v-card-title> 編輯翻譯組 </v-card-title>

        <v-card-text>
          <v-text-field label="Name" v-model="editGroupForm.name" />
          <v-textarea
            label="Description"
            v-model="editGroupForm.description"
            hide-details
          />
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="editGroupDialog = false">
            取消
          </v-btn>
          <v-btn color="primary" text @click="editGroup"> 完成 </v-btn>
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
    groupList: [],
    showAddGroupCard: false,
    editGroupDialog: false,
    editGroupForm: null,
    form: {
      name: "",
      description: "",
    },
  }),
  mounted() {
    this.getGroupList();
  },
  methods: {
    async getGroupList() {
      this.groupList = (await this.$api.get("/groups")).data;
    },
    async deleteGroup(group) {
      if (confirm("安捏甘好？")) {
        try {
          await this.$api.delete(`/groups/${group.id}`);
        } catch (error) {}
        await this.getGroupList();
      }
    },
    async addGroup() {
      try {
        await this.$api.post("/groups", this.form);
      } catch (error) {}
      await this.getGroupList();
      this.showAddGroupCard = false;
    },
    openEditDialog(item) {
      this.editGroupForm = JSON.parse(JSON.stringify(item));
      this.editGroupDialog = true;
    },
    async editGroup() {
      let { name, description } = this.editGroupForm;
      try {
        await this.$api.patch(`/groups/${this.editGroupForm.id}`, {
          name,
          description,
        });
      } catch (error) {}
      await this.getGroupList();
      this.editGroupDialog = false;
    },
  },
};
</script>