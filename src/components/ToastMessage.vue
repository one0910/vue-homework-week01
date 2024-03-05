<script>
import { mapActions, mapState } from 'pinia';
import { useToastMessageStore } from '@/stores/toastMessage';
export default {
  computed: {
    ...mapState(useToastMessageStore, ['messages']),
  },
  methods: {
    ...mapActions(useToastMessageStore, ['clearToast']),
  },
};
</script>
<template>
  <div class="toast-container position-fixed pe-3 top-0 end-0" style="z-index: 1500">
    <div
      v-for="(msg, index) in messages"
      :key="index"
      class="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      :class="`toast${index}`"
    >
      <div class="toast-header">
        <i v-if="msg.style === 'success'" class="bi bi-check2-circle me-2 text-success fs-5"></i>
        <i v-else class="bi bi-x-circle me-2 text-danger fs-6"></i>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button type="button" class="btn-close" @click="clearToast(key)" aria-label="Close"></button>
      </div>
      <div class="toast-body" v-if="msg.content">{{ msg.content }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
