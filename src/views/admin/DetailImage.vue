<script>
import ManagerSideBar from "@/components/ManagerSideBar.vue";
import api from "@/api";
export default {
    components: {
        ManagerSideBar,
    },
    data() {
        return {
            maHinhAnh: this.$route.params.maHinhAnh,
            image: {},
        };
    },
    methods: {
        async getImage() {
            try {
                const response = await api.get(`/hinh-anh/${this.maHinhAnh}`);
                this.image = response.data;
            } catch (error) {
                console.error("Error fetching image:", error);
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
    created() {
        this.getImage();
    },
}
</script>
<template>
  <main>
    <div class="container mt-2">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'admin'}">Quản lý</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'admin-image'}">Hình ảnh</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Xem chi tiết</li>
      </ol>
    </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <ManagerSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-12">
              <div class="card" >
                <img :src="image.duongDan" class="card-img-top img-fluid" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">{{image.khuDuLich?.tenKhuDuLich}}</h5>
                  <p class="card-text">
                    {{image.moTa}}
                  </p>
                  <p class="card-text text-muted">{{this.formatTimeAgo(image.ngayTaiLen)}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>