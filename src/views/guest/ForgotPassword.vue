<template>
  <main>
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style="border-radius: 1rem">
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src=""
                    alt="login form"
                    class="img-fluid"
                    style="border-radius: 1rem 0 0 1rem"
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form
                      v-if="this.token === null"
                      @submit.prevent="handleLogin"
                    >
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <span class="h1 fw-bold mb-0">Thuyết minh tự động</span>
                      </div>

                      <h5
                        class="fw-normal mb-3 pb-3"
                        style="letter-spacing: 1px"
                      >
                        Quên mật khẩu
                      </h5>

                      <div data-mdb-input-init class="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          class="form-control form-control-lg"
                          v-model="email"
                        />
                        <label class="form-label" for="form2Example17"
                          >Vui lòng nhập email đã đăng ký</label
                        >
                      </div>

                      <div class="pt-1 mb-4">
                        <Spinner v-if="loading" />
                        <button
                          v-else
                          data-mdb-button-init
                          data-mdb-ripple-init
                          class="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Gửi yêu cầu đến email
                        </button>
                      </div>
                    </form>
                    <form v-else @submit.prevent="changePassword">
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <span class="h1 fw-bold mb-0">Thuyết minh tự động</span>
                      </div>

                      <h5
                        class="fw-normal mb-3 pb-3"
                        style="letter-spacing: 1px"
                      >
                        Đặt lại mật khẩu
                      </h5>

                      <div data-mdb-input-init class="form-outline mb-4">
                        <input
                          type="password"
                          class="form-control form-control-lg"
                          v-model="newPassword"
                        />
                        <label class="form-label" for="form2Example17"
                          >Mật khẩu mới</label
                        >
                      </div>
                      <div data-mdb-input-init class="form-outline mb-4">
                        <input
                          type="password"
                          class="form-control form-control-lg"
                          v-model="newPasswordConfirm"
                        />
                        <label class="form-label" for="form2Example17"
                          >Nhập lại mật khẩu</label
                        >
                      </div>

                      <div class="pt-1 mb-4">
                        <Spinner v-if="loading" />
                        <button
                          v-else
                          data-mdb-button-init
                          data-mdb-ripple-init
                          class="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Đặt lại
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
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
      email: "",
      newPassword: "",
      newPasswordConfirm: "",
      token: this.$route.params.token || null,
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const response = await api.get("/tai-khoan/quen-mat-khau", {
          params: {
            email: this.email,
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed");
        }
        alert(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.loading = false;
      }
    },
    async changePassword() {
      this.loading = true;
      if (this.newPassword !== this.newPasswordConfirm) {
        alert("Mật khẩu không khớp!");
        return;
      }
      localStorage.setItem("access_token", this.token);
      try {
        const response = await api.post(
          "/tai-khoan/doi-mat-khau?password=" + this.newPassword
        );

        if (response.status !== 200) {
          throw new Error("Failed");
        }
        alert("Đặt lại mật khẩu thành công!");
        this.$router.push({ name: "login" }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
