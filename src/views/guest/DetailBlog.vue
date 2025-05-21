<script scoped>
import api from "@/api";
export default {
  data() {
    return {
      blog: {},
      maBaiViet: this.$route.params.maBaiViet,
      anotherBlogs: [],
    };
  },
  methods: {
    async getBlog() {
      try {
        const response = await api.get(`/bai-viet/${this.maBaiViet}`);
        this.blog = response.data;

        this.blog.ngayTao = this.formatTimeAgo(this.blog.ngayTao);
        this.getAnotherBlogs();
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    },
    async getAnotherBlogs() {
      try {
        const response = await api.get(
          `/bai-viet/khac/${this.blog.khuDuLich?.maKhuDuLich}`
        );
        this.anotherBlogs = response.data.map((blog) => {
          return {
            ...blog,
            ngayTao: this.formatTimeAgo(blog.ngayTao),
          };
        });
      } catch (error) {
        console.error("Error fetching another blogs:", error);
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

      if (diffDays < 7) {
        return diffDays === 1 ? "1 ngày trước" : `${diffDays} ngày trước`;
      }

      return date.toLocaleDateString("vi-VN");
    },
  },
  mounted() {
    this.getBlog();
  },
  watch: {
    "$route.params.maBaiViet": {
      immediate: true,
      handler(newVal) {
        this.maBaiViet = newVal;
        this.getBlog();
      },
    },
  },
};
</script>
<template>
  <main>
    <section>
      <div class="container pb-5">
        <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'trang-chu' }">Trang chủ</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'bai-viet' }">Bài viết</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Chi tiết bài viết</li>
          </ol>
        </nav>
        <div class="row mt-3">
          <div class="col-lg-9 col-sm-12 border-bottom border-1 border-success">
            <div class="row justify-content-center">
              <div class="col-12">
                <iframe
                  class="youtube-iframe"
                  :src="blog.duongDanYoutube"
                ></iframe>
              </div>
            </div>
            <div class="pt-2 align-items-start d-flex flex-column flex-sm-row">
              <span class="fw-bold fs-4">{{ blog.tieuDe }}</span>
              <span class="badge bg-success text-light fs-6 ms-lg-3 ms-sm-0">{{
                blog.khuDuLich?.tenKhuDuLich
              }}</span>
            </div>
            <p>{{ blog.noiDung }}</p>
            <p class="text-muted">
              {{ blog.ngayTao }}
            </p>
          </div>
          <div class="col-lg-3 col-sm-12 mt-3">
            <div
              class="row"
              v-for="anotherBlog in anotherBlogs"
              :key="anotherBlog.maBaiViet"
            >
              <div class="col-6">
                <iframe
                  :src="anotherBlog.duongDanYoutube"
                  width="100%"
                  height="100px"
                ></iframe>
              </div>
              <div class="col-6">
                <router-link
                  class="h5 d-block another-header"
                  style="min-width: 40px"
                  :to="`/bai-viet/${anotherBlog.maBaiViet}`"
                  >{{
                    anotherBlog.tieuDe.length < 32
                      ? anotherBlog.tieuDe
                      : anotherBlog.tieuDe.substring(0, 32) + "..."
                  }}</router-link
                >
                <p class="mb-0 mt-1 another-text">
                  {{ anotherBlog.khuDuLich?.tenKhuDuLich }}
                </p>
                <p class="mb-0 another-text">{{ anotherBlog.ngayTao }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.youtube-iframe {
  width: 100%;
  height: 450px;
  border: none;
  padding: 0;
}
.card {
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0;
  width: 100%;
}
.card-body {
  padding: 0.5rem;
}
.another-text {
  font-size: 14px;
  color: #6c757d;
}
.another-header {
  font-size: 16px;
  color: #000;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .youtube-iframe {
    height: 200px;
  }
}
</style>