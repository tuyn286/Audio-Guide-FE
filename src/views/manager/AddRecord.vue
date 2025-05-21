<script>
import api from "@/api";
export default {
    data() {
        return {
            banGhi: {
              tenBanGhi: "",
              moTa: "",
            },
            fileVn: null,
            fileEn: null,
        };
    },
    methods: {
        async addBanGhi() {
            try {
                const formData = new FormData();
                formData.append('banGhi', new Blob([JSON.stringify(this.banGhi)], { type: 'application/json' }));
                formData.append('fileVn', this.fileVn);
                formData.append('fileEn', this.fileEn);
                const response = await api.post("/ban-ghi/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 201) {
                    alert("Thêm bản ghi thành công!");
                    this.$router.push({ name: "manager-record" });
                } else {
                    alert("Thêm bản ghi thất bại!");
                }
            } catch (error) {
                console.error("Error adding record:", error);
            }
        },
        handleFileEn(event) {
          this.fileEn = event.target.files[0]; 
        },
        handleFileVn(event) {
          this.fileVn = event.target.files[0]; 
        }
    },
}
</script>
<template>
<main>
  <section>
    <div class="container mt-2 mb-5">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'manager'}">Quản lý</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'manager-record'}">Bản ghi thuyết minh</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Thêm mới</li>
      </ol>
    </nav>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Thêm mới bản ghi</h4>
              <form @submit.prevent="addBanGhi">
                <div class="row g-3 mb-2">
                  <div class="col-12">
                    <label for="">Tên bản ghi <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="banGhi.tenBanGhi" placeholder="Tên bản ghi" required>
                  </div>
                  <div class="col-12">
                    <label for="">Mô tả <span class="text-danger">*</span></label>
                    <textarea class="form-control" type="text" v-model="banGhi.moTa" placeholder="Mô tả" rows="4" required></textarea>
                  </div>
                  <div class="col-12">
                      <label for="">Upload file thuyết minh tiếng Việt <span class="text-danger">*</span></label>
                      <input class="form-control" type="file" @change="handleFileVn" required>
                  </div>
                  <div class="col-12">
                      <label for="">Upload file thuyết minh tiếng Anh <span class="text-danger">*</span></label>
                      <input class="form-control" type="file" @change="handleFileEn" required>
                  </div>
                </div>
                <button class="btn btn-success float-end mt-3" type="submit">Thêm bản ghi</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>
