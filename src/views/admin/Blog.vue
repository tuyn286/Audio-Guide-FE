<script>
import AdminSideBar from "@/components/AdminSideBar.vue";
import Spinner from "@/components/Spinner.vue";
import api from "@/api";
import { ca } from 'element-plus/es/locale';
export default {
  components: {
    AdminSideBar,
    Spinner,
  },
  data() {
    return {
      page: 0,
      totalPages: 0,
      blogs: [],
      searchText: '',
      loading: false,
    };
  },
  methods: {
    async getBlog() {
      try {
        const response = await api.get('/bai-viet/', {params: { page: this.page }});
        this.blogs = response.data.content;
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
    search() {
      try {
        api.get('/bai-viet/', { params: { page: this.page, text: this.searchText } })
          .then((response) => {
            this.blogs = response.data.content;
            this.totalPages = response.data.page.totalPages;
          });
      } catch (error) {
        console.error('Error searching blogs:', error);
      }
    },
    prePage(){
            this.page--;
            if(this.searchText !== ''){
                this.search();
            }
            this.getBlog();
        },
        nextPage(){
            this.page++;
            if(this.searchText !== ''){
                this.search();
            }
            this.getBlog();
        },
    editBlog(id) {
      this.$router.push({ name: "manager-edit-blog", params: { maBaiViet: id } });
    },
    deleteBlog(id) {
      if (confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
        this.loading = true;
        try {
          api.delete(`/bai-viet/${id}`).then(() => {
          this.getBlog();
        });
        } catch (error) {
          console.error("Error deleting blog:", error);
        } finally {
          this.loading = false;
        }
      }
    },
    seeBlog(id) {
      this.$router.push({ name: "manager-detail-blog", params: { maBaiViet: id } });
    },
  },
  mounted() {
    this.getBlog();
  },
};
</script>
<template>
  <main>
    <div class="container mt-2">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'admin'}">Quản lý</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Bài viết</li>
      </ol>
    </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <AdminSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-6">
                <router-link class="btn btn-success" :to="{name: 'manager-add-blog'}">Thêm bài viết</router-link>
            </div>
            <div class="col-6">
              <div class="d-flex">
                <form
                  @submit.prevent="search"
                  class="modal-content modal-body border-0 p-0"
                >
                  <div class="input-group mb-2">
                    <input
                      type="text"
                      class="form-control"
                      id="inputModalSearch"
                      v-model="searchText"
                      @keyup.enter="search"
                      placeholder="Tìm kiếm"
                    />
                    <button
                      type="submit"
                      class="input-group-text bg-success text-light"
                    >
                      <i class="fa fa-fw fa-search text-white"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="row">
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  <th>ID</th>
                  <th>Tiêu đề</th>
                  <th>Nội dung</th>
                  <th>ID Youtube</th>
                  <th>Ngày tạo</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="blog in blogs" :key="blog.maBaiViet">
                  <td>{{blog.maBaiViet}}</td>
                  <td>{{blog.tieuDe}}</td>
                  <td>{{blog.noiDung.substring(0,20)+'...'}}</td>
                  <td>{{blog.duongDanYoutube.substring(30, blog.duongDanYoutube.length)}}</td>
                  <td>{{blog.ngayTao.substring(0,10)}}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm btn-rounded"
                      @click.prevent="seeBlog(blog.maBaiViet)"
                    >
                      Xem
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning btn-sm btn-rounded"
                      @click.prevent="editBlog(blog.maBaiViet)"
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <Spinner v-if="loading"/>
                    <button
                      v-else
                      type="button"
                      class="btn btn-danger btn-sm btn-rounded"
                      @click.prevent="deleteBlog(blog.maBaiViet)"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 class="text-danger p-4" v-if="this.blogs.length === 0">Không tìm thấy kết quả!</h4>
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