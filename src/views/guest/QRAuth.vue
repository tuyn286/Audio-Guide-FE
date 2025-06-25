<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-6">
      <div class="fw-bold fs-3">{{ msg }}</div>
      <Spinner v-if="loading" />
    </div>
  </div>
</template>
<script>
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
export default {
  name: "QRAuth",
  components: {
    Spinner,
  },
  data() {
    return {
      token: "",
      msg: "",
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.msg = "Đang đăng nhập... (Logging in...)";
      try {
        const response = await api.get(`/qr-auth/validate?token=${this.token}`);
        if (response.status !== 200 || response.data === "") {
          throw new Error("Login failed " + response.status);
        }
        const data = response.data;
        // set jwt
        localStorage.setItem("access_token", data);
        //set thoi gian dang nhap
        localStorage.setItem("login_time", Date.now());
        console.log("Login successful", data);
        this.msg = "Đăng nhập thành công. (Login successful)";
        // lấy ngôn ngữ, await để chờ language trước khi redirect
        try {
          const langRes = await api.get("/tai-khoan/ngon-ngu");
          this.language = langRes.data;
          localStorage.setItem("language", this.language);
        } catch (langError) {
          console.error("Error fetching language:", langError);
        }
        // redirect to home page
        window.location.replace("/");
      } catch (error) {
        this.msg = "Không thể đăng nhập. (Cannot login)";
        console.error("Login error:", this.msg);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.token = this.$route.query.token;
    if (this.token) {
      this.handleLogin();
    } else {
      this.msg = "Token không hợp lệ. (Invalid token)";
      console.error("Invalid token");
    }
  },
};
</script>
