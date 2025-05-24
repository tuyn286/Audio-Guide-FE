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
      page: 0,
      totalPages: 0,
      staffs: [],
      searchText: "",
      loading: false,
    };
  },
  methods: {
    async getStaff() {
      try {
        const response = await api.get("/nhan-vien/", {
          params: { page: this.page },
        });
        this.staffs = response.data.content;
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
    search() {
      try {
        api
          .get("/nhan-vien/", {
            params: { page: this.page, text: this.searchText },
          })
          .then((response) => {
            this.staffs = response.data.content;
            this.totalPages = response.data.page.totalPages;
            console.log(response.data);
          });
      } catch (error) {
        console.error("Error searching blogs:", error);
      }
    },
    prePage() {
      this.page--;
      if (this.searchText !== "") {
        this.search();
      }
      this.getStaff();
    },
    nextPage() {
      this.page++;
      if (this.searchText !== "") {
        this.search();
      }
      this.getStaff();
    },
    deleteStaff(id) {
      if (confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
        try {
          api.delete(`/nhan-vien/${id}`).then(() => {
            this.getStaff();
          });
        } catch (error) {
          console.error("Error deleting staff:", error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  mounted() {
    this.getStaff();
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
          <li class="breadcrumb-item active" aria-current="page">
            Tài khoản nhân viên
          </li>
        </ol>
      </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <ManagerSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-6">
              <router-link
                class="btn btn-success"
                :to="{ name: 'manager-add-staff' }"
                >Thêm nhân viên</router-link
              >
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
                  <th>Tên nhân viên</th>
                  <th>SDT</th>
                  <th>Tên đăng nhập</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="staff in staffs" :key="staff.maNhanVien">
                  <td>{{ staff.maNhanVien }}</td>
                  <td>{{ staff.tenNhanVien }}</td>
                  <td>{{ staff.taiKhoan.soDienThoai }}</td>
                  <td>{{ staff.taiKhoan.tenDangNhap }}</td>
                  <td>{{ staff.taiKhoan.email }}</td>
                  <td>
                    <Spinner v-if="loading" />
                    <button
                      v-else
                      type="button"
                      class="btn btn-danger btn-sm btn-rounded"
                      @click.prevent="deleteStaff(staff.maNhanVien)"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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