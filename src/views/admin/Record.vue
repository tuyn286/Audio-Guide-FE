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
      records: [],
      searchText: '',
    };
  },
  methods: {
    async getRecord() {
      try {
        const response = await api.get('/ban-ghi/', {params: { page: this.page }});
        this.records = response.data.content;
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    },
    search() {
      try {
        api.get('/ban-ghi/', { params: { page: this.page, text: this.searchText } })
          .then((response) => {
            this.records = response.data.content;
            this.totalPages = response.data.page.totalPages;
          });
      } catch (error) {
        console.error('Error searching records:', error);
      }
    },
    prePage(){
            this.page--;
            if(this.searchText !== ''){
                this.search();
            }
            this.getRecord();
        },
    nextPage(){
            this.page++;
            if(this.searchText !== ''){
                this.search();
            }
            this.getRecord();
        },
    editRecord(maBanGhi) {
      this.$router.push({ name: "admin-edit-record", params: { maBanGhi } });
    },
    deleteRecord(maBanGhi) {
      if (confirm("Bạn có chắc chắn muốn xóa bản ghi này không?")) {
        api.delete(`/ban-ghi/${maBanGhi}`).then(() => {
          this.getRecord();
        });
      }
    },
    seeQR(maQR) {
      window.open(maQR, '_blank');
    },
  },
  created() {
    this.getRecord();
  },
};
</script>
<template>
  <main>
    <div class="container mt-2 mb-5">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'admin'}">Quản lý</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Bản ghi thuyết minh</li>
      </ol>
    </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <AdminSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-6">
                <!-- <button class="btn btn-success" @click="redirectAddRecord">Thêm bản ghi</button> -->
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
                  <th>Mã bản ghi</th>
                  <th>Khu du lịch</th>
                  <th>Tên bản ghi</th>
                  <th>SL truy cập</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in records" :key="record.maBanGhi">
                  <td>{{record.maBanGhi}}</td>
                  <td>{{record.khuDuLich.tenKhuDuLich}}</td>
                  <td>{{record.tenBanGhi}}</td>
                  <td>{{record.soLuongTruyCap}}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm btn-rounded"
                      @click.prevent="seeQR(record.maQR.duongDan)"
                    >
                      QR
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning btn-sm btn-rounded"
                      @click.prevent="editRecord(record.maBanGhi)"
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm btn-rounded"
                      @click.prevent="deleteRecord(record.maBanGhi)"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 class="text-danger p-4" v-if="this.records.length === 0">Không tìm thấy kết quả!</h4>
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