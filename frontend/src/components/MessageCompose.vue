<template>
  <vs-dialog :value="isOpen" @close="close" prevent-close blur overflow-hidden full-screen class="compose-message">
    <template v-if="!isSent" #header>
      <h4>New Message</h4>
    </template>

    <div v-if="!isSent" class="con-form">
      <vs-input disabled v-model="message.sender.email" block label-placeholder="From" dark
        @input="isValidSender = validateEmail(message.sender.email)">
        <template #icon>@</template>
        <template v-if="message.sender.email && !isValidSender" #message-danger>
          Email Invalid
        </template>
      </vs-input>

      <vs-input v-model="message.receiver.email" block label-placeholder="To" dark
        @input="isValidReceiver = validateEmail(message.receiver.email)">
        <template #icon>@<i class="bx bx-mail-send"></i>
        </template>
        <template v-if="!isValidReceiver" #message-danger>
          Email Invalid
        </template>
      </vs-input>

      <vs-input icon-before v-model="message.subject" block label-placeholder="Subject" dark>
        <template #icon>¶</template>
      </vs-input>

      <div class="textarea-container vs-input-parent block vs-input-content">
        <textarea v-model="message.text" class="vs-input"></textarea>
      </div>
    </div>

    <box-icon v-else color="#4c9df0" size="200px" name="message-check" type="solid" animation="tada" class="message-check">
    </box-icon>

    <template v-if="!isSent" #footer>
      <div class="footer-dialog">
        <vs-button block @click="sendMessage">
          Send
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  name: 'MessageCompose',
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      message: {
        sender: {
          email: this.$store.getters.loggedUser.email
        },
        receiver: {
          email: ''
        },
        subject: '',
        text: ''
      },
      isValidSender: true,
      isValidReceiver: true,
      isSent: false,
    }
  },
  watch: {
    '$route.query.to'(newValue) {
      this.message.receiver.email = newValue;
    }
  },
  methods: {
    async sendMessage() {
      const loading = this.$vs.loading({ type: 'points', text: 'Loading...', });
      
      this.isValidSender = this.validateEmail(this.message.sender.email);
      this.isValidReceiver = this.validateEmail(this.message.receiver.email);
      if (!this.isValidSender || !this.isValidReceiver) {
        loading.color = 'danger';
        loading.close();
        return;
      }

      loading.color = 'success';
      loading.text = 'Sending...';

      const message = this.$clone(this.message);
      message.subject ||= '(no subject)';
      await this.$store.dispatch('writeMessage', message);

      loading.close();
      this.isSent = true;
      setTimeout(this.close, 1000);
    },
    validateEmail(email) {
      // RFC 2822 format
      const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
      return regEx.test(email.toLowerCase());
    },
    close() {
      Object.assign(this.$data, this.$options.data.apply(this));
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
.compose-message {
  .vs-dialog {
    display: flex;
    flex-direction: column;
  }

  .vs-dialog__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 0;
  }

  .con-form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .textarea-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    textarea {
      flex: 1;
    }
  }

  .vs-input-parent {
    &:not(:last-of-type) {
      margin-bottom: 1.5em;
    }
  }

  label {
    margin-left: 1em;
    z-index: 1;
  }

  .message-check {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>