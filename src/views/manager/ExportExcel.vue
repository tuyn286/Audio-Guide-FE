<template>
  <section>
    <div class="container h-100">
      <nav
        style="--bs-breadcrumb-divider: '>'"
        aria-label="breadcrumb"
        class="ps-1 pt-1"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'manager' }">Quản lý</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Thống kê</li>
        </ol>
      </nav>
      <div class="row mt-3 ">
        <div class="col-3">
            <ManagerSideBar />
        </div>
        <div class="col-9 border-start border-dark">
          <h2 class="text-uppercase">Thống kê doanh thu theo tháng</h2>
          <p class="text-muted">Vui lòng chọn thời gian</p>
          <form @submit.prevent="thongKe">
            <div class="row">
              <div class="col-6">
                <label for="month" class="form-label"
                  >Tháng <span class="text-danger">*</span></label
                >
                <select v-model="month" class="form-select" id="month">
                  <option value="1">Tháng 1</option>
                  <option value="2">Tháng 2</option>
                  <option value="3">Tháng 3</option>
                  <option value="4">Tháng 4</option>
                  <option value="5">Tháng 5</option>
                  <option value="6">Tháng 6</option>
                  <option value="7">Tháng 7</option>
                  <option value="8">Tháng 8</option>
                  <option value="9">Tháng 9</option>
                  <option value="10">Tháng 10</option>
                  <option value="11">Tháng 11</option>
                  <option value="12">Tháng 12</option>
                </select>
              </div>
              <div class="col-6">
                <label for="year" class="form-label"
                  >Năm <span class="text-danger">*</span></label
                >
                <select v-model="year" class="form-select" id="year">
                  <option :value="year">{{ year }}</option>
                </select>
              </div>
              <div class="col-12 mt-3">
                <Spinner v-if="loading" />
                <button v-else type="submit" class="btn btn-success">
                  Xuất file Excel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
import ManagerSideBar from "@/components/ManagerSideBar.vue";
export default {
  name: "ExportExcel",
  components: {
    Spinner,
    ManagerSideBar
  },
  data() {
    return {
      month: 1,
      year: new Date().getFullYear(),
      loading: false,
    };
  },
  methods: {
    thongKe() {
      this.loading = true;
      const params = new URLSearchParams();
      params.append("year", this.year);
      params.append("month", this.month);
      const monthNow = new Date().getMonth() + 1;
      if (this.month > monthNow && this.year >= new Date().getFullYear()) {
        alert("Tháng không hợp lệ.");
        this.loading = false;
        return;
      }
      api
        .get("/excel/manager?" + params.toString(), {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `thong-ke-${this.year}-${this.month}.xlsx`
          );
          document.body.appendChild(link);
          link.click();
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
          this.loading = false;
        });
    },
  },
};
</script>