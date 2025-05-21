<script>
import api from "@/api";
export default {
  name: "BlogsView",
  data() {
    return {
      blogs: [],
      page: 0,
      totalPages: 0,
      searchText: "",
    };
  },
  methods: {
    async getBlogs() {
      try {
        const response = await api.get("/bai-viet/", {
          params: { page: this.page },
        });
        this.blogs = response.data.content.map((blog) => {
          return {
            ...blog,
            ngayTao: this.formatTimeAgo(blog.ngayTao),
          };
        });
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
    search() {
      try {
        api
          .get("/bai-viet/", {
            params: { page: this.page, text: this.searchText },
          })
          .then((response) => {
            this.blogs = response.data.content.map((blog) => {
              return {
                ...blog,
                ngayTao: this.formatTimeAgo(blog.ngayTao),
              };
            });
            this.totalPages = response.data.page.totalPages;
          });
      } catch (error) {
        console.error("Error searching blogs:", error);
      }
    },
    prePage() {
      this.page--;
      if (this.searchText !== "") {
        this.search();
      }
      this.getBlogs();
    },
    nextPage() {
      this.page++;
      if (this.searchText !== "") {
        this.search();
      }
      this.getBlogs();
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
  computed: {},
};
</script>
<template>
  <main>
    <section>
      <div class="container">
        <nav
          style="--bs-breadcrumb-divider: '>'"
          aria-label="breadcrumb"
          class="ps-1 pt-1"
        >
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'trang-chu' }">{{$t('nav-1')}}</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{$t('nav-3')}}</li>
          </ol>
        </nav>
        <div class="row text-center py-3">
          <div class="col-lg-12">
            <h1 class="h1">{{ $t("blog-header") }}</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 col-sm-12"></div>
          <div
            class="d-flex col-lg-4 col-sm-12 justify-content-end align-items-center mb-3"
          >
            <form
              @submit.prevent="search"
              class="modal-content modal-body border-0 p-0"
            >
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  id="inputModalSearch"
                  v-model="searchText"
                  @keyup.enter="search"
                  :placeholder="$t('search-placeholder')"
                />
                <button
                  type="submit"
                  class="input-group-text bg-success text-light"
                >
                  <i class="fa fa-fw fa-search text-white"></i>
                </button>
              </div>
            </form>
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
        <!-- Page pagination -->
        <div class="row">
          <div class="row d-flex justify-content-end align-items-end mt-5">
            <div class="col-4">
              <nav aria-label="Page navigation example">
                <ul class="pagination float-end">
                  <li class="page-item" :class="{ disabled: page == 0 }">
                    <button @click="prePage" class="page-link">
                      {{ $t("prepage") }}
                    </button>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">{{ page + 1 }}</a>
                  </li>
                  <li
                    class="page-item"
                    :class="{ disabled: page >= totalPages - 1 }"
                  >
                    <button @click="nextPage" class="page-link">
                      {{ $t("nextpage") }}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
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
.card:hover {
  cursor: pointer;
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>