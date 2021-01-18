<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('setUser', { email: 'shactal@gmail.com' });
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
}
</style>