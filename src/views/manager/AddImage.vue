<script>
import ManagerSideBar from "@/components/ManagerSideBar.vue";
import api from "@/api";
export default {
  components: {
    ManagerSideBar,
  },
  data() {
    return {
      image: {
        loaiAnh: "",
        moTa: "",
      },
      file: null,
    };
  },
  methods: {
    async addImage() {
      try {
        const formData = new FormData();
        formData.append(
          "hinhAnh",
          new Blob([JSON.stringify(this.image)], { type: "application/json" })
        );
        formData.append("file", this.file);
        const response = await api.post("/hinh-anh/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Thêm hình ảnh thành công!");
        this.$router.push({ name: "manager-image" });
      } catch (error) {
        console.error("Error add image:", error);
      }
    },
    handleFile(event) {
      this.file = event.target.files[0];
    },
  },
};
</script>
<template>
  <main>
    <div class="container mt-2 mb-5">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'manager'}">Quản lý</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'manager-image'}">Hình ảnh</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Thêm mới</li>
      </ol>
    </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <ManagerSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Thêm hình ảnh</h5>
                  <form @submit.prevent="addImage">
                    <div class="row g-3 mb-2">
                      <div class="col-12">
                        <label for="">Mô tả</label>
                        <textarea
                          class="form-control"
                          type="text"
                          v-model="image.moTa"
                          rows="4"
                          required
                        ></textarea>
                      </div>
                      <div class="col-12">
                        <select
                          v-model="image.loaiAnh"
                          class="form-select no-outline"
                          aria-label="Loại ảnh"
                          required
                        >
                          <option value="BG">Ảnh bìa</option>
                          <option value="INTRO">Ảnh giới thiệu</option>
                        </select>
                      </div>
                      <div class="col-12">
                        <label for="">Upload ảnh</label>
                        <input
                          class="form-control"
                          type="file"
                          @change="handleFile"
                          required
                        />
                      </div>
                    </div>
                    <button
                      class="btn btn-success float-end mt-3"
                      type="submit"
                    >
                      Thêm hình ảnh
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>