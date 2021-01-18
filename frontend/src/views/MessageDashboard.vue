<template>
  <main class="message-dashboard">
    <Navbar></Navbar>
    <MessageList v-if="messages" :messages="messages"></MessageList>
    <MessageCompose :isOpen="!!isComposing" @close="$router.replace({ query: null })"></MessageCompose>
  </main>
</template>

<script>
import Navbar from '../components/Navbar';
import MessageList from '../components/MessageList';
import MessageCompose from '../components/MessageCompose';

export default {
  name: 'MessageDashboard',
  data() {
    return {
      loading: this.$vs.loading(),
    }
  },
  computed: {
    messages() {
      const messages = this.$store.getters.messages;
      const directory = this.$route.params.directory === 'sent' ? 'sender' : 'receiver';
      const loggedUser = this.$store.getters.loggedUser;
      return messages?.filter(message => message[directory].email === loggedUser.email);
    },
    isComposing() {
      return this.$route.query.compose;
    },
  },
  created() {
    this.$store.dispatch('getMessages');
  },
  components: {
    Navbar,
    MessageList,
    MessageCompose
  }
}
</script>