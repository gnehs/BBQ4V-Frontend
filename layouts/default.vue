<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list shaped>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>BBQ4V</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!access_token" text to="/login"> 登入 </v-btn>
      <v-btn v-else text @click="logout"> 登出 </v-btn>
    </v-app-bar>
    <v-main>
      <v-container grid-list-md>
        <nuxt />
      </v-container>
    </v-main>
    <!--<v-footer app>
			<span>&copy; 2019</span>
		</v-footer>-->
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        icon: "mdi-home",
        title: "首頁",
        to: "/",
      },
      {
        icon: "mdi-account",
        title: "帳號",
        to: "/accounts",
      },
      {
        icon: "mdi-ticket-account",
        title: "邀請碼",
        to: "/tickets",
      },
    ],
    access_token: localStorage["access_token"],
  }),
  methods: {
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      this.access_token = null;
      this.$api.defaults.headers.common = {
        Authorization: null,
      };
      //alert("您已成功登出！");
      this.$router.push("/login");
    },
  },
};
</script>
