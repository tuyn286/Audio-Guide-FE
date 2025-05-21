<script>
export default {
    name: "ManagerSideBar",
}
</script>
<template>
    <main>
        <h3 class="pb-2"><i class="fa-solid fa-list-ul pe-3"></i>Danh mục quản lý</h3>
          <ul class="list-unstyled templatemo-accordion ps-5">
            <li class="">
              <router-link :to="{name: 'manager-ticket'}"
                class=" text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'manager-ticket'}"
              >
                <i class="fa-solid fa-file-invoice-dollar pe-3" style="min-width: 40px"></i>Vé thuyết minh
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'manager-record'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'manager-record'}"
              >
                <i class="fa-solid fa-file pe-3 d-block" style="min-width: 40px"></i>Bản ghi thuyết minh
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'manager-image'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'manager-image'}"
              >
                <i class="fa-solid fa-images pe-3" style="min-width: 40px"></i>Hình ảnh
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'manager-blog'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'manager-blog'}"
              >
                <i class="fa-solid fa-newspaper pe-3" style="min-width: 40px"></i>Bài viết
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'manager-staff'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'manager-staff'}"
              >
                <i class="fa-solid fa-users pe-3" style="min-width: 40px"></i>Tài khoản nhân viên
              </router-link>
            </li>
            <li class="">
              <router-link :to="{name: 'manager-comment'}"
                class="text-decoration-none fs-5 text-body d-flex align-items-center" :class="{'active': $route.name === 'manager-comment'}"
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