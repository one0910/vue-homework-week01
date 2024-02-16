<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
const url = `${import.meta.env.VITE_API_URL}`;
export default {
  data() {
    return {
      modal: {},
      orderSchema: {
        email: 'required|email',
        name: 'required|min:3|max:100',
        tel: 'required|min:3|max:10',
        address: 'required|min:3|max:20',
        message: '',
      },
      isLoadding: false,
    };
  },
  emits: ['compeleteOrder'],
  components: {
    Loading,
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    async submitOrder(value) {
      const { name, email, tel, address, message } = value;
      try {
        this.isLoadding = true;
        await this.$http.post(`${url}/order`, {
          data: {
            user: { name, email, tel, address },
            message: message ? message : '',
          },
        });
        this.$emit('compeleteOrder', true);
        this.isLoadding = false;
        this.hideModal();
        alert('訂購完成');
      } catch (error) {
        console.error('error => ', error);
        this.isLoadding = false;
      }
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.FormModal);
  },
};
</script>

<template>
  <Loading
    v-model:active="isLoadding"
    :can-cancel="true"
    :color="`#1572fc`"
    :background-color="`rgba(110, 110, 110, 0.81)`"
    :is-full-page="true"
    :loader="`dots`"
  />
  <div
    id="FormModal"
    ref="FormModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="FormModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>請填寫個人聯絡資訊</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-center">
            <VeeForm ref="form" class="" :validation-schema="orderSchema" v-on:submit="submitOrder">
              <div class="mb-2">
                <label for="email" class="form-label">電子郵件</label>
                <vee-field id="email" name="email" type="email" class="form-control" placeholder="請輸入 Email">
                </vee-field>
                <ErrorMessage class="text-danger" name="email" />
              </div>
              <div class="mb-2">
                <label for="name" class="form-label">收件人姓名</label>
                <vee-field id="name" name="name" type="email" class="form-control" placeholder="請輸入姓名">
                </vee-field>
                <ErrorMessage class="text-danger" name="name" />
              </div>
              <div class="mb-2">
                <label for="tel" class="form-label">收件人電話</label>
                <vee-field id="tel" name="tel" type="tel" class="form-control" placeholder="請輸入電話"> </vee-field>
                <error-message name="tel" class="text-danger"></error-message>
              </div>
              <div class="mb-2">
                <label for="address" class="form-label">收件人地址</label>
                <vee-field id="address" name="address" type="text" class="form-control" placeholder="請輸入收件人地址">
                </vee-field>
                <error-message name="address" class="text-danger"></error-message>
              </div>
              <div class="mb-2">
                <label for="message" class="form-label">留言</label>
                <vee-field id="message" name="message" as="textarea" class="form-control" cols="25" rows="4">
                </vee-field>
                <error-message name="message" class="text-danger"></error-message>
              </div>
              <div class="modal-footer mt-3">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary">確認</button>
              </div>
            </VeeForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
