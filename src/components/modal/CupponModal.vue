<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.js';

export default {
  data() {
    return {
      isLoading: false,
      modal: {},
      tempCoupon: {},
      due_date: '',
      couponSchema: {
        coupon_code: 'required',
        coupon_percent: 'required',
        coupon_title: 'required',
      },
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
  emits: ['updateCouponEmit'],
  components: {},
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    submitCuopon() {
      this.$emit('updateCouponEmit', this.tempCoupon);
    },
    toggleLoading(enablLoading) {
      if (enablLoading) {
        this.modalBackdrop = 'static';
        this.isLoading = enablLoading;
      } else {
        this.isLoading = enablLoading;
      }
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.cupponModal);
  },
  watch: {
    coupon() {
      if (!this.isNew) {
        this.tempCoupon = this.coupon;
        const dueDate = new Date(this.tempCoupon.due_date * 1000).toISOString().slice(0, 10);
        this.due_date = dueDate;
      } else {
        this.due_date = this.tempCoupon = {};
        const today = new Date().toISOString().slice(0, 10);
        this.due_date = today;
      }
    },
    /*當日期有變動時，將日期再重新寫入tempCoupon的due_date裡*/
    due_date() {
      this.tempCoupon.due_date = new Date(this.due_date) / 1000;
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
    data-bs-backdrop="static"
  >
    <div class="modal-dialog">
      <VeeForm :validation-schema="couponSchema" v-on:submit="submitCuopon">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="cupponModalLabel" class="modal-title">
              <span v-if="isNew">新增優惠卷</span>
              <span v-else>編輯優惠卷</span>
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
              <vee-field
                type="text"
                class="form-control"
                name="coupon_title"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              >
              </vee-field>
              <ErrorMessage class="text-danger" name="coupon_title" />
            </div>
            <div class="mb-3">
              <label for="coupon_code">優惠碼</label>
              <vee-field
                type="text"
                class="form-control"
                id="coupon_code"
                name="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              >
              </vee-field>
              <ErrorMessage class="text-danger" name="coupon_code" />
            </div>
            <div class="mb-3">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date" v-model="due_date" />
            </div>
            <div class="mb-3">
              <label for="price">折扣百分比</label>
              <vee-field
                type="number"
                class="form-control"
                id="price"
                name="coupon_percent"
                min="0"
                v-model.number="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              >
              </vee-field>
              <ErrorMessage class="text-danger" name="coupon_percent" />
            </div>
            <div class="mb-3">
              <div class="form-check">
                <vee-field
                  id="is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  name="cupon_isEnable"
                  :value="1"
                  :unchecked-value="0"
                  v-model="tempCoupon.is_enabled"
                ></vee-field>
                <label class="form-check-label" for="is_enabled"> 是否啟用</label>
              </div>
              <ErrorMessage class="text-danger" name="cupon_isEnable" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="submit" class="btn btn-primary">
              <span v-if="isNew">新增優惠卷</span>
              <span v-else>更新優惠卷</span>
            </button>
          </div>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
