<script scoped>
export default {
  name: 'FormAddUser',
};
</script>
<template>
  <section class="vh-100">
    <div class="container py-3 h-100">
      <div class="row">
        <div class="col-lg-12">
            <div class="row mb-3">
                <div class="col-3">
                    <a href="/admin/user" class="text-decoration-none btn btn-outline-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</a>
                </div>
            </div>
          <div class="card">
            <div class="card-title">
              <h3 class="p-3">CHỈNH SỬA NGƯỜI DÙNG</h3>
            </div>
            <div class="card-body">
              <div
                class="row d-flex justify-content-center align-items-center h-100"
              >
                <div class="col col-xl-10">
                  <form action="" method="">
                      <label for="name" class="form-label">Tên đăng nhập</label>
                    <div class="mb-3">
                      <input
                        type="text"
                        name=""
                        id="name"
                        class="form-control"
                        value="tuyn286"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="content1" class="form-label"
                        >Mật khẩu</label
                      >
                      <input
                        type="password"
                        name=""
                        id="content1"
                        class="form-control"
                        value="1234"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label"
                        >Email</label
                      >
                      <input
                        type="text"
                        name=""
                        id="email"
                        class="form-control"
                        value="nguyentuyen@gmail.com"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="phone" class="form-label"
                        >Số điện thoại</label
                      >
                      <input
                        type="text"
                        name=""
                        id="phone"
                        class="form-control"
                        value="0912430948"
                      />
                    </div>

                    <!-- <div class="mb-3">
                      <label for="uploadImage" class="form-label"
                        >Tải ảnh lên</label
                      >
                      <input
                        class="form-control"
                        type="file"
                        id="uploadImage"
                        accept="image/*"
                      />
                    </div> -->

                    <div class="mb-3">
                      <label for="tenNhanVien" class="form-label"
                        >Tên nhân viên</label
                      >
                      <input
                        type="text"
                        name=""
                        id="tenNhanVien"
                        class="form-control"
                        value="Nguyễn Hoàng Tuyên"
                      />
                    </div> 

                    <button
                      type="submit"
                      style="float: right"
                      class="btn btn-dark"
                    >
                      Chỉnh sửa
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>