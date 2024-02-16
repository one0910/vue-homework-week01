import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
import axios from 'axios'
const url = `${import.meta.env.VITE_API_URL}`;


export const useCartStore = defineStore('cart', {
  state: () => ({
    cartOder: [],
  }),
  actions: {
    async addToCart(order, callback) {
      const index = this.cartOder.findIndex(item => {
        return item.product_id === order.id
      })
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: "success",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      if (index === -1) {
        const response = await axios.post(`${url}/cart`, {
          data: {
            "product_id": order.id,
            "qty": order.num
          }
        });
        this.cartOder.push(response.data.data)
        // console.log('response => ', response)
        Toast.fire({
          title: "已加入購物車"
        })
      } else {
        this.cartOder[index].qty = order.num
        try {
          await axios.put(`${url}/cart/${this.cartOder[index].id}`, {
            data: {
              product_id: this.cartOder[index].product_id,
              qty: this.cartOder[index].qty,
            },
          });
          callback(false)
        } catch (error) {
          console.error('error => ', error);
          callback(false)
        }
        Toast.fire({
          title: "更新購物車"
        })
      }
      callback(false)
    },

  }
})
