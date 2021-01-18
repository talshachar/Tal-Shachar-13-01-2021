<template>
  <vs-avatar :color="color">
    <template #text>
      {{ name }}
    </template>
  </vs-avatar>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
  },
  computed: {
    color() {
      const colorIdx = this.name.length % 7;
      return ['#00aa55', '#009fd4', '#b381b3', '#939393', '#e3bc00', '#d47500', '#dc2a2a'][colorIdx];
    }
  }
}
</script>