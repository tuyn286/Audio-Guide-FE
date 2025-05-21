<script>
import ManagerSideBar from "@/components/ManagerSideBar.vue";
import api from "@/api";
export default {
  components: {
    ManagerSideBar,
  },
  data() {
    return {
        maBaiViet: this.$route.params.maBaiViet,
        blog: {},
    };
  },
  methods: {
    async getBlog() {
      try {
        await api.get(`/bai-viet/${this.maBaiViet}`)
            .then((response) => {
                this.blog = response.data;
            })
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    },
  },
  mounted() {
    this.getBlog();
  },
};
</script>
<template>
  <main>
    <div class="container mt-2 mb-5">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'manager'}">Quản lý</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{name: 'manager-blog'}">Bài viết</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Xem chi tiết</li>
      </ol>
    </nav>
      <div class="row mt-3">
        <div class="col-3 border-end">
          <ManagerSideBar />
        </div>
        <div class="col-9">
          <div class="row">
            <div class="container pb-5">
              <div class="row">
                <div class="col-lg-12S">
                  <div class="card">
                    <div class="card-body">
                      <h1 class="h2">{{ blog.tieuDe }}</h1>
                      <p>{{ blog.noiDung }}</p>
                      <div class="row justify-content-center">
                        <div class="col-12">
                          <iframe
                            :src="blog.duongDanYoutube"
                            width="100%"
                            height="400px"
                          ></iframe>
                        </div>
                      </div>
                      <p class="text-muted">
                        Được đăng vào lúc: {{ blog.ngayTao }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>