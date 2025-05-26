<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-6">
      <div class="fw-bold">{{ msg }}</div>
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
      token: '',
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
        // Handle successful login, e.g., store token, redirect, etc.
        localStorage.setItem("access_token", data);
        console.log("Login successful", data);
        window.location.replace("/");
      } catch (error) {
        this.msg = error.message || "Không thể đăng nhập. (Cannot login)";
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
