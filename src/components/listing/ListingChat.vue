<template>
  <div class="tab-contain">
    <div class="chat">
      <div class="chat-container">
        <fast-comments-live-chat
          v-bind:config="{
            tenantId: 'aMG4K5KR34',
            hasDarkBackground: false,
            hideAvatars: false,
            enableCommenterLinks: false,
            simpleSSO: simpleSSODefault
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { FastCommentsLiveChat } from "fastcomments-vue-next";

export default {
  data: function () {
    return {
      simpleSSODefault: {
        username: "Anonymous",
        email: "Anonymous@example.com",
        avatar: "",
        isAccountOwner: false,
      },
    };
  },
  components: {
    FastCommentsLiveChat,
  },
  methods: {
    simpleSSODefaultInit() {
      let userAddress = localStorage.getItem('userAddress');
      if (userAddress) {
        this.simpleSSODefault.username = userAddress.substring(0, 6) + '...' + userAddress.substring(38, 42);
        this.simpleSSODefault.email = `${userAddress}@gmail.com`;
      }
    },
  },
  created() {
    this.simpleSSODefaultInit();
  },
  async mounted() {},
};
</script>

<style scoped>
.fastcomments-live-chat{
    background: #FFFFFF;
border: 1px solid #DFE2EA;
border-radius: 8px;
overflow: hidden;
}
</style>
