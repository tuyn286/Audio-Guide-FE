<script>
import ManagerSideBar from "@/components/ManagerSideBar.vue";
import Spinner from "@/components/Spinner.vue";
import api from "@/api";
export default {
  components: {
    ManagerSideBar,
    Spinner,
  },
  data() {
    return {
      maHinhAnh: this.$route.params.maHinhAnh,
      image: {},
      loading: false,
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
    async editImage() {
      this.loading = true;
      try {
        await api.put('/hinh-anh/',this.image)
            .then((response) => {
                alert("Chỉnh sửa hình ảnh thành công!");
                this.$router.push({ name: "manager-image" });
            })
            .catch((error) => {
                console.error("Error editing image:", error);
            });
      } catch (error) {
        console.error("Error editing image:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getImage();
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
        <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa</li>
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
                  <h5 class="card-title">Chỉnh sửa hình ảnh</h5>
                  <img :src="image.duongDan" class="card-img-top img-fluid" alt="..."/>
                  <form @submit.prevent="editImage">
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
                    </div>
                    <Spinner v-if="loading" />
                    <button
                      v-else
                      class="btn btn-success float-end mt-3"
                      type="submit"
                    >
                      Lưu thông tin
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