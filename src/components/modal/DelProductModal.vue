<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
export default {
  data() {
    return {
      modal: {},
    };
  },
  props: ['delData'],
  emits: ['confirmDeleteData'],
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    confirmDelete() {
      this.$emit('confirmDeleteData', this.$props.delData);
      this.hideModal();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.delProductModal);
  },
};
</script>

<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger" v-if="$props.delData.title">{{ $props.delData.title }}</strong>
          <strong v-else>此訂單記錄</strong>
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete()">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
