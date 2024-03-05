<script>
export default {};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-2">
        <nav class="navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item border-bottom">
              <router-link class="nav-link" :to="{ name: 'productManage' }">產品管理</router-link>
            </li>
            <li class="nav-item border-bottom">
              <router-link class="nav-link" :to="{ name: 'orderManage' }">訂單管理</router-link>
            </li>
            <li class="nav-item border-bottom">
              <router-link class="nav-link" :to="{ name: 'cuponManage' }">優惠卷管理</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link border-bottom" :to="{ name: 'postManage' }">貼文管理</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
