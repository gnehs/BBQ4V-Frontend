<template>
  <div>
    <h1>帳號</h1>
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
  data: () => ({}),
  mounted() {
    this.getAccountList();
  },
  methods: {
    async getAccountList() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage["access_token"]}` },
      };

      this.$axios
        .post("/accounts", config)
        .then(console.log)
        .catch(console.log);
    },
  },
};
</script>