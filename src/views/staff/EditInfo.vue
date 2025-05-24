<template>
  <main>
    <section>
      <div class="container mt-5 mb-5">
        <div class="row d-flex justify-content-center align-items-center p-5">
          <div class="col-6">
            <div class="card p-3">
              <div class="card-body">
                <h4 class="card-title">Chỉnh sửa thông tin</h4>
                <form @submit.prevent="editStaff" v-if="staff.taiKhoan">
                  <div class="row g-3 mb-2">
                    <div class="col-12">
                      <label for="">Họ và tên <span class="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="staff.tenNhanVien"
                        placeholder="Họ và tên"
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label for="">Email <span class="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="email"
                        v-model="staff.taiKhoan.email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label for="">Số điện thoại <span class="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="tel"
                        v-model="staff.taiKhoan.soDienThoai"
                        placeholder="Số điện thoại"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </div>
                  <Spinner v-if="loading" class="float-end" />
                  <button v-else class="btn btn-success float-end mt-3" type="submit">
                    Lưu thông tin
                  </button>
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
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      staff: {
        tenNhanVien: "",
        taiKhoan: {
          email: "",
          soDienThoai: "",
          loading: false,
        },
      },
    };
  },
  methods: {
    getStaff() {
      try {
        api.get("/nhan-vien/xem-thong-tin").then((response) => {
          this.staff = response.data;
          console.log(response);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async editStaff() {
      this.loading = true;
      try {
        await api.put("/nhan-vien/", this.staff).then((response) => {
          if (response.status === 200) {
            alert("Chỉnh sửa thông tin thành công!");
            this.$router.push({ name: "trang-chu" });
          } else {
            alert("Chỉnh sửa thông tin thất bại!");
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getStaff();
  },
};
</script>