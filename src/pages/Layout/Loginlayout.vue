<template>

  <div class="wrapper">
    <notifications></notifications>
    <div>
      <LoginContent> </LoginContent>

      <!--            <content-footer></content-footer>-->
    </div>
  </div>
</template>

<script>
import LoginContent from "./Content.vue";

export default {
  components: {
    LoginContent
  },
  data() {
    return {
      sidebarBackground: "green",
     sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg")
    };
  }
};
</script>
