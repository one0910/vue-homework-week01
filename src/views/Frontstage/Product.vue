<script>
import ProductDetail from '@/components/ProductDetail.vue';
import { useUserStore } from '@/stores/user';
import { mapState, mapActions } from 'pinia';
import { useCartStore } from '@/stores/cart';
import Cart from '@/components/Cart.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
const url = `${import.meta.env.VITE_API_URL}`;

export default {
  name: 'ProductPage',
  data() {
    return {
      temp: {},
      selectProduct: {},
      products: [],
      isLoadding: false,
    };
  },
  components: {
    ProductDetail,
    Cart,
    Loading,
  },
  computed: {
    ...mapState(useUserStore, ['errorMessage']),
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
        const response = await this.$http.get(`${url}/products/all`);
        this.products = response.data.products;
        this.isLoadding = false;
      } catch (error) {
        console.error('error => ', error);
        this.isLoadding = false;
      }
    },
    ...mapActions(useCartStore, ['addToCart']),
    handDetial(product) {
      this.temp = { ...product };
    },
  },
  mounted() {
    this.getProducts();
    console.log('this => ', this);
  },
};
</script>

<template>
  <div class="container">
    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
      {{ errorMessage }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="row py-3">
      <div class="col-md-6">
        <h2>產品列表</h2>
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th width="170">產品名稱</th>
              <th width="90">原價</th>
              <th width="90">售價</th>
              <th width="170">加到購物車</th>
              <th width="100" style="text-align: center">數量</th>
              <th width="130">查看細節</th>
            </tr>
          </thead>
          <tbody class="vl-parent" :style="loadingHeigh">
            <template v-for="product in products" :key="product.id">
              <tr>
                <td width="170">{{ product.title }}</td>
                <td width="90">{{ product.origin_price }}</td>
                <td width="90">{{ product.price }}</td>
                <Cart :prodcut="product" />
                <td width="130">
                  <button type="button" class="btn btn-primary" @click="handDetial(product)">查看細節</button>
                </td>
              </tr>
            </template>
            <loading
              v-model:active="isLoadding"
              :can-cancel="true"
              :color="'blue'"
              :is-full-page="false"
              :loader="`dots`"
            />
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <ProductDetail v-bind:temp="temp" v-if="temp.is_enabled" />
        <p class="text-secondary">請選擇一個商品查看</p>
      </div>
    </div>
  </div>
</template>
