<template>
  <section>
    <div class="container-lg bg-light p-3">
      <div class="row text-center pt-3">
        <div class="col-lg-6 m-auto border-bottom border-3 border-success">
          <h1 class="h3 fw-bold">{{ $t("top-comment") }}</h1>
        </div>
      </div>
      <div id="carouselExample" class="carousel slide mt-2 position-relative">
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(review, index) in reviews"
            :key="review.maDanhGia"
            :class="{ active: index === 0 }"
          >
            <div class="card mx-auto" style="max-width: 600px">
              <div
                class="d-flex align-items-center gap-2 text-body-tertiary p-3 border-bottom"
              >
                <i class="fa-solid fa-comment"></i>
                <p class="mb-0 fw-semibold">
                  {{ review.khuDuLich.tenKhuDuLich }}
                </p>
              </div>
              <div class="card-body px-4 pt-3 pb-4">
                <p class="card-text fst-italic">"{{ review.binhLuan }}"</p>
                <div class="text-warning mb-2">
                  <i
                    v-for="n in 5"
                    :key="n"
                    :class="
                      n <= review.diemSo
                        ? 'fa-solid fa-star'
                        : 'fa-regular fa-star'
                    "
                  ></i>
                </div>
                <h5 class="card-title mb-0">
                  {{ review.taiKhoan.tenTaiKhoan || "Người dùng ẩn danh" }}
                </h5>
                <small class="text-muted">{{ review.ngayTao }}</small>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      reviews: [],
    };
  },
  methods: {
    getReviews() {
      try {
        api.get("/danh-gia/top-5").then((response) => {
          this.reviews = response.data.map((review) => {
            return {
              ...review,
              ngayTao: this.formatTimeAgo(review.ngayTao),
            };
          });
          console.log(response);
        });
      } catch (error) {
        console.error("Error fetching reviews:", error);
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
    this.getReviews();
  },
};
</script>
<style scoped>
.carousel-control-prev,
.carousel-control-next {
  background-color: #e1e1e1;
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}
@media screen and (max-width: 567px) {
  .carousel-control-prev {
    left: -15px;
  }
  .carousel-control-next {
    right: -15px;
  }
  .carousel-control-prev,
  .carousel-control-next {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
