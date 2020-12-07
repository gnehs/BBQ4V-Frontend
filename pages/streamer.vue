<template>
  <div>
    <h1>YouTuber</h1>
    <pre>{{ streamerList }}</pre>
  </div>
</template>

<script>
export default {
  head() {
    const title = "YouTuber";
    return {
      title,
    };
  },
  data: () => ({
    streamerList: null,
    role: localStorage["role"],
  }),
  mounted() {
    this.getStreamer();
  },
  methods: {
    async getStreamer() {
      this.streamerList = (await this.$api.get(`/streamer`)).data;
    },
  },
};
</script>