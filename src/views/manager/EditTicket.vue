<script>
import api from '@/api'
import Spinner from '@/components/Spinner.vue'
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      ticket: {},
      maVe: this.$route.params.maVe,
      loading: false,
    }
  },
  methods: {
    formatTimeAgo(dateString) {
      const now = new Date();
      const date = new Date(dateString);

      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        if (diffHours === 0) return "Vừa xong";
        return `${diffHours} giờ trước`;
      }

      if (diffDays === 1) return "1 ngày trước";
      return `${diffDays} ngày trước`;
    },
    async getTicket(maVe) {
      try {
        const response = await api.get(`/ve/${maVe}`)
        this.ticket = response.data
        console.log(this.ticket)
      } catch (error) {
        console.error('Error fetching ticket:', error)
      }
    },
    async editTicket() {
      this.loading = true
      try {
        const response = await api.put('/ve/', this.ticket)
        if (response.status === 200) {
          alert('Cập nhật vé thành công')
          this.$router.push({name: 'manager-ticket'})
        } else {
          alert('Cập nhật vé thất bại')
        }
      } catch (error) {
        console.error('Error updating ticket:', error)
      } 
      finally {
        this.loading = false
      }
    },
  },
  computed: {
    tongTien() {
      const tong = this.ticket.giaVe * this.ticket.soLuong
      return tong.toLocaleString('vi-VN');
    }
  },
  mounted() {
    this.getTicket(this.maVe)
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
        <li class="breadcrumb-item"><router-link :to="{name: 'manager-ticket'}">Vé thuyết minh</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa</li>
      </ol>
    </nav>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-lg-6 col-sm-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Chỉnh sửa vé {{ticket.maVe}}</h4>
              <p>Khu du lịch: <span class="text-success fw-bold">{{ticket.khuDuLich?.tenKhuDuLich}}</span></p>
              <p>Được tạo bởi nhân viên: <span class="text-success fw-bold">{{ticket.nhanVien?.tenNhanVien}}</span></p>
              <form @submit.prevent="editTicket">
                <div class="row g-3 mb-2">
                  <div class="col">
                    <label for="">Số lượng <span class="text-danger">*</span></label>
                    <input class="form-control" type="number" id="quantity" v-model="ticket.soLuong" placeholder="Số lượng" required>
                  </div>
                  <div class="col">
                    <label for="">Giá vé <span class="text-danger">*</span></label>
                    <input class="form-control" type="number" id="total" v-model="ticket.giaVe" placeholder="Giá vé" required>
                  </div>
                </div>
                <p class="mt-2">Tổng tiền: <span class="text-danger fw-bold fs-4">{{tongTien + 'đ'}}</span></p>
                <p class="mt-2">Ngày tạo: {{this.formatTimeAgo(ticket.ngayTao)}}</p>
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