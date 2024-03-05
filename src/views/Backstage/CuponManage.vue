<script>
import { mapActions } from 'pinia';
import { useToastMessageStore } from '@/stores/toastMessage';
import DelProductModal from '@/components/modal/DelProductModal.vue';
import CupponModal from '@/components/modal/CupponModal.vue';
const url = `${import.meta.env.VITE_API_URL}`;
export default {
  data() {
    return {
      isLoading: false,
      coupons: [],
      deleteData: {},
      cupponProps: {},
      isNew: false,
    };
  },
  components: {
    DelProductModal,
    CupponModal,
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
    async getCupons(disable) {
      disable === false ? (this.isLoading = false) : (this.isLoading = true);
      try {
        let response = await this.$http.get(`${url}/admin/coupons`);
        this.coupons = response.data.coupons;
        this.isLoading = false;
      } catch (error) {
        this.pushMessage({
          style: 'fail',
          title: error.response.data.message,
        });
        this.isLoading = false;
      }
    },
    openDelModal(coupon) {
      this.$refs.delProductModal.showModal();
      this.deleteData = coupon;
    },
    openCupponModal(isNew, coupon) {
      if (!isNew) {
        this.isNew = false;
        this.cupponProps = { ...coupon };
      } else {
        this.isNew = true;
        this.cupponProps = {};
      }
      this.$refs.cupponModal.toggleLoading(false);
      this.$refs.cupponModal.showModal();
    },
    async updateCoupon(cupponData) {
      this.$refs.cupponModal.toggleLoading(true);
      let apiUrl = `${url}/admin/coupon`;
      let httpMethod = 'post';
      let data = cupponData;
      if (cupponData.id) {
        apiUrl = `${url}/admin/coupon/${cupponData.id}`;
        httpMethod = 'put';
        data = cupponData;
      }
      try {
        let response = await this.$http[httpMethod](apiUrl, { data: data });
        await this.getCupons(false);
        this.$refs.cupponModal.toggleLoading(false);
        this.$refs.cupponModal.hideModal();
        this.pushMessage({
          style: 'success',
          title: response.data.message,
        });
      } catch (error) {
        this.$refs.cupponModal.hideModal();
        this.$refs.cupponModal.toggleLoading(false);
        this.pushMessage({
          style: 'danger',
          title: error.response.data.message,
        });
      }
      // this.$refs.cupponModal.hideModal();
    },
    async deleteCupon({ id }) {
      this.isLoading = true;
      try {
        await this.$http.delete(`${url}/admin/coupon/${id}`);
        await this.getCupons();
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
  },
  mounted() {
    this.getCupons();
  },
};
</script>
<template>
  <table class="table">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
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
        :opacity="0.8"
      ></LoadingGlobal>
      <tr v-for="(coupon, key) in coupons" :key="key">
        <td>{{ coupon.title }}</td>
        <td>{{ coupon.percent }}%</td>
        <td>{{ $filters.date(coupon.due_date) }}</td>
        <td>
          <span v-if="coupon.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td class="py-1">
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="openCupponModal(false, coupon)">
              編輯
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelModal(coupon)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openCupponModal(true)">建立新的優惠卷</button>
  </div>
  <CupponModal ref="cupponModal" :coupon="cupponProps" :isNew="isNew" @updateCouponEmit="updateCoupon"></CupponModal>
  <DelProductModal ref="delProductModal" :delData="deleteData" @confirmDeleteData="deleteCupon"></DelProductModal>
</template>

<style lang="scss" scoped></style>
import { data } from 'cypress/types/jquery';import { getCurrentInstance } from 'vue';
