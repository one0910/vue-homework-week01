<script>
import { mapState } from 'pinia';
import { useCartStore } from '@/stores/cart';
import Swal from 'sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import FormModal from '@/components/FormModal.vue';

const url = `${import.meta.env.VITE_API_URL}`;
const AlertPopUp = Swal.mixin({
  position: 'center',
  icon: 'warning',
  showDenyButton: true,
  showConfirmButton: true,
  allowOutsideClick: false,
  confirmButtonText: '刪除',
  denyButtonText: '先不要',
});
export default {
  data() {
    return {
      cartList: [],
      isLoading: false,
    };
  },
  components: {
    Loading,
    FormModal,
  },
  methods: {
    async numChange(index, id) {
      const item = this.cartList.find((item) => item.id === id);
      if (item) {
        item.disabled = true;
        try {
          await this.$http.put(`${url}/cart/${id}`, {
            data: {
              product_id: item.product_id,
              qty: item.qty,
            },
          });
          item.total = item.qty * item.product.price;
          item.final_total = item.qty * item.product.price;
          item.disabled = false;
          this.cartOder[index] = item;
        } catch (error) {
          console.error('error => ', error);
          item.disabled = false;
        }
      }
    },
    delItem(item, index) {
      if (item === 'clearCart' && this.cartList.length > 0) {
        AlertPopUp.fire({
          title: `是否要從購物車所有內容`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;

            try {
              await this.$http.delete(`${url}/carts`);
              this.cartList = [];
              this.cartOder.splice(0, this.cartOder.length);
              this.isLoading = false;
            } catch (error) {
              console.error('error =>', error);
              this.isLoading = false;
            }
          }
        });
      } else if (item.id) {
        AlertPopUp.fire({
          title: `是否要從購物車刪除項目${item.product.title}`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            item.disabled = true;
            try {
              await this.$http.delete(`${url}/cart/${item.id}`);
              this.cartList.splice(index, 1);
              this.cartOder.splice(index, 1);
            } catch (error) {
              console.error('error =>', error);
              item.disabled = false;
            }
          } else {
            this.cartList[index]['qty'] = 1;
          }
        });
      } else {
        return;
      }
    },
    openFormModal() {
      this.$refs.orderFormModal.showModal();
    },
    orderHandler(iscompelete) {
      if (iscompelete) {
        this.cartList = [];
        this.cartOder.splice(0, this.cartOder.length);
      }
    },
  },
  computed: {
    ...mapState(useCartStore, ['cartOder']),
    total() {
      return this.cartList.reduce((acc, cur) => {
        return acc + cur['final_total'];
      }, 0);
    },
  },
  watch: {
    cartList: {
      deep: true,
      handler(newVal) {
        newVal.forEach((item, index) => {
          if (item.qty === 0) {
            this.cartList[index]['qty'] = 1;
            AlertPopUp.fire({
              title: `是否要從購物車刪除項目${item.product.title}`,
            }).then(async (result) => {
              if (result.isConfirmed) {
                item.disabled = true;
                try {
                  await this.$http.delete(`${url}/cart/${item.id}`);
                  this.cartList.splice(index, 1);
                  this.cartOder.splice(index, 1);
                } catch (error) {
                  console.error('error =>', error);
                  item.disabled = false;
                }
              } else {
                this.cartList[index]['qty'] = 1;
              }
            });
          }
        });
      },
    },
  },
  mounted() {
    this.cartList = this.cartOder.map((item) => ({
      ...item,
      disabled: false, // 初始时所有项都不禁用
    }));
  },
};
</script>

<template>
  <div class="container">
    <div class="mt-2">
      <div class="text-end mb-2">
        <button class="btn btn-outline-danger btn-sm" type="button" @click="delItem('clearCart')">清空購物車</button>
      </div>
      <table class="table table-sm vl-parent">
        <Loading
          v-model:active="isLoading"
          :can-cancel="true"
          :color="`#1572fc`"
          :is-full-page="false"
          :loader="`dots`"
        />
        <thead class="table-light">
          <tr>
            <th scope="col" width="160">商品名稱</th>
            <th scope="col" width="130">數量/單位</th>
            <th scope="col" width="120">價格</th>
            <th scope="col" width="100"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartList" :key="item.id">
            <td>{{ item['product'].title }}</td>
            <td>
              <input
                type="number"
                v-model.number="item['qty']"
                :disabled="item.disabled"
                @change="numChange(index, item.id)"
                class="me-2"
              />
              <img src="../assets/loading.svg" width="26" alt="loading" v-if="item.disabled" />
            </td>
            <td>{{ item['total'] }}</td>
            <td scope="col" class="text-center">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="delItem(item, index)">刪除</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"></td>
            <td>總計:{{ total }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="text-end mb-2">
      <button class="btn btn-dark btn-sm" type="button" @click="openFormModal()" :disabled="cartList.length === 0">
        下一步
      </button>
    </div>
  </div>

  <!-- Form Modal -->
  <FormModal ref="orderFormModal" @compeleteOrder="orderHandler"></FormModal>
</template>

<style lang="scss" scoped>
input[type='number'] {
  &:disabled {
    background: #eee;
  }
}
</style>
