<script>
import { mapActions } from 'pinia';
import { useToastMessageStore } from '@/stores/toastMessage';
import DelProductModal from '@/components/modal/DelProductModal.vue';
import EditOlrderModal from '@/components/modal/EditOlrderModal.vue';
const url = `${import.meta.env.VITE_API_URL}`;
export default {
  data() {
    return {
      orders: [],
      isLoading: false,
      deleteData: {},
      tempOrder: {},
    };
  },
  components: {
    DelProductModal,
    EditOlrderModal,
  },
  computed: {
    loadingHeigh() {
      if (this.isLoading) {
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
    ...mapActions(useToastMessageStore, ['pushMessage']),
    async getOrders(currentPage = 1) {
      this.isLoading = true;
      try {
        let response = await this.$http.get(`${url}/admin/orders?page=${currentPage}`);
        this.orders = response.data.orders;
        this.isLoading = false;
      } catch (error) {
        this.pushMessage({
          style: 'fail',
          title: '訂單連線異常',
          content: error.response.data.message,
        });
        this.isLoading = false;
      }
    },
    async updatePaid(order) {
      this.isLoading = true;
      try {
        const response = await this.$http.put(`${url}/admin/order/${order.id}`, {
          data: { is_paid: order.is_paid },
        });
        this.isLoading = false;

        this.pushMessage({
          style: 'success',
          title: '更新付款狀態',
          content: response.data.message,
        });
      } catch (error) {
        console.log('error=> ', error);
        this.pushMessage({
          style: 'fail',
          title: '更新失敗',
          content: error.response.data.message,
        });
        this.isLoading = false;
      }
    },
    openDelModal(order) {
      this.$refs.delProductModal.showModal();
      this.deleteData = order;
    },
    async deleteOrder({ id }) {
      this.isLoading = true;
      try {
        await this.$http.delete(`${url}/admin/order/${id}`);
        await this.getOrders();
        this.pushMessage({
          style: 'success',
          title: '刪除成功',
        });
      } catch (error) {
        this.pushMessage({
          style: 'fail',
          title: '刪除失敗',
          content: error.response.data.message,
        });
        this.isLoading = false;
      }
    },
    openEditModal(order) {
      this.$refs.editOrderModal.showModal();
      this.tempOrder = order;
    },
    async updateOrder(order) {
      this.$refs.editOrderModal.toogleLoading(true);
      try {
        const response = await this.$http.put(`${url}/admin/order/${order.id}`, {
          data: { is_paid: order.is_paid },
        });
        this.$refs.editOrderModal.hideModal();
        this.$refs.editOrderModal.toogleLoading(false);
        this.pushMessage({
          style: 'success',
          title: '更新付款狀態',
          content: response.data.message,
        });
      } catch (error) {
        console.log('error=> ', error);
        this.pushMessage({
          style: 'fail',
          title: '更新失敗',
          content: error.response.data.message,
        });
        this.$refs.editOrderModal.toogleLoading(false);
      }

      // await this.updatePaid(tempOrder);
      // this.$refs.editOrderModal.hideModal();
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
<template>
  <table class="table">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody class="vl-parent" :style="loadingHeigh">
      <LoadingGlobal
        v-model:active="isLoading"
        :can-cancel="true"
        :color="'blue'"
        :is-full-page="false"
        :loader="`dots`"
        :opacity="0.7"
      ></LoadingGlobal>
      <tr v-for="(order, index) in orders" :key="order.id">
        <td>{{ $filters.date(order.create_at) }}</td>
        <td class="text-truncate" v-if="order.user">{{ order.user.email }}</td>
        <td class="py-1">
          <ul class="list-unstyled">
            <li v-for="product in order.products" :key="product.id">
              {{ product.product.title }} 數量：{{ product.qty }}
              <!-- {{ product.product.unit }} -->
            </li>
          </ul>
        </td>
        <td class="text-right">{{ order.total }}</td>
        <td>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`paidSwitch${order.id}`"
              v-model="order.is_paid"
              @change="updatePaid(order)"
            />
            <label class="form-check-label" :for="`paidSwitch${order.id}`">
              <span v-if="order.is_paid">已付款</span>
              <span v-else>未付款</span>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="openEditModal(order)">編輯</button>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelModal(order)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <DelProductModal ref="delProductModal" :delData="deleteData" @confirmDeleteData="deleteOrder"></DelProductModal>
  <EditOlrderModal ref="editOrderModal" :order="tempOrder" @updateOrder="updateOrder"></EditOlrderModal>
</template>

<style lang="scss" scoped></style>
