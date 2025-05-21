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
      users: [],
      searchText: "",
      role: "",
    };
  },
  methods: {
    async getUser() {
      try {
        const response = await api.get("/tai-khoan/", {
          params: { page: this.page },
        });
        this.users = response.data.content;
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    search() {
      try {
        api
          .get("/tai-khoan/", {
            params: { page: this.page, searchText: this.searchText },
          })
          .then((response) => {
            this.users = response.data.content;
            this.totalPages = response.data.page.totalPages;
            console.log(response.data);
          });
      } catch (error) {
        console.error("Error searching users:", error);
      }
    },
    filter(role) {
      this.role = role;
      try {
        api
          .get("/tai-khoan/", { params: { page: this.page, role: this.role } })
          .then((response) => {
            this.users = response.data.content;
            this.totalPages = response.data.page.totalPages;
          });
      } catch (error) {
        console.error("Error filtering users:", error);
      }
    },
    prePage() {
      this.page--;
      if (this.searchText !== "") {
        this.search();
      }else if (this.role !== "") {
        this.filter(this.role);
      } else {
        this.getUser();
      }
    },
    nextPage() {
      this.page++;
      if (this.searchText !== "") {
        this.search();
      }else if (this.role !== "") {
        this.filter(this.role);
      } else {
        this.getUser();
      }
    },
    editUser(maTaiKhoan) {
      this.$router.push({ name: "admin-edit-user", params: { maTaiKhoan } });
    },
    deleteUser(maTaiKhoan) {
      if (confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
        api
          .delete(`/tai-khoan/${maTaiKhoan}`)
          .then(() => {
            alert("Xóa tài khoản thành công!");
            this.getUser();
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            alert("Xóa tài khoản thất bại!");
          });
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<template>
  <main>
    <div class="container mt-2">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'admin'}">Quản lý</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Tài khoản</li>
      </ol>
    </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <AdminSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-2">
              <router-link
                class="btn btn-success"
                :to="{ name: 'admin-add-user' }"
                >Thêm tài khoản</router-link
              >
            </div>
            <div class="col-4">
              <div class="dropdown">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 Lọc tài khoản
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click="filter('ROLE_MANAGER')">Quản lý</a></li>
                  <li><a class="dropdown-item" @click="filter('ROLE_STAFF')">Nhân viên</a></li>
                  <li>
                    <a class="dropdown-item" @click="filter('ROLE_USER')">Người dùng</a>
                  </li>
                </ul>
              </div>
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
                  <th>Tên tài khoản</th>
                  <th>SDT</th>
                  <th>Tên đăng nhập</th>
                  <th>Email</th>
                  <th>Quyền</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.maTaiKhoan">
                  <td>{{ user.maTaiKhoan }}</td>
                  <td>{{ user.tenTaiKhoan }}</td>
                  <td>{{ user.soDienThoai }}</td>
                  <td>{{ user.tenDangNhap }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.quyen }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning btn-sm btn-rounded"
                      @click.prevent="editUser(user.maTaiKhoan)"
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm btn-rounded"
                      @click.prevent="deleteUser(user.maTaiKhoan)"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 class="text-danger p-4" v-if="this.users.length === 0">Không tìm thấy kết quả!</h4>
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