<script>
import api from "@/api";
export default {
  name: "DetailSiteView",
  data() {
    return {
      site: {},
      maKhuDuLich: this.$route.params.maKhuDuLich,
      reviews: [],
      page: 0,
      totalPages: 0,
      showAllReviews: false,
    };
  },
  computed: {
    displayedReviews() {
      return this.showAllReviews ? this.reviews : this.reviews.slice(0, 5);
    },
    introHinhAnh() {
      return (
        this.site.hinhAnhList?.filter(
          (hinhAnh) => hinhAnh.loaiAnh === "INTRO"
        ) || []
      );
    },
    bgHinhAnh() {
      return (
        this.site.hinhAnhList?.find((hinhAnh) => hinhAnh.loaiAnh === "BG") ||
        null
      );
    },
    avgDiemSo() {
      if (this.reviews.length === 0) return 0;
      const totalDiemSo = this.reviews.reduce(
        (sum, review) => sum + review.diemSo,
        0
      );
      return (totalDiemSo / this.reviews.length).toFixed(1);
    },
    detailStar() {
      const total = this.reviews?.length || 0;
      const result = {
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
      };

      this.reviews.forEach((review) => {
        switch (review.diemSo) {
          case 5:
            result.fiveStar++;
            break;
          case 4:
            result.fourStar++;
            break;
          case 3:
            result.threeStar++;
            break;
          case 2:
            result.twoStar++;
            break;
          case 1:
            result.oneStar++;
            break;
        }
      });

      return {
        ...result,
        total,
        percent: {
          fiveStar: total ? (result.fiveStar / total) * 100 : 0,
          fourStar: total ? (result.fourStar / total) * 100 : 0,
          threeStar: total ? (result.threeStar / total) * 100 : 0,
          twoStar: total ? (result.twoStar / total) * 100 : 0,
          oneStar: total ? (result.oneStar / total) * 100 : 0,
        },
      };
    },
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

      if (diffDays === 1) return "1 ngày trước";
      return `${diffDays} ngày trước`;
    },
    async getSite() {
      try {
        const response = await api.get(`/khu-du-lich/${this.maKhuDuLich}`);
        this.site = response.data;
        console.log(this.site);
      } catch (error) {
        console.error("Error fetching site:", error);
      }
    },
    async getReviews() {
      try {
        const response = await api.get(`/danh-gia/${this.maKhuDuLich}`);
        const content = response.data || [];
        this.reviews = content.map((review) => ({
          ...review,
          ngayTao: this.formatTimeAgo(review.ngayTao),
        }));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    },
  },
  mounted() {
    this.getSite();
    this.getReviews();
  },
};
</script>
<template>
  <main>
    <div class="container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'trang-chu'}">{{$t('nav-1')}}</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'khu-du-lich'}">{{$t('nav-2')}}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{$t('detail-btn')}}</li>
      </ol>
    </nav>
      <div
        class="introduce-section p-5"
        :style="{
          backgroundImage: this.bgHinhAnh?.duongDan
            ? `url(${this.bgHinhAnh.duongDan})`
            : 'none',
        }"
      >
        <div class="row p-5">
          <div class="col-lg-12 mb-0 align-items-center">
            <h1 class="h1 text-light text-center">
              <b>{{ site.tenKhuDuLich }}</b>
            </h1>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 border-bottom border-3 border-success p-0">
          <h1 class="h5 fw-bold text-start p-0 ps-2">{{$t('info')}}</h1>
        </div>
        <p class="text-muted mb-0">
          <i class="fa-solid fa-location-dot pe-2"></i>{{ site.diaChi }}
        </p>
        <p class="text-muted mb-0">
          <i class="fa-solid fa-phone pe-2"></i>{{ site.taiKhoan?.soDienThoai }}
        </p>
        <p class="text-muted mb-0">
          <i class="fa-solid fa-envelope pe-2"></i>{{ site.taiKhoan?.email }}
        </p>
      </div>
      <div class="row mt-2">
        <div class="col-12 border-bottom border-3 border-success p-0">
          <h1 class="h5 fw-bold text-start p-0 ps-2">{{$t('introduce')}}</h1>
        </div>
        <p>{{ site.moTa }}</p>
        <div
          class="col-lg-10 col-sm-12 mx-auto"
          v-for="hinhAnh in introHinhAnh"
          :key="hinhAnh.maHinhAnh"
        >
          <div class="card box-shadow">
            <img
              :src="hinhAnh.duongDan"
              class="card-img-top img-cover"
              :alt="hinhAnh.ngayTaiLen"
            />
            <div class="card-body">
              <p class="card-text text-center fst-italic">{{ hinhAnh.moTa }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row comment-box mb-5">
        <div class="col-12 border-bottom border-3 border-success p-0">
          <h1 class="h5 fw-bold text-start p-0 ps-2">{{ $t("rating") }}</h1>
        </div>
        <div class="col-lg-4 col-sm-12">
          <p class="review-result fs-2 fw-bold mb-0 mt-3">{{ avgDiemSo }}</p>
          <div class="text-warning mb-2 mx-auto">
            <i
              v-for="n in 5"
              :key="n"
              :class="
                n <= avgDiemSo ? 'fa-solid fa-star' : 'fa-regular fa-star'
              "
            ></i>
          </div>
          <p class="text-muted">Từ {{ reviews.length }} đánh giá</p>
          <div class="rating-bar justify-content-center">
            <table class="text-left ">
              <tr
                v-for="(n, index) in ['five', 'four', 'three', 'two', 'one']"
                :key="n"
              >
                <td class="rating-label fw-bold pe-2">{{ 5 - index }}</td>
                <td class="rating-bar">
                  <div class="bar-container">
                    <div
                      class="bar-5 bar"
                      :style="{
                        width: detailStar.percent['' + n + 'Star'] + '%',
                      }"
                    ></div>
                  </div>
                </td>
                <td class="text-right pt-0 ps-1">
                  {{ detailStar[n + "Star"] }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-lg-8 col-sm-12">
          <div class="row">
            <div class="row mt-2">
              <div class="col-8 align-self-center">
                <h2 class="h6 m-0">{{$t('comment')}}</h2>
              </div>
              <div class="col-4">
                <button
                  class="border-0 float-end bg-white text-success"
                  v-if="reviews.length > 5"
                  @click="showAllReviews = !showAllReviews"
                >
                  {{ showAllReviews ? "Thu gọn" : "Xem thêm" }}
                </button>
              </div>
            </div>
            <div
              class="col-12 border-bottom"
              v-for="review in displayedReviews"
              :key="review.maDanhGia"
            >
              <div class="card mx-auto">
                <div class="card-body px-3 pt-2 pb-1">
                  <p class="card-text fst-italic mb-1">
                    "{{ review.binhLuan }}"
                  </p>
                  <div class="text-warning mb-0">
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
                  <h5 class="card-title mb-0 fs-6">
                    {{ review.taiKhoan.tenTaiKhoan || "Người dùng ẩn danh" }}
                  </h5>
                  <small class="text-muted">{{ review.ngayTao }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.introduce-section {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 50px 0;
  z-index: 1;
  color: white;
}
.introduce-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.introduce-section * {
  position: relative;
  z-index: 1;
}
.card {
  border: none;
}
.progress {
  position: relative;
  background-color: #e9ecef;
  border-radius: 8px;
  height: 24px;
  width: 100%;
  overflow: hidden;
  margin: 10px 0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  width: 0%;
  transition: width 0.4s ease;
}

.progress-value {
  position: absolute;
  top: 0;
  left: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #333;
  z-index: 1;
  font-size: 14px;
}
.rating-box {
  width: 120px;
  height: 120px;
  margin: auto;
  background: #fbc02d;
  color: #fff;
}
.rating-box > h1 {
  font-size: 50px;
}
td {
  padding-top: 6px;
  padding-bottom: 6px;
}
td:last-child {
  padding-bottom: 0px !important;
}
.rating-bar {
  width: 350px;
  padding: 0;
}
.bar-container {
  width: 100%;
  background-color: #e1e1e1;
  text-align: center;
}
.bar {
  height: 16px;
}
.bar-5 {
  background-color: #fbc02d;
}
</style>