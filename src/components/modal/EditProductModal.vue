<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import StarRating from 'vue-star-rating';
import Loading from '@/components/Loading.vue';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  props: ['editData'],
  emits: ['confirmEditData'],
  components: {
    StarRating,
    Loading,
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    async confirmEdit() {
      this.isLoading = true;
      this.$emit('confirmEditData', { ...this.$props.editData, edit: true });
      const url = `${import.meta.env.VITE_APP_BASE_URL}/api/japanbread/admin/product`;
      const productId = this.$props.editData.id;
      try {
        let response = await this.$http.put(`${url}/${productId}`, {
          data: {
            ...this.$props.editData,
          },
        });
        Swal.fire({
          title: `${response.data.message}`,
          icon: 'success',
        });
        this.isLoading = false;
      } catch (error) {
        alert(`${error.response.data.message}`);
        this.isLoading = false;
      }
      this.hideModal();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.editProductModal);
  },
};
</script>

<template>
  <Loading :isActive="isLoading" />
  <div
    id="editProductModal"
    ref="editProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="editProductModalLabel" class="modal-title">
            <span>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label"></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="$props.editData.imageUrl"
                  />
                </div>
                <img class="img-fluid" :src="$props.editData.imageUrl" alt="" />
              </div>
              <div>
                <button class="btn btn-outline-primary btn-sm d-block w-100">新增圖片</button>
              </div>
              <div>
                <button class="btn btn-outline-danger btn-sm d-block w-100">刪除圖片</button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="$props.editData.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="$props.editData.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="$props.editData.unit"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="$props.editData.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="$props.editData.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="$props.editData.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="$props.editData.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">產品評價</label>
                <StarRating
                  v-model:rating="$props.editData.rating"
                  :star-size="18"
                  :rounded-corners="true"
                  :border-width="3"
                  :padding="2"
                />
              </div>
              <hr />
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="$props.editData.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="confirmEdit()">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
