<template>
  <main>
    <section>
      <div class="container mt-5 mb-5">
        <div class="row d-flex justify-content-center align-items-center p-5">
          <div class="col-6">
            <div class="card p-3">
              <div class="card-body">
                <h4 class="card-title">Đổi mật khẩu</h4>
                <form @submit.prevent="changePassword">
                  <div class="row g-3 mb-2">
                    <div class="col-12">
                      <label for=""
                        >Mật khẩu cũ <span class="text-danger">*</span></label
                      >
                      <input
                        class="form-control"
                        :type="showPassword1 ? 'text' : 'password'"
                        v-model="oldPassword"
                        placeholder="Vui lòng nhập mật khẩu cũ"
                        required
                      />
                      <span class="toggle-password" @click="togglePassword1">
                          <i
                            :class="
                              showPassword1 ? 'fas fa-eye-slash' : 'fas fa-eye'
                            "
                          ></i>
                        </span>
                    </div>
                    <div class="col-12">
                      <label for=""
                        >Mật khẩu mới <span class="text-danger">*</span></label
                      >
                      <input
                        class="form-control"
                        :type="showPassword2 ? 'text' : 'password'"
                        v-model="newPassword"
                        placeholder="Vui lòng nhập mật khẩu mới"
                        required
                      />
                      <span class="toggle-password" @click="togglePassword2">
                          <i
                            :class="
                              showPassword2 ? 'fas fa-eye-slash' : 'fas fa-eye'
                            "
                          ></i>
                        </span>
                    </div>
                    <div class="col-12">
                      <label for="">Xác nhận mật khẩu mới <span class="text-danger">*</span></label>
                      <input
                        class="form-control"
                        :type="showPassword3 ? 'text' : 'password'"
                        v-model="passwordConfirm"
                        placeholder="Vui lòng nhập lại mật khẩu mới"
                        required
                      />
                      <span class="toggle-password" @click="togglePassword3">
                          <i
                            :class="
                              showPassword3 ? 'fas fa-eye-slash' : 'fas fa-eye'
                            "
                          ></i>
                        </span>
                    </div>
                  </div>
                  <Spinner v-if="loading" class="float-end"/>
                  <button v-else class="btn btn-success float-end mt-3" type="submit">
                    Xác nhận
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
import bcrypt from "bcryptjs";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      passwordConfirm: "",
      account: {},
      oldPassword: "",
      newPassword: "",
      showPassword1: false,
      showPassword2: false,
      showPassword3: false,
      loading: false,
    };
  },
  methods: {
    async changePassword() {
      this.loading = true;
      try {
        if (this.newPassword !== this.passwordConfirm) {
          alert("Mật khẩu không khớp!");
          return;
        }
        const isOldPasswordCorrect = await bcrypt.compare(
          this.oldPassword,
          this.account.matKhau
        );
        if (!isOldPasswordCorrect) {
          alert("Mật khẩu cũ không đúng!");
          return;
        }

        const isSameAsOld = await bcrypt.compare(
          this.newPassword,
          this.account.matKhau
        );
        if (isSameAsOld) {
          alert("Mật khẩu mới không được giống mật khẩu cũ!");
          return;
        }
        const response = await api.post(
          "/tai-khoan/doi-mat-khau?password=" + this.newPassword
        );
        if (response.status === 200) {
          alert("Đổi mật khẩu thành công!");
          this.$router.push({ name: "trang-chu" });
        } else {
          alert("Đổi mật khẩu thất bại!");
        }
      } catch (error) {
        console.error(error);
      } 
      finally {
        this.loading = false;
      }
    },
    async getInfo() {
      try {
        await api.get("/tai-khoan/xem-thong-tin").then((response) => {
          this.account = response.data;
          console.log(response);
        });
      } catch (error) {
        console.error(error);
      }
    },
    togglePassword1() {
      this.showPassword1 = !this.showPassword1;
    },
    togglePassword2() {
      this.showPassword2 = !this.showPassword2;
    },
    togglePassword3() {
      this.showPassword3 = !this.showPassword3;
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>
<style scoped>
.toggle-password {
  position: absolute;
  top: 57%;
  right: 60px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
  z-index: 2;
}
@media screen and (max-width: 768px) {
  .toggle-password {
    right: 36px;
    top: 56%;
  }
}
</style>