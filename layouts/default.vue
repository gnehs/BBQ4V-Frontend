<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list shaped>
        <template v-for="(item, i) in items">
          <v-list-item
            :key="i"
            :to="item.to"
            router
            exact
            v-if="access_token || !item.loginOnly"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content> </v-list-item
        ></template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>BBQ4V</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="role == 'admin'" text to="/admin/accounts"> 管理 </v-btn>
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
        icon: "mdi-youtube-subscription",
        title: "YouTuber",
        to: "/streamer",
      },
      {
        icon: "mdi-account",
        title: "帳號",
        to: "/account",
        loginOnly: true,
      },
    ],
    access_token: localStorage["access_token"],
    role: localStorage["role"],
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
