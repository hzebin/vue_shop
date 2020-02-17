<template>
  <div>
    <el-button type="info" @click="logoutBtn">退出登录</el-button>
  </div>
</template>

<script>
  export default {
    name: "Home",
    methods: {
      logoutBtn() {
        window.sessionStorage.clear();
        this.$router.push("/login");
      }
    }
  }
</script>

<style scoped>

</style>