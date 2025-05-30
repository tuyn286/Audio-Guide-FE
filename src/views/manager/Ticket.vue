<script>
import ManagerSideBar from "@/components/ManagerSideBar.vue";
import api from "@/api";
import { ref } from "vue";
import Spinner from "@/components/Spinner.vue";
export default {
  components: {
    ManagerSideBar,
    Spinner,
  },
  data() {
    return {
      page: 0,
      totalPages: 0,
      tickets: [],
      selectedDate: ref(null),
      loading: false,
    };
  },
  methods: {
    formatTimeAgo(dateString) {
      const now = new Date();
      const date = new Date(dateString);

      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        if (diffHours === 0) return "Vừa xong";
        return `${diffHours} giờ trước`;
      }

      if (diffDays < 7) {
        return diffDays === 1 ? "1 ngày trước" : `${diffDays} ngày trước`;
      }

      // Nếu quá 7 ngày, hiển thị dạng dd/mm/yyyy
      return date.toLocaleDateString("vi-VN");
    },
    async getTicket() {
      try {
        const response = await api.get("/ve/", { params: { page: this.page } });
        this.tickets = response.data.content.map((ticket) => {
          return {
            ...ticket,
            ngayTao: this.formatTimeAgo(ticket.ngayTao),
          };
        });
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    },
    onDateChange(date) {
      this.selectedDate = date;
      try {
        api
          .get("/ve/", { params: { page: this.page, date: this.selectedDate } })
          .then((response) => {
            this.tickets = response.data.content.map((ticket) => {
              return {
                ...ticket,
                ngayTao: this.formatTimeAgo(ticket.ngayTao),
              };
            });
            this.totalPages = response.data.page.totalPages;
          });
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    },
    prePage() {
      this.page--;
      this.getTicket();
    },
    nextPage() {
      this.getTicket();
    },
    editTicket(maVe) {
      this.$router.push({ name: "manager-edit-ticket", params: { maVe } });
    },
    deleteTicket(maVe) {
      if (confirm("Bạn có chắc chắn muốn xóa vé này không?")) {
        try {
          api.delete(`/ve/${maVe}`).then(() => {
            this.getTicket();
          });
        } catch (error) {
          console.error("Error deleting ticket:", error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  created() {
    this.getTicket();
  },
};
</script>
<template>
  <main>
    <div class="container mt-2 mb-5">
      <nav
        style="--bs-breadcrumb-divider: '>'"
        aria-label="breadcrumb"
        class="ps-1 pt-1"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'manager' }">Quản lý</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Vé thuyết minh
          </li>
        </ol>
      </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <ManagerSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-6"></div>
            <div class="col-6">
              <el-date-picker
                style="width: 100%"
                v-model="selectedDate"
                type="date"
                placeholder="Chọn ngày"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="onDateChange"
              />
            </div>
          </div>
          <div class="row">
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  <th></th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Ngày tạo</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ticket in tickets" :key="ticket.maVe">
                  <td>{{ ticket.maVe }}</td>
                  <td>{{ ticket.soLuong }}</td>
                  <td>
                    {{
                      (ticket.soLuong * ticket.giaVe).toLocaleString("vn-VN") +
                      "đ"
                    }}
                  </td>
                  <td>{{ ticket.ngayTao }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning btn-sm btn-rounded"
                      @click.prevent="editTicket(ticket.maVe)"
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <Spinner v-if="loading" />
                    <button
                      v-else
                      type="button"
                      class="btn btn-danger btn-sm btn-rounded"
                      @click.prevent="deleteTicket(ticket.maVe)"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="row d-flex justify-content-end align-items-end mt-5">
              <div class="col-4">
                <nav aria-label="Page navigation example">
                  <ul class="pagination float-end">
                    <li class="page-item" :class="{ disabled: page == 0 }">
                      <button @click="prePage" class="page-link">Trước</button>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">{{ page + 1 }}</a>
                    </li>
                    <li
                      class="page-item"
                      :class="{ disabled: page >= totalPages - 1 }"
                    >
                      <button @click="nextPage" class="page-link">Sau</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>