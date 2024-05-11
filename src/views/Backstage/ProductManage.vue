<script>
import CreateProductModal from '@/components/modal/CreateProductModal.vue';
import DelProductModal from '@/components/modal/DelProductModal.vue';
import EditProductModal from '@/components/modal/EditProductModal.vue';
import StarRating from 'vue-star-rating';
const url = `${import.meta.env.VITE_API_URL}`;
export default {
  data() {
    return {
      products: [],
      pagination: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
        category: '',
      },
      deleteData: {},
      editData: {},
      isLoadding: false,
    };
  },
  components: {
    CreateProductModal,
    EditProductModal,
    DelProductModal,
    StarRating,
  },
  computed: {
    reversedProducts() {
      return [...this.products].reverse();
    },
    loadingHeigh() {
      if (this.isLoadding) {
        return {
          height: `100px`,
        };
      } else {
        return {
          height: `inherit`,
        };
      }
    },
  },
  methods: {
    async getProducts() {
      this.isLoadding = true;
      try {
        let response = await this.$http.get(`${url}/admin/products`);
        this.products = response.data.products;
        this.isLoadding = false;
      } catch (error) {
        alert(`${error.response.data.message}`);
        this.isLoadding = false;
      }
    },
    updateProduct(newProdcut) {
      /*由於新增及編輯用的板型是一樣的，所以在emit回來後用同一個function即可
        所以這裡直接在emit回來的資料設置一個edit的key，來判斷資料是從新增的版型進來的還是編輯的版型
      */
      if (newProdcut.edit) {
        const index = this.products.findIndex((item) => {
          return item.id === newProdcut.id;
        });
        delete newProdcut.edit;
        this.products[index] = { ...newProdcut };
        this.editData = {};
      } else {
        this.products.push(newProdcut);
      }
    },
    openDelModal(id, title) {
      this.$refs.delProductModal.showModal();
      const index = this.products.findIndex((item) => {
        return item.id === id;
      });
      this.deleteData = { id, index, title };
    },
    openEditModal(id) {
      this.$refs.editProductModal.showModal();
      const index = this.products.findIndex((item) => {
        return item.id === id;
      });
      this.products.forEach((item) => {
        if (item.id === id) {
          this.editData = JSON.parse(JSON.stringify(item));
        }
      });
    },
    deleteProduct(confirmDeleteData) {
      const index = this.products.findIndex((item) => {
        return item.id === confirmDeleteData.id;
      });
      if (index !== -1) {
        this.products.splice(confirmDeleteData.index, 1);
      }
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="150">評價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody class="vl-parent" :style="loadingHeigh">
      <LoadingGlobal
        v-model:active="isLoadding"
        :can-cancel="true"
        :color="'blue'"
        :is-full-page="false"
        :loader="`dots`"
      ></LoadingGlobal>
      <tr v-for="(product, index) in reversedProducts" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-start">{{ product.origin_price }}</td>
        <td class="text-start">{{ product.price }}</td>
        <td class="text-start">
          <StarRating
            v-model:rating="product.rating"
            :star-size="14"
            :show-rating="false"
            :rounded-corners="true"
            :border-width="3"
            :padding="2"
            :read-only="true"
          />
        </td>
        <td>
          <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td class="py-1">
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="openEditModal(product.id)">
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelModal(product.id, product.title)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="$refs.createProductModal.showModal()">建立新的產品</button>
  </div>
  <!-- Modal -->
  <CreateProductModal ref="createProductModal" @createNewData="updateProduct"> </CreateProductModal>
  <EditProductModal ref="editProductModal" :editData="editData" @confirmEditData="updateProduct"></EditProductModal>
  <DelProductModal ref="delProductModal" :delData="deleteData" @confirmDeleteData="deleteProduct"></DelProductModal>

  <!-- Modal -->
</template>

<style lang="scss" scoped></style>
