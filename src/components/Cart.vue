<script>
import { mapActions } from 'pinia';
import { useCartStore } from '@/stores/cart';
export default {
  data() {
    return {
      prodcutData: JSON.parse(JSON.stringify(this.$props.prodcut)),
      cartLoading: false,
      num: 1,
    };
  },
  props: ['prodcut'],
  methods: {
    ...mapActions(useCartStore, ['addToCart']),
    addCart() {
      this.cartLoading = true;
      this.prodcutData.num = this.num;
      this.addToCart(this.prodcutData, (result) => {
        this.cartLoading = result;
      });
    },
    addNum() {
      this.num += 1;
    },
    removeNum() {
      if (this.num > 1) {
        this.num -= 1;
      }
    },
  },
  mounted() {
    // console.log(' this=> ', this);
  },
};
</script>
<template>
  <td width="170">
    <button type="button" class="btn btn-outline-danger px-2" @click="addCart(prodcutData)">
      <i class="fas fa-spinner fa-pulse" v-show="cartLoading"></i>
      加到購物車
    </button>
  </td>
  <td width="100" style="text-align: center">
    <span role="button" @click="removeNum">&#10094;</span>
    <span class="px-3">{{ num }}</span>
    <span role="button" @click="addNum">&#10095;</span>
  </td>
</template>

<style lang="scss" scoped></style>
