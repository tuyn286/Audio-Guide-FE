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
      comments: [],
      loading: false,
    };
  },
  methods: {
    async getComment() {
      try {
        const response = await api.get("/danh-gia/", {
          params: { page: this.page },
        });
        this.comments = response.data.content;
        this.comments = this.comments.map((comment) => {
          return {
            ...comment,
            ngayTao: this.formatTimeAgo(comment.ngayTao),
          };
        });
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    prePage() {
      this.page--;
      this.getComment();
    },
    nextPage() {
      this.getComment();
    },
    deleteComment(maDanhGia) {
      if (confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) {
        try {
          api.delete(`/ve/${maVe}`).then(() => {
            this.getComment();
          });
        } catch (error) {
          console.error("Error deleting comment:", error);
        } finally {
          this.loading = false;
        }
      }
    },
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

      if (diffDays === 1) return "1 ngày trước";
      return `${diffDays} ngày trước`;
    },
  },
  mounted() {
    this.getComment();
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
          <li class="breadcrumb-item active" aria-current="page">Đánh giá</li>
        </ol>
      </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <ManagerSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  <th></th>
                  <th>Nội dung</th>
                  <th>Điểm số</th>
                  <th>Người đánh giá</th>
                  <th>Ngày tạo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="comment in comments" :key="comments.maDanhGia">
                  <td>{{ comment.maDanhGia }}</td>
                  <td>{{ comment.binhLuan }}</td>
                  <td>{{ comment.diemSo }}</td>
                  <td>
                    {{
                      comment.taiKhoan.tenTaiKhoan
                        ? comment.taiKhoan.tenTaiKhoan
                        : "Ẩn danh"
                    }}
                  </td>
                  <td>{{ comment.ngayTao }}</td>
                  <td>
                    <Spinner v-if="loading" />
                    <button
                      v-else
                      type="button"
                      class="btn btn-danger btn-sm btn-rounded"
                      @click.prevent="deleteComment(comment.maDanhGia)"
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