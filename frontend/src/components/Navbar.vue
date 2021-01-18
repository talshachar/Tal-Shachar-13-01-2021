<template>
  <vs-navbar right-collapsed>
    <template #left>
      <router-link to="/">
        <Logo height="45" />
      </router-link>
    </template>

    <vs-navbar-item :to="{ query: { compose: 'new' }}">
      + Compose
    </vs-navbar-item>
    <vs-navbar-item to="inbox" :active="$route.params.directory === 'inbox'" id="inbox">
      Inbox
    </vs-navbar-item>
    <vs-navbar-item to="sent" :active="$route.params.directory === 'sent'" id="sent">
      Sent
    </vs-navbar-item>

    <template #right>
      <vs-button to="/" flat>
        Home
      </vs-button>
    </template>
  </vs-navbar>
</template>

<script>
import Logo from '../assets/Logo';

export default {
  components: {
    Logo
  }

}
</script>

<style lang="scss">
.message-dashboard {
  .vs-navbar {
    height: 55px;
  }

  .vs-navbar-content {
    position: sticky;
    top: 0;
    z-index: 2;
    border-radius: 0 0 14px 14px;
    border-bottom: 2px solid #eee;
  }

  .vs-navbar__left {
    a {
      display: flex;
    }
  }
}
</style>