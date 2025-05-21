<script>
import api from '@/api';
export default {
    data(){
        return {
            record: {},
            maBanGhi: this.$route.params.maBanGhi,
        }
    },
    methods: {
        async getRecord() {
            try {
                const response = await api.get(`/ban-ghi/${this.maBanGhi}`);
                this.record = response.data;
            } catch (error) {
                console.error("Error fetching record:", error);
            }
        },
        async editBanGhi() {
            try {
                await api.put('/ban-ghi/', this.record);
                alert("Cập nhật bản ghi thành công!");
                this.$router.push({ name: "manager-record" });
            } catch (error) {
                console.error("Error updating record:", error);
            }
        },
    },
    mounted() {
        this.getRecord();
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
        <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa</li>
      </ol>
    </nav>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Chỉnh sửa bản ghi</h4>
              <form @submit.prevent="editBanGhi">
                <div class="row g-3 mb-2">
                  <div class="col-12">
                    <label for="">Tên bản ghi <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="record.tenBanGhi" placeholder="Tên bản ghi" required>
                  </div>
                  <div class="col-12">
                    <label for="">Mô tả <span class="text-danger">*</span></label>
                    <textarea class="form-control" type="text" v-model="record.moTa" placeholder="Mô tả" rows="10" required></textarea>
                  </div>
                  <div class="col-12 ">
                    <label for="">Đường dẫn mã QR tiếng Anh</label>
                    <input class="form-control text-muted" type="text" v-model="record.duongDanEN" readonly>
                  </div>
                  <div class="col-12">
                    <label for="">Đường dẫn mã QR tiếng Việt</label>
                    <input class="form-control text-muted" type="text" v-model="record.duongDanVN" readonly>
                  </div>
                </div>
                <button class="btn btn-success float-end mt-3" type="submit">Lưu thông tin</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>