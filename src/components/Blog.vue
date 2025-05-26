<script scoped>
import api from "@/api";
export default {
  name: "Blog",
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    async getBlogs() {
      try {
        const response = await api.get("/bai-viet/top-3");
        this.blogs = response.data.content.map((blog) => {
          return {
            ...blog,
            ngayTao: this.formatTimeAgo(blog.ngayTao),
          };
        });
      } catch (error) {
        console.error("Error fetching blogs:", error);
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

      // Nếu quá 7 ngày, hiển thị dạng dd/mm/yyyy
      return date.toLocaleDateString("vi-VN");
    },
  },
  mounted() {
    this.getBlogs();
  },
};
</script>
<template>
  <section class="bg-light">
    <div class="container py-5">
      <div class="row text-center py-3">
        <div class="col-lg-6 m-auto border-bottom border-3 border-success">
          <router-link class="h3 fw-bold text-decoration-none text-dark" :to="{name: 'bai-viet'}">{{ $t("newest-blog") }}</router-link>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-md-4 mb-4"
          v-for="blog in blogs"
          :key="blog.maBaiViet"
        >
          <div class="card h-100">
            <iframe
              :src="blog.duongDanYoutube || 'about:blank'"
              frameborder="0"
              allowfullscreen
              class="youtube-iframe"
            >
            </iframe>
            <div class="card-body">
              <router-link
                style="min-height: 60px; display: block"
                :to="{
                  name: 'bai-viet-detail',
                  params: { maBaiViet: blog.maBaiViet },
                }"
                id="blog-title"
                class="fs-5 text-decoration-none text-dark fw-bold"
                >{{ blog.tieuDe }}</router-link
              >
              <p class="card-text text-muted mb-0">
                {{ blog.khuDuLich.tenKhuDuLich }}
              </p>
              <p class="card-text text-muted mt-0">{{ blog.ngayTao }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.youtube-iframe {
  width: 100%;
  height: 200px;
}
.card:hover{
  cursor: pointer;
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>