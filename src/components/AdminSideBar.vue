<script>
export default {
}
</script>
<template>
    <main>
        <h3 class="pb-2"><i class="fa-solid fa-list-ul pe-3"></i>Danh mục quản lý</h3>
          <ul class="list-unstyled templatemo-accordion ps-5">
            <li class="">
              <router-link :to="{name: 'admin-ticket'}"
                class=" text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'admin-ticket'}"
              >
                <i class="fa-solid fa-file-invoice-dollar pe-3" style="min-width: 40px"></i>Vé thuyết minh
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'admin-record'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'admin-record'}"
              >
                <i class="fa-solid fa-file pe-3 d-block" style="min-width: 40px"></i>Bản ghi thuyết minh
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'admin-image'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'admin-image'}"
              >
                <i class="fa-solid fa-images pe-3" style="min-width: 40px"></i>Hình ảnh
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'admin-blog'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'admin-blog'}"
              >
                <i class="fa-solid fa-newspaper pe-3" style="min-width: 40px"></i>Bài viết
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'admin-user'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'admin-user'}"
              >
                <i class="fa-solid fa-users pe-3" style="min-width: 40px"></i>Tài khoản
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'admin-comment'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'admin-comment'}"
              >
                <i class="fa-solid fa-comment pe-3" style="min-width: 40px"></i>Đánh giá
              </router-link>
            </li>
          </ul>
    </main>
</template>
<style scoped>
    .active {
        color: #0d6efd !important;
        font-weight: bold;
    }
    li:hover a{
        color: #0d6efd !important;
        font-weight: bold;
    }
</style>