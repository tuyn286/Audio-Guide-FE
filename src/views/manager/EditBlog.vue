<template>
<main>
  <section>
    <div class="container mt-2 mb-5">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'manager'}">Quản lý</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'manager-blog'}">Bài viết</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa</li>
      </ol>
    </nav>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Chỉnh sửa bài viết</h4>
              <form @submit.prevent="editBlog">
                <div class="row g-3 mb-2">
                  <div class="col-12">
                    <label for="">Tiêu đề <span class="text-danger">*</span></label>
                    <input class="form-control" type="text"  v-model="baiViet.tieuDe" placeholder="Tiêu đề" required>
                  </div>
                  <div class="col-12">
                    <label for="">Nội dung <span class="text-danger">*</span></label>
                    <textarea class="form-control" type="text" v-model="baiViet.noiDung" placeholder="Nội dung" required rows="5"></textarea>
                  </div>
                  <div class="col-12">
                    <label for="">Đường dẫn youtube <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="baiViet.duongDanYoutube" placeholder="Link youtube" required>
                  </div>
                </div>
                <Spinner v-if="loading" class="float-end"/>
                  <button v-else class="btn btn-success float-end mt-3" type="submit">Lưu thông tin</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<script>
import api from '@/api';
import Spinner from '@/components/Spinner.vue';
export default {
  components: {
    Spinner
  },
  data() {
    return {
      maBaiViet: this.$route.params.maBaiViet,
      baiViet: {},
      loading: false,
    }
  },
  methods: {
    async editBlog() {
      this.loading = true;
      try {
        await api.put('/bai-viet/', this.baiViet)
            .then(response => {
                alert('Sửa bài viết thành công!');
              this.$router.push({ name: 'manager-blog' });
            })
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getBlog() {
        try {
            await api.get('/bai-viet/' + this.maBaiViet)
                .then(response => {
                    this.baiViet = response.data;
                })
        } catch (error) {
            console.error(error);
        }
    }
  },
  mounted() {
    this.getBlog();
  }
}
</script>