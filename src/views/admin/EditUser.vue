<script>
import api from '@/api';
export default {
  data() {
    return {
      user: {},
      maTaiKhoan: this.$route.params.maTaiKhoan,   
    };
  },
  methods: {
    async editUser() {
      try {
        await api.put("/tai-khoan/", this.user);
        alert("Chỉnh sửa thành công!");
        this.$router.push({ name: "admin-user" });
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Chỉnh sửa thất bại!");
      }
    },
    async getUser() {
      try {
        const response = await api.get(`/tai-khoan/${this.maTaiKhoan}`);
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<template>
  <section class="">
    <div class="container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'admin'}">Quản lý</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'admin-user'}">Tài khoản</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa</li>
      </ol>
    </nav>
      <div class="row">
        <div class="col-lg-12">
          <div class="card p-2">
            <div class="card-title">
              <h3 class="p-3">Chỉnh sửa tài khoản</h3>
            </div>
            <div class="card-body">
              <div
                class="row d-flex justify-content-center align-items-center h-100"
              >
                <div class="col col-xl-10">
                  <form @submit.prevent="editUser">
                    <div class="mb-3">
                      <label for="name" class="form-label">Tên đăng nhập <span class="text-danger">*</span></label>
                      <input
                        type="text"
                        v-model="user.tenDangNhap"
                        id="name"
                        class="form-control"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                      <input
                        type="text"
                        v-model="user.email"
                        id="email"
                        class="form-control"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="phone" class="form-label"
                        >Số điện thoại <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="user.soDienThoai"
                        id="phone"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="tenNhanVien" class="form-label"
                        >Tên tài khoản <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="user.tenTaiKhoan"
                        id="tenNhanVien"
                        class="form-control"
                      />
                    </div>
                    <label for="" class="form-label"
                        >Quyền <span class="text-danger">*</span></label
                      >
                    <select
                      v-model="user.quyen"
                      class="form-select no-outline"
                      required
                    >
                      <option value="ROLE_MANAGER">Quản lý khu du lịch</option>
                      <option value="ROLE_STAFF">Nhân viên khu du lịch</option>
                      <option value="ROLE_USER">Người dùng</option>
                    </select>
                    <button
                      type="submit"
                      style="float: right"
                      class="btn btn-success mt-3"
                    >
                      Lưu thông tin
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
label {
  color: #7d7d7d;
}
</style>