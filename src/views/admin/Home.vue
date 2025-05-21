<script scoped>
import AdminSideBar from "@/components/AdminSideBar.vue";
import AdminChart from "@/components/AdminChart.vue";
import api from "@/api";
export default {
  name: "AdminHomeView",
  components: {
    AdminSideBar,
    AdminChart,
  },
  data() {
    return {
      dashBoard: {}
    };
  },
  methods: {
    async fetchData() {
      try {
        await api.get("/dashboard/admin")
          .then((response) => {
            this.dashBoard = response.data;
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<template>
  <main>
    <div class="container mt-5 mb-5">
      <div class="row mt-3">
        <div class="col-3 border-end">
          <AdminSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <router-link class="col-3 pb-3">
              <div class="card bg-primary text-white border-0">
                <div class="card-body">
                  <span class="fs-5 ps-0"><i class="fa-solid fa-money-bill-1-wave"></i></span>
                  <h6 class="card-title">Tổng doanh thu</h6>
                  <p class="fs-4 fw-bold">{{this.dashBoard.doanhThu?.toLocaleString('vn-VN')}} vnđ</p>
                </div>
              </div>
            </router-link>

            <router-link class="col-3 pb-3" :to="{ name: 'admin-record' }">
              <div class="card bg-warning text-dark border-0">
                <div class="card-body">
                  <span class="fs-5 ps-0"><i class="fa-solid fa-file "></i></span>
                  <h6 class="card-title">Số lượng bản ghi</h6>
                  <p class="fs-4 fw-bold">{{this.dashBoard.banGhi}}</p>
                </div>
              </div>
            </router-link>

            <router-link class="col-3 pb-3" :to="{ name: 'admin-image' }">
              <div class="card bg-success text-white border-0">
                <div class="card-body">
                  <span class="fs-5 ps-0"><i class="fa-solid fa-images"></i></span>
                  <h6 class="card-title">Số lượng hình ảnh</h6>
                  <p class="fs-4 fw-bold">{{this.dashBoard.hinhAnh}}</p>
                </div>
              </div>
            </router-link>

            <router-link class="col-3 pb-3" :to="{ name: 'admin-blog' }">
              <div class="card bg-secondary text-white border-0">
                <div class="card-body">
                  <span class="fs-5 ps-0"><i class="fa-solid fa-newspaper"></i></span>
                  <h6 class="card-title">Số lượng bài viết</h6>
                  <p class="fs-4 fw-bold">{{this.dashBoard.baiViet}}</p>
                </div>
              </div>
            </router-link>

            <router-link class="col-3 pb-3" :to="{ name: 'admin-user' }">
              <div class="card bg-info text-dark border-0">
                <div class="card-body">
                  <span class="fs-5 ps-0"><i class="fa-solid fa-users"></i></span>
                  <h6 class="card-title">Số lượng tài khoản</h6>
                  <p class="fs-4 fw-bold">{{this.dashBoard.taiKhoan}}</p>
                </div>
              </div>
            </router-link>

            <router-link class="col-3 pb-3">
              <div class="card bg-danger text-white border-0">
                <div class="card-body">
                  <span class="fs-5 ps-0"><i class="fa-solid fa-eye"></i></span>
                  <h6 class="card-title">Lượt truy cập</h6>
                  <p class="fs-4 fw-bold">{{this.dashBoard.luotTruyCap}}</p>
                </div>
              </div>
            </router-link>

            <router-link class="col-3 pb-3" :to="{ name: 'admin-comment' }">
              <div class="card bg-dark text-white border-0">
                <div class="card-body">
                  <span class="fs-5 ps-0"><i class="fa-solid fa-comment"></i></span>
                  <h6 class="card-title">Số lượng đánh giá</h6>
                  <p class="fs-4 fw-bold">{{this.dashBoard.danhGia}}</p>
                </div>
              </div>
            </router-link>
            
          </div>
          <div class="row">
            <AdminChart />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
a {
  text-decoration: none;
}
.card:hover {
  cursor: pointer;
  transform: scale(1.05);
  transition: transform 0.1s ease-in-out;
}
</style>