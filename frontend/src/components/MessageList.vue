<template>
  <vs-table striped class="message-list" :key="$route.params.directory" v-if="allowTable">
    <template #thead>
      <vs-tr>
        <vs-th>{{ opposingUser | capitalize }}</vs-th>
        <vs-th>Subject</vs-th>
        <vs-th>Sent at</vs-th>
      </vs-tr>
    </template>

    <template #tbody>
      <vs-tr v-for="message in messages" :key="message._id">
        <vs-td class="td-from">
          <Avatar :name="message[opposingUser].full_name || message[opposingUser].email | capitalize"></Avatar>
          <div class="from-container">
            {{ message[opposingUser].full_name || message[opposingUser].email }}
            <span>{{ message[opposingUser].email }}</span>
          </div>
        </vs-td>
        <vs-td>{{ message.subject }}</vs-td>
        <vs-td>{{ message.creation_date | formatDate }}</vs-td>

        <template #expand>
          <div class="con-content">
            <div>
              <p class="message-text">{{ message.text }}</p>
            </div>
            <div class="expand-btns">
              <vs-button @click="openReply(message)" flat icon>Send Email
              </vs-button>
              <vs-button @click="messageIdToDelete = message._id; deleteModal = true" border danger>Delete</vs-button>
            </div>
          </div>
        </template>
      </vs-tr>

      <vs-dialog width="400px" not-center v-model="deleteModal" class="delete-modal">
        <template #header>
          <h3 class="not-margin">
            Delete Message?
          </h3>
        </template>

        <div class="con-content">
          <p>
            This action cannot be undone!
          </p>
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button @click="deleteModal = false; removeMessage()" transparent danger>
              Delete
            </vs-button>
            <vs-button @click="deleteModal = false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </template>
      </vs-dialog>

    </template>

    <template #notFound>
      No messages to show
    </template>

  </vs-table>
</template>

<script>
import Avatar from './Avatar';

export default {
  name: 'MessageList',
  props: {
    messages: Array
  },
  data() {
    return {
      messageIdToDelete: null,
      deleteModal: false,
      allowTable: true
    }
  },
  computed: {
    opposingUser() {
      const opposingUser = this.$route.params.directory === 'sent' ? 'receiver' : 'sender';
      return opposingUser;
    }
  },
  created() {
    this.$parent.loading.close();
  },
  methods: {
    openReply(message) {
      this.$router.push({
        query: {
          compose: 'new',
          to: message[this.opposingUser].email
        }
      });
    },
    async removeMessage() {
      this.$parent.loading = this.$vs.loading({ type: 'rectangle', text: 'Deleting...', color: 'danger' });
      const directory = this.$route.params.directory === 'sent' ? 'sender' : 'receiver';
      await this.$store.dispatch('removeMessage', {
        messageId: this.messageIdToDelete,
        directory
      });
      this.$parent.loading.close();
      this.allowTable = false;
      this.$nextTick(() => { this.allowTable = true });
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    formatDate(value) {
      if (!value) return '';
      return new Date(value).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: 'numeric'
      });
    }
  },
  components: {
    Avatar
  }

}
</script>

<style lang="scss">
.message-list {
  .td-from {
    display: flex;
    align-items: center;

    .from-container {
      padding: 0.5em;

      span {
        display: block;
        font-size: rem(12px);
        font-weight: 300;
        color: #aaa;
      }
    }
  }

  .con-content {
    display: flex;

    & > div:first-of-type {
      flex: 1;
    }

    .expand-btns {
      display: flex;
      align-items: flex-start;
    }

    .message-text {
      white-space: break-spaces;
    }
  }

  .vs-table__expand__td__content {
    height: unset;
    border-bottom: 1px solid rgba(var(--vs-gray-2), 1);
    box-shadow: 0 -3px 6px inset rgba(var(--vs-gray-2), 1);
  }
}

.delete-modal {
  .con-footer {
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0 0.5rem;
      padding: 0 0.5rem;
    }
  }
}
</style>