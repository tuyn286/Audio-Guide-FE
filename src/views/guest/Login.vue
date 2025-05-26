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
                    src="https://audioguidebucket.s3.ap-southeast-1.amazonaws.com/bana.jpg"
                    alt="login form"
                    class="img-fluid"
                    style="border-radius: 1rem 0 0 1rem"
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form @submit.prevent="handleLogin">
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <span class="h1 fw-bold mb-0">Thuyết minh tự động</span>
                      </div>

                      <h5
                        class="fw-normal mb-3 pb-3"
                        style="letter-spacing: 1px"
                      >
                        Đăng nhập tài khoản
                      </h5>
                      <p v-if="msg" class="text-danger">{{ msg }}</p>
                      <div data-mdb-input-init class="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          class="form-control form-control-lg"
                          v-model="username"
                        />
                        <label class="form-label" for="form2Example17"
                          >Tên đăng nhập</label
                        >
                      </div>

                      <div data-mdb-input-init class="form-outline mb-4">
                        <input
                          :type="showPassword ? 'text' : 'password'"
                          id="form2Example27"
                          class="form-control form-control-lg"
                          v-model="password"
                        />
                        <label class="form-label" for="form2Example27"
                          >Mật khẩu</label
                        >
                        <span class="toggle-password" @click="togglePassword">
                          <i
                            :class="
                              showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                            "
                          ></i>
                        </span>
                      </div>
                      <Spinner v-if="loading" />
                      <div class="pt-1 mb-4" v-else>
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          class="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Đăng nhập
                        </button>
                      </div>

                      <router-link
                        class="text-muted"
                        :to="{ name: 'forgot-password' }"
                        >Quên mật khẩu?</router-link
                      >
                      <!-- <p class="mb-5 pb-lg-2" style="color: #393f81">
                        Chưa có tài khoản?
                        <a href="#!" style="color: #393f81">Đăng ký tại đây</a>
                      </p> -->
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
      username: "",
      password: "",
      msg: "",
      showPassword: false,
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const response = await api.post("/auth/generateToken", {
          username: this.username,
          password: this.password,
        });
        const data = response.data;
        localStorage.setItem("access_token", data);
        this.$router.push({ name: "trang-chu" }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        this.msg = "Tên đăng nhập hoặc mật khẩu không đúng!";
        console.error("Error during login:", error);
      } finally {
        this.loading = false;
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
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