<script>
import AdminSideBar from "@/components/AdminSideBar.vue";
import api from "@/api";
export default {
  components: {
    AdminSideBar,
  },
  data() {
    return {
      page: 0,
      totalPages: 0,
      images: [],
    };
  },
  methods: {
    async getImages() {
      try {
        const response = await api.get("/hinh-anh/", {
          params: { page: this.page },
        });
        this.images = response.data.content.map(image => {
          return {
            ...image,
            ngayTaiLen: this.formatTimeAgo(image.ngayTaiLen)
          }
        });
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
    nextPage() {
        this.page++;
        this.getImages();
    },
    prePage() {
        this.page--;
        this.getImages();
    },
    seeImg(maHinhAnh) {
      this.$router.push({ name: "admin-detail-image", params: { maHinhAnh } });
    },
    editImg(maHinhAnh) {
      this.$router.push({ name: "admin-edit-image", params: { maHinhAnh } });
    },
    deleteImg(maHinhAnh) {
      if (confirm("Bạn có chắc chắn muốn xóa hình ảnh này không?")) {
        api.delete(`/hinh-anh/${maHinhAnh}`)
          .then(() => {
            alert("Xóa hình ảnh thành công!");
            this.getImages();
          })
          .catch((error) => {
            console.error("Error deleting image:", error);
            alert("Xóa hình ảnh thất bại!");
          });
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
    this.getImages();
  },
}
</script>
<template>
  <main>
    <div class="container mt-2">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'admin'}">Quản lý</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Hình ảnh</li>
      </ol>
    </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <AdminSideBar />
        </div>
        <div class="col-9">
          <div class="row mb-4">
            <div class="col-6">
              <!-- <router-link class="btn btn-success" :to="{name: 'manager-add-image'}">Thêm hình ảnh</router-link> -->
            </div>
            <div class="col-6">
              
            </div>
          </div>
          <div class="row">
            <div class="col-3" v-for="image in images" :key="image.maHinhAnh">
              <div class="card" >
                <img :src="image.duongDan" class="card-img-top img-fluid" alt="..." style="height: 200px"/>
                <div class="card-body">
                  <h5 class="card-title" style="min-height: 50px">{{image.khuDuLich?.tenKhuDuLich}}</h5>
                  <p class="card-text">
                    {{image.loaiAnh}}
                  </p>
                  <p class="card-text text-muted">{{image.ngayTaiLen}}</p>
                  <div class="row">
                    <div class="col-4">
                        <button class="btn btn-primary" @click="seeImg(image.maHinhAnh)">Xem</button>
                    </div>
                    <div class="col-4">
                        <button class="btn btn-warning" @click="editImg(image.maHinhAnh)">Sửa</button>
                    </div>
                    <div class="col-4">
                        <button class="btn btn-danger" @click="deleteImg(image.maHinhAnh)">Xóa</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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