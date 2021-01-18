<template>
  <vs-tr>
    <vs-td>
      {{ message.sender.full_name }}
      <span class="from-email">{{ message.sender.email }}</span>
    </vs-td>
    <vs-td>{{ message.subject }}</vs-td>
    <vs-td>{{ new Date(message.creation_date).toLocaleDateString() }}</vs-td>

    <template #expand>
      <div class="con-content">
        <div>
          <vs-avatar>
            <template #text>
              {{ avatarName }}
            </template>
          </vs-avatar>
          <p>{{ message.text }}</p>
        </div>
        <div>
          <vs-button flat icon>Send Email</vs-button>
          <vs-button border danger>Delete</vs-button>
        </div>
      </div>
    </template>
  </vs-tr>

  <!-- <li>
    <pre>{{ message }}</pre>
  </li> -->
</template>

<script>
export default {
  name: 'MessagePreview',
  props: {
    message: Object
  },
  computed: {
    avatarName() {
      const secondParyUser = this.$route.params.directory === 'sent' ? 'reciever' : 'sender';
      return this.message[secondParyUser].full_name;
    }
  }
}
</script>

<style lang="scss">
.from-email {
  display: block;
  color: #bbbbbb;
}
</style>