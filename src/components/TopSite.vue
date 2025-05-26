<template>
  <section class="container py-5 bg-light">
    <div class="row text-center pt-3">
      <div class="col-lg-6 m-auto border-bottom border-3 border-success">
        <router-link
          class="h3 fw-bold text-decoration-none text-dark"
          :to="{ name: 'khu-du-lich' }"
          >{{ $t("top-site") }}</router-link
        >
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-md-4 p-5 mt-2"
        v-for="site in sites"
        :key="site.maKhuDuLich"
      >
        <div class="card">
          <router-link :to="/khu-du-lich/ + site.maKhuDuLich"
            ><img
              :src="bgHinhAnh(site).duongDan"
              class="img-fluid border site-img rounded"
          /></router-link>
          <div class="card-body text-center">
            <h5 class="text-center mt-3 mb-3">{{ site.tenKhuDuLich }}</h5>
            <div class="mt-3 info">
              <span class="text1 d-block" style="min-height: 40px">
                <i class="fa-solid fa-location-dot"></i>
                {{ site.diaChi }}
              </span>
              <span class="text1">
                <i class="fa-solid fa-user"></i>
                {{ site.soLuongKhach }}</span
              >
            </div>
            <div class="cost mt-3 text-dark">
              <span>{{ site.giaVe.toLocaleString("vi-VN") }}VND</span>
              <div class="star mt-3 align-items-center">
                <i
                  v-for="n in 5"
                  :key="n"
                  :class="getStarClass(n)"
                ></i>
                <span class="ms-2">{{ site.diemDanhGia.toFixed(1) }}</span>
              </div>
            </div>
          </div>
          <div
            class="p-3 text-center site-button text-white mt-3 cursor bg-success"
          >
            <router-link
              :to="/khu-du-lich/ + site.maKhuDuLich"
              class="text-uppercase btn fs-6 fw-bold"
              >{{ $t("detail-btn") }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/api";
export default {
  name: "TopSite",
  data() {
    return {
      sites: [],
    };
  },
  methods: {
    async getTopSites() {
      try {
        const response = await api.get("/khu-du-lich/top-3");
        this.sites = response.data;
      } catch (error) {
        console.error("Error fetching top sites:", error);
      }
    },
    getStarClass(n) {
      const score = site.diemDanhGia || 0;
      if (n <= Math.floor(score)) {
        return "fa-solid fa-star text-warning";
      } else if (n - score <= 0.75 && n - score >= 0.25) {
        return "fa-solid fa-star-half-stroke text-warning";
      } else {
        return "fa-regular fa-star text-warning";
      }
    },
    bgHinhAnh(site) {
      return (
        site.hinhAnhList?.filter((hinhAnh) => hinhAnh.loaiAnh === "BG")[0] || ""
      );
    },
  },
  mounted() {
    this.getTopSites();
  },
};
</script>
<style scoped>
.site-img {
  width: 100%;
  height: 200px;
}
.card {
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 20px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.card:hover {
  transform: translateY(-15px);
  transition: transform 0.3s ease-in-out;
}

.text1 {
  font-size: 16px;
  color: #717171;
}
.info {
  line-height: 17px;
}
.star {
  color: #fbc02d;
}
.cost span {
  color: #fb3531;
  font-weight: bold;
  font-size: 20px;
}
/* .site-button {
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
} */
</style>