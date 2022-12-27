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
          }"
        />
            <!-- simpleSSO: simpleSSODefault,
            onReplySuccess: commentHasBeenSent, -->
      </div>
    </div>
  </div>
</template>

<script>
import { FastCommentsLiveChat } from "fastcomments-vue-next";
// import { mapActions, mapGetters } from "vuex";
// import { environment } from "@/environments/environments";

// const baseUrl = environment.baseUrl;

export default {
//   name: "App",
//   props: ["analyticsData", "typeCard"],
  data: function () {
    return {
    //   baseUrl: environment.baseUrl,
    //   shortAAddress: "",
    //   address: "",
    //   isDark: true,
    //   avatar: "",
    //   simpleSSODefault: {
    //     username: "Anonymous",
    //     email: "Anonymous@example.com",
    //     avatar: "",
    //     isAccountOwner: false,
    //   },
    };
  },
  components: {
    FastCommentsLiveChat,
  },
//   computed: mapGetters(["getTheme", "getUserAddress"]),
  watch: {
    // getTheme() {
    //   this.isDark = this.getTheme;
    // },
    // async getUserAddress() {
    //   setTimeout(async () => {
    //     await this.avatarInit();
    //     this.simpleSSODefaultInit();
    //   }, 800);
    // },
  },
  methods: {
    // ...mapActions(["chatEvent"]),
    // commentHasBeenSent() {
    //   if (this.typeCard) {
    //     this.chatEvent(this.analyticsData);
    //   }
    // },
    // avatarInit() {
    //   if (
    //     sessionStorage.getItem("userInfo") &&
    //     JSON.parse(sessionStorage.getItem("userInfo")).avatar
    //   ) {
    //     this.avatar =
    //       `${baseUrl}users/` + JSON.parse(sessionStorage.userInfo).address + "/avatar";
    //   } else {
    //     this.avatar = null;
    //   }
    // },

    // simpleSSODefaultInit() {
    //   if (sessionStorage.getItem("userInfo")) {
    //     this.shortAAddress = JSON.parse(sessionStorage.getItem("userInfo")).shortAddress;
    //     this.address = JSON.parse(sessionStorage.getItem("userInfo")).address;
    //     if (this.shortAAddress) {
    //       this.simpleSSODefault.username = this.shortAAddress;
    //       this.simpleSSODefault.email = `${this.address}@gmail.com`;
    //       this.simpleSSODefault.avatar = this.avatar;
    //       this.isDark = !this.isDark;
    //       this.isDark = !this.isDark;
    //     }
    //   }
    // },
  },
//   async mounted() {
//     await this.avatarInit();
//     this.isDark = this.getTheme;

//     this.simpleSSODefaultInit();
//   },
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
