<script>
import CreateProductModal from '@/components/CreateProductModal.vue'
import DelProductModal from '@/components/DelProductModal.vue'
import EditProductModal from '@/components/EditProductModal.vue'
export default {
  data() {
    return {
      products: [
        {
          category: '冷凍麵包',
          content:
            '焦糖色的麵團中加入了來自北海道的惠比壽南瓜，甜味濃鬱。\n加入南瓜丁和核桃來強調質地。\n麵包本身的甜度適中，但添加了少量的黃油和蜂蜜，味道簡單卻又深沉。\n這種麵包非常適合日常餐桌捲，例如早餐的沙拉和湯，以及晚餐的肉類和魚類菜餚。 ',
          description: '北海道惠比壽南瓜製作的核桃麵包',
          id: '-Np13XNVqvMWtaB6A70V',
          imageUrl: 'https://i.imgur.com/6wlFgrF.png',
          imagesUrl: [
            'https://i.imgur.com/DGbw3n2.jpg',
            'https://i.imgur.com/EohsVnN.jpg',
            'https://i.imgur.com/p6nelV5.jpg',
            'https://i.imgur.com/bxYeOqZ.jpg',
            ''
          ],
          is_enabled: 1,
          origin_price: 300,
          price: 234,
          title: '南瓜核桃麵包',
          unit: '2',
          num: 1
        },
        {
          category: '冷凍麵包',
          content:
            '我們在麵團中加入了大量的巧克力片，帶有淡淡的濃縮咖啡香味。 適合成年人的巧克力麵包，具有濃縮咖啡和巧克力的香氣，並且還添加了核桃作為口感的重點。 讓您平時的咖啡休息時間或早餐變得更豐富、更有品質。 ',
          description: '香氣濃鬱的濃縮咖啡',
          id: '-Np11YvFhY3dK6gi5Gvo',
          imageUrl: 'https://i.imgur.com/QmwHaBJ.png',
          imagesUrl: [
            'https://i.imgur.com/z3z7ydR.jpg',
            'https://i.imgur.com/kGpeK8D.jpg',
            'https://i.imgur.com/CVzHGkN.jpg',
            'https://i.imgur.com/G6dY0pp.jpg',
            'https://i.imgur.com/BnFBUYu.jpg'
          ],
          is_enabled: 1,
          origin_price: 300,
          price: 234,
          title: '咖啡巧克力麵包',
          unit: '2',
          num: 2
        },
        {
          category: '冷凍麵包',
          content:
            '100%牛奶製成，濃鬱的奶香讓人真切感受到。 這種濕潤、柔軟、帶有天然甜味的麵包適合作為早餐並開始新的一天。  ',
          description: '100%北海道牛奶製成的高級牛奶麵包 ',
          id: '-Np10Jkf-lMyvfHWICtb',
          imageUrl: 'https://i.imgur.com/my1Vild.png',
          imagesUrl: [
            'https://i.imgur.com/SV3KFLP.jpg',
            'https://i.imgur.com/76Vn0nw.jpg',
            'https://i.imgur.com/NNjLI4K.jpg',
            'https://i.imgur.com/h10qBYU.jpg',
            'https://i.imgur.com/y14r6lH.jpg'
          ],
          is_enabled: 1,
          origin_price: 300,
          price: 234,
          title: '牛奶麵包',
          unit: '2',
          num: 3
        },
        {
          category: '冷凍麵包',
          content:
            '雖然看起來像硬麵包，但實際上鬆軟可口，是全麥麵粉桐生酵母麵包，非常適合餐食麵包或咖啡廳午餐。 \n「桐生酵母」對麵包麵團具有優異的保濕性，經過長時間的發酵，可以帶出小麥的甜味，製作出味道清淡的麵包。 ',
          description: '全麥麵粉桐生酵母麵包',
          id: '-Np0z9PxsDwsUci7jPsS',
          imageUrl: 'https://i.imgur.com/TJC2Yab.png',
          imagesUrl: [
            'https://i.imgur.com/S2fuwtN.jpg',
            'https://i.imgur.com/s6vmJBI.jpg',
            'https://i.imgur.com/10fxeDp.jpg',
            'https://i.imgur.com/eIa7poh.jpg',
            'https://i.imgur.com/jMXYkGk.jpg'
          ],
          is_enabled: 1,
          origin_price: 958,
          price: 1200,
          title: '桐生酵母全麥麵包',
          unit: '8',
          num: 4
        },
        {
          category: '冷凍麵包',
          content:
            '可以享受烹飪樂趣的米粉麵包。 它看起來與Natur相似，但尺寸稍小，並且使用米粉。 這款簡單的麵包以國產小麥為主要原料，將米粉和糯米粉混合烘焙而成，口感有嚼勁。 ',
          description: '自製酵母將小麥的甜味的小麵包',
          id: '-Np0wNqjW8uSfckx4SEx',
          imageUrl: 'https://i.imgur.com/3LXkkzl.png',
          imagesUrl: [
            'https://i.imgur.com/2iqql3M.jpg',
            'https://i.imgur.com/gwIpwQa.jpg',
            'https://i.imgur.com/z2UQioA.jpg',
            'https://i.imgur.com/ZNCyI7S.jpg',
            'https://i.imgur.com/oOkvSAq.jpg'
          ],
          is_enabled: 1,
          origin_price: 500,
          price: 384,
          title: '小米麵包',
          unit: '4',
          num: 5
        },
        {
          category: '冷凍麵包',
          content:
            '麵團中加入了大量的栗子糖霜而不是糖，栗子的微甜香氣與核桃的濃鬱口感相得益彰，讓這款小巧的麵包成為您可以享受的精緻風味',
          description: '用栗子糖霜和核桃製成的小麵包的柔和甜味 ',
          id: '-Np0s_RGK9S83twKZ8kk',
          imageUrl: 'https://i.imgur.com/b8GLdRh.png',
          imagesUrl: [
            'https://i.imgur.com/P0hmDa4.jpg',
            'https://i.imgur.com/U8NMuQU.jpg',
            'https://i.imgur.com/U7fRP8N.jpg',
            'https://i.imgur.com/xSLQNkw.jpg',
            'https://i.imgur.com/bjKw0QB.jpg'
          ],
          is_enabled: 1,
          origin_price: 551,
          price: 700,
          title: '栗子核桃小麵包',
          unit: '4',
          num: 6
        },
        {
          category: '冷凍麵包',
          content:
            '用蜂蜜和豆漿製成的柔軟耐嚼的麵包。 你可以感受到蜂蜜的香味和溫柔的甜味。 這種麵包很適合搭配肉類菜餚。\n*包裝與超市銷售的產品不同，但裡面的麵包是一樣的。 ',
          description: '採用100%國產大豆和蜂蜜製成的豆漿，具有獨特的香氣 ',
          id: '-Np0oG6AHU5ZK9BMX7cd',
          imageUrl: 'https://i.imgur.com/CsCUDtl.png',
          imagesUrl: [
            'https://i.imgur.com/ynn0C2H.jpg',
            'https://i.imgur.com/kGnMU8V.jpg',
            'https://i.imgur.com/4hw0Hgu.jpg',
            'https://i.imgur.com/k1ZqIIc.jpg',
            'https://i.imgur.com/tVD33Xi.jpg'
          ],
          is_enabled: 1,
          origin_price: 211,
          price: 399,
          title: '蜂蜜豆奶麵包',
          unit: '2',
          num: 7
        },
        {
          category: '冷凍麵包',
          content:
            '這是一款100%國產小麥製成的天然餐點麵包，讓您享受小麥的天然風味。 這種麵包外脆內軟，適合搭配任何菜餚。\n*包裝與超市銷售的產品不同，但裡面的麵包是一樣的',
          description: '100%小麥製成的純麥風味麵包',
          id: '-Nowy9bSUWhNXQXT4S38',
          imageUrl: 'https://i.imgur.com/4UTHBFH.png',
          imagesUrl: [
            'https://i.imgur.com/g0p5FYz.jpg',
            'https://i.imgur.com/kw1KVLf.jpg',
            'https://i.imgur.com/PkgnKMP.jpg',
            'https://i.imgur.com/qAHDiCh.jpg',
            'https://i.imgur.com/MwENfjI.jpg'
          ],
          is_enabled: 1,
          origin_price: 400,
          price: 229,
          title: '國產小麥麵包',
          unit: '2',
          num: 8
        }
      ],
      pagination: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
        category: ''
      },
      deleteData: {},
      editData: {}
    }
  },
  components: {
    CreateProductModal,
    EditProductModal,
    DelProductModal
  },
  computed: {
    reversedProducts() {
      return [...this.products].reverse()
    }
  },
  methods: {
    async getProducts() {
      const api = `${import.meta.env.VITE_APP_BASE_URL}`
      try {
        let response = await this.$http.get(`${import.meta.env.VITE_APP_BASE_URL}/admin/signin`)
      } catch (error) {
        console.log(' error=> ', error)
      }
    },
    updateProduct(newProdcut) {
      /*由於新增及編輯用的板型是一樣的，所以在emit回來後用同一個function即可
        所以這裡直接在emit回來的資料設置一個edit的key，來判斷資料是從新增的版型進來的還是編輯的版型
      */
      if (newProdcut.edit) {
        const index = this.products.findIndex((item) => {
          return item.id === newProdcut.id
        })
        delete newProdcut.edit
        this.products[index] = { ...newProdcut }
        this.editData = {}
      } else {
        this.products.push(newProdcut)
      }
    },
    openDelModal(id, title) {
      this.$refs.delProductModal.showModal()
      const index = this.products.findIndex((item) => {
        return item.id === id
      })
      this.deleteData = { id, index, title }
    },
    openEditModal(id) {
      this.$refs.editProductModal.showModal()
      const index = this.products.findIndex((item) => {
        return item.id === id
      })
      this.products.forEach((item) => {
        if (item.id === id) {
          this.editData = JSON.parse(JSON.stringify(item))
        }
      })
    },
    deleteProduct(confirmDeleteData) {
      const index = this.products.findIndex((item) => {
        return item.id === confirmDeleteData.id
      })
      if (index !== -1) {
        this.products.splice(confirmDeleteData.index, 1)
      }
    }
  },
  mounted() {}
}
</script>

<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="$refs.createProductModal.showModal()">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in reversedProducts" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-start">{{ product.origin_price }}</td>
          <td class="text-start">{{ product.price }}</td>
          <td>
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openEditModal(product.id)"
              >
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
  </div>
  <!-- Modal -->
  <CreateProductModal ref="createProductModal" @createNewData="updateProduct"> </CreateProductModal>
  <EditProductModal
    ref="editProductModal"
    :editData="editData"
    @confirmEditData="updateProduct"
  ></EditProductModal>
  <DelProductModal
    ref="delProductModal"
    :delData="deleteData"
    @confirmDeleteData="deleteProduct"
  ></DelProductModal>

  <!-- Modal -->
</template>

<style lang="scss" scoped></style>
