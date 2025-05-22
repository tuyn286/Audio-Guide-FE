<template>
<main>
  <section>
    <div class="container mt-2 mb-5">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'manager'}">Quản lý</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'manager-staff'}">Tài khoản nhân viên</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Thêm mới</li>
      </ol>
    </nav>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-6">
          <div class="card p-2">
            <div class="card-body">
              <h4 class="card-title">Thêm mới nhân viên</h4>
              <form @submit.prevent="addStaff">
                <div class="row g-3 mb-2">
                  <div class="col-12">
                    <label for="">Tên nhân viên <span class="text-danger">*</span></label>
                    <input class="form-control" type="text"  v-model="tenNhanVien" placeholder="Vui lòng nhập tên nhân viên" required>
                  </div>
                  <div class="col-12">
                    <label for="">Tên đăng nhập <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="tenDangNhap" placeholder="Vui lòng nhập tên đăng nhập" required>
                  </div>
                  <div class="col-12">
                    <label for="">Mật khẩu <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="matKhau" placeholder="Vui lòng nhập mật khẩu" required>
                  </div>
                </div>
                <Spinner v-if="loading" />
                  <button v-else class="btn btn-success float-end mt-3" type="submit">Thêm mới</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<script>
import api from '@/api';
import Spinner from '@/components/Spinner.vue';
export default {
  data() {
    return {
      tenNhanVien: '',
      tenDangNhap: '',
      matKhau: '',
      loading: false,
    }
  },
  methods: {
    async addStaff() {
      this.loading = true;
      try {
        await api.post('/nhan-vien/',{
            tenNhanVien: this.tenNhanVien,
            tenDangNhap: this.tenDangNhap,
            matKhau: this.matKhau
        })
        .then(response => {
                alert('Thêm mới nhân viên thành công!');
                this.$router.push({ name: 'manager-staff' });
            })
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>