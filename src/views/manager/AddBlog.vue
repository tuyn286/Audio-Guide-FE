<template>
<main>
  <section>
    <div class="container mt-2 mb-5">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'manager'}">Quản lý</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'manager-blog'}">Bài viết</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Thêm mới</li>
      </ol>
    </nav>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Thêm mới bài viết</h4>
              <form @submit.prevent="addBlog">
                <div class="row g-3 mb-2">
                  <div class="col-12">
                    <label for="">Tiêu đề<span class="text-danger">*</span></label>
                    <input class="form-control" type="text"  v-model="baiViet.tieuDe" placeholder="Vui lòng nhập tiêu đề của bài viết" required>
                  </div>
                  <div class="col-12">
                    <label for="">Nội dung bài viết<span class="text-danger">*</span></label>
                    <textarea class="form-control" type="text" v-model="baiViet.noiDung" placeholder="Vui lòng nhập nội dung của bài viết" required rows="5"></textarea>
                  </div>
                  <div class="col-12">
                    <label for="">Đường dẫn của video trên youtube<span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="baiViet.duongDanYoutube" placeholder="VD: https://www.youtube.com/watch?v=taAEQqQogc0" required>
                  </div>
                </div>
                  <Spinner v-if="loading" class="float-end"/>
                  <button v-else class="btn btn-success float-end mt-3" type="submit">Thêm mới</button>
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
      baiViet: {
        tieuDe: '',
        noiDung: '',
        duongDanYoutube: '',
        loading: false,
      }
    }
  },
  methods: {
    async addBlog() {
      this.loading = true;
      try {
        this.baiViet.duongDanYoutube = this.baiViet.duongDanYoutube.replace('watch?v=', 'embed/');
        await api.post('/bai-viet/', this.baiViet)
            .then(response => {
                alert('Thêm mới bài viết thành công!');
              this.$router.push({ name: 'manager-blog' });
            })
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>