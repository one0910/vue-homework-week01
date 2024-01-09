<script>
export default {
  name: 'ProductDetail',
  props: ['temp']
}
</script>

<template>
  <div class="card mb-3">
    <img :src="temp.imageUrl" class="card-img-top primary-image" alt="主圖" />
    <div class="card-body">
      <h5 class="card-title">
        {{ temp.title }}
        <span class="badge bg-primary ms-2">{{ temp.category }}</span>
      </h5>
      <p class="card-text">商品描述：{{ temp.description }}</p>
      <p class="card-text">商品內容：{{ temp.content }}</p>
      <div class="d-flex">
        <p class="card-text me-2">{{ temp.price }}</p>
        <p class="card-text text-secondary">
          <del>{{ temp.origin_price }}</del>
        </p>
        元 / {{ temp.unit }}
      </div>
    </div>
  </div>
  <template v-if="temp.is_enabled">
    <img :src="temp.imagesUrl[0]" alt="" class="images m-2" />
    <img :src="temp.imagesUrl[1]" alt="" class="images m-2" />
  </template>
</template>

<style lang="scss" scoped></style>
