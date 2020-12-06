<template>
  <div class="max-512-container">
    <h1>邀請碼</h1>
  </div>
</template>
<script>
export default {
  head() {
    const title = "邀請碼";
    return {
      title,
    };
  },
  data: () => ({
    access_token: localStorage["access_token"],
  }),
  methods: {},
};
</script>