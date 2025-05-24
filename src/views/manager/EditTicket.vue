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
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Chỉnh sửa vé {{ticket.maVe}}</h4>
              <form @submit.prevent="editTicket">
                <div class="row g-3 mb-2">
                  <div class="col">
                    <label for="">Số lượng</label>
                    <input class="form-control" type="number" id="quantity" v-model="ticket.soLuong" placeholder="Số lượng" required>
                  </div>
                  <div class="col">
                    <label for="">Tổng tiền</label>
                    <input class="form-control" type="number" id="total" v-model="ticket.tongTien" placeholder="Tổng tiền" required>
                  </div>
                </div>
                <select v-model="ticket.phuongThucThanhToan" class="form-select no-outline" aria-label="Phương thức thanh toán" required>
                  <option value="Chuyen khoan">Chuyển khoản</option>
                  <option value="Tien mat">Tiền mặt</option>
                  <option value="Quet the">Quẹt thẻ</option>
                </select>
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