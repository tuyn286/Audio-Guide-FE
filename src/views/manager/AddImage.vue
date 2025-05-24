<script>
import ManagerSideBar from "@/components/ManagerSideBar.vue";
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
export default {
  components: {
    ManagerSideBar,
    Spinner,
  },
  data() {
    return {
      image: {
        loaiAnh: "",
        moTa: "",
      },
      file: null,
      previewUrl: null,
      loading: false,
    };
  },
  methods: {
    async addImage() {
      this.loading = true;
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
      } finally {
        this.loading = false;
      }
    },
    handleFile(event) {
      this.file = event.target.files[0];
      this.previewUrl = URL.createObjectURL(this.file);
    },
  },
};
</script>
<template>
  <main>
    <div class="container mt-2 mb-5">
      <nav
        style="--bs-breadcrumb-divider: '>'"
        aria-label="breadcrumb"
        class="ps-1 pt-1"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'manager' }">Quản lý</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'manager-image' }">Hình ảnh</router-link>
          </li>
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
                        <div v-if="previewUrl" class="mt-3">
                          <img
                            :src="previewUrl"
                            alt="Preview"
                            style="max-width: 300px"
                          />
                        </div>
                      </div>
                    </div>
                    <Spinner v-if="loading" class="float-end"/>
                    <button
                      v-else
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