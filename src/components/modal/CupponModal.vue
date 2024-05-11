<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.js';

export default {
  data() {
    return {
      isLoading: false,
      modal: {},
      tempCoupon: {},
      due_date: '2024-05-01',
    };
  },
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: Boolean,
  },
  emits: ['updateOrder'],
  components: {},
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.cupponModal);
  },
  watch: {
    isNew() {
      if (!this.isNew) {
        this.tempCoupon = this.coupon;
      } else {
        this.tempCoupon = {};
        // this.due_date = new Date().getTime() / 1000;
        // console.log(' this.due_date=> ', this.due_date);
      }
    },
  },
};
</script>

<template>
  <div
    id="cupponModal"
    ref="cupponModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="cupponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="cupponModalLabel" class="modal-title">
            <span>新增優惠卷</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <LoadingGlobal
          v-bind:active="isLoading"
          :can-cancel="true"
          :color="'blue'"
          :is-full-page="false"
          :loader="`dots`"
          :opacity="0.7"
        ></LoadingGlobal>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題" />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="due_date" />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              min="0"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary">新增優惠卷</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
