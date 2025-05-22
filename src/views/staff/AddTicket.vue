<template>
  <main>
    <section>
      <div class="container mt-5 mb-5">
        <div class="row d-flex justify-content-center align-items-center p-5">
          <div class="col-6">
            <div class="card p-3">
              <div class="card-body">
                <h4 class="card-title text-center fw-bold text-uppercase fs-3">
                  Tạo vé thuyết minh
                </h4>
                <p>
                  Khu du lịch:
                  <span class="fw-bold fs-5 fst-italic">{{
                    nhanVien.khuDuLich?.tenKhuDuLich
                  }}</span>
                </p>
                <p>
                  Nhân viên:
                  <span class="fst-italic fw-bold fs-5">{{
                    nhanVien?.tenNhanVien
                  }}</span>
                </p>
                <p>
                  Giá vé:
                  <span class="fst-italic fw-bold fs-5"
                    >{{
                      nhanVien.khuDuLich?.giaVe.toLocaleString("vn-VN")
                    }}VND</span
                  >
                </p>
                <form @submit.prevent="addHoaDon">
                  <div class="row g-3 mb-2">
                    <div class="col-12">
                      <label for="">Số lượng vé <span class="text-danger">*</span></label>
                      <div class="row justify-content-start align-items-center">
                        <div class="col-2">
                          <button class="btn btn-outline-success w-100 fw-bold" @click.prevent="decrease" :class="{disabled: this.soLuong === 1}">-</button>
                          </div>
                        <div class="col-2">
                          <input
                            class="form-control fs-5 text-center fw-bold text-danger"
                            type="number"
                            id="quantity"
                            v-model="soLuong"
                            placeholder="Số lượng"
                            required
                          />
                        </div>
                        <div class="col-2">
                          <button class="btn btn-outline-success w-100 fw-bold" @click.prevent="increase">+</button>
                          </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <label for="">Thành tiền (VND) <span class="text-danger">*</span></label>
                      <input
                        class="form-control fw-bold text-danger fs-4"
                        type="number"
                        id="total"
                        :value="tongTien.toLocaleString('vn-VN')"
                        placeholder="Tổng tiền"
                        readonly
                      />
                    </div>
                  </div>
                  <Spinner v-if="loading" />
                  <button v-else class="btn btn-success float-end mt-3 px-5" type="submit">
                    Tạo
                  </button>
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
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      tongTien: "",
      soLuong: 1,
      nhanVien: {},
    };
  },
  computed: {
    tongTien() {
      return this.nhanVien.khuDuLich?.giaVe * this.soLuong || 0;
    },
  },
  methods: {
    increase() {
      this.soLuong++;
    },
    decrease() {
        this.soLuong--;
    },
    async addHoaDon() {
      this.loading = true;
      try {
        const response = await api.post(
          "/ve/",
          {
            giaVe: this.nhanVien.khuDuLich?.giaVe,
            soLuong: this.soLuong,
          },
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          this.maKDL + "_" + this.soLuong + "_" + this.tongTien + ".pdf"
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getNhanVien() {
      try {
        const response = await api.get("/nhan-vien/xem-thong-tin");
        this.nhanVien = response.data;
        console.log(this.nhanVien);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getNhanVien();
  },
};
</script>