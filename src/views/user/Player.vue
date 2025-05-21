<script scoped>
import AudioPlayer from "vue3-audio-player";
import "vue3-audio-player/dist/style.css";
import api from "@/api";
export default {
  components: {
    AudioPlayer,
  },
  data() {
    return {
      maBanGhi: this.$route.params.maBanGhi,
      record: {},
      language: localStorage.getItem("language") || "VN",
      isAuth: localStorage.getItem("access_token") ? true : false,
    };
  },
  methods: {
    async getRecord() {
      try {
        const response = await api.get(`/ban-ghi/${this.maBanGhi}`);
        this.record = response.data;
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    },
  },
  mounted() {
    this.getRecord();
  },
};
</script>
<template>
  <section class="v-100 mt-2 mb-2">
    <div class="container">
      <div class="row">
        <div class="col-lg-12" v-if="isAuth">
          <div class="player-header">
            <h6  class=" text-secondary"><span><i class="fa-solid fa-map-pin pe-2"></i></span>{{record.khuDuLich?.tenKhuDuLich}}</h6>
            <h5 class="text-center fw-bold text-dark">{{ record.tenBanGhi }}</h5>
          </div>
          <AudioPlayer
            class="audio-player"
            :option="{
              autoPlay: true,
              loop: false,
              src: language === 'VN' ? record.duongDanVN : record.duongDanEN,
              progressBarColor: '#7ab830',
              indicatorColor: '#7ab830',
            }"
          />
          <p>{{ record.moTa }}</p>
          <p class="text-muted text-start"><i class="fa-solid fa-eye pe-1"></i>{{record.soLuongTruyCap}}</p>
        <div class="col-12"  v-if="record.khuDuLich">
          <router-link class="btn btn-outline-success w-100" :to="{ name: 'feedback', params: {maKhuDuLich: record.khuDuLich?.maKhuDuLich} }">{{$t('feedback')}}</router-link>
        </div>
        </div>
        <div class="col-lg-12 mb-5 mt-5" v-else>
          <div class="player-header">
            <h6  class=" text-secondary"><span><i class="fa-solid fa-map-pin pe-2"></i></span>{{record.khuDuLich?.tenKhuDuLich}}</h6>
            <h5 class="text-center fw-bold text-dark">{{ record.tenBanGhi }}</h5>
          </div>
          <p class="text-center fs-3 text-danger fw-bold">
            Vui lòng mua vé để nghe bản thuyết minh này.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
section.v-100 {
  padding: 2rem 1rem;
  background-color: #f8f9fa; /* nhẹ nhàng, sáng sủa */
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

h1.text-center {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  text-align: justify;
}
.player-header {
  padding: 0 15px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
  text-align: center;
}

/* Mobile responsiveness */
@media (max-width: 576px) {
  h1.text-center {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  section.v-100 {
    padding: 1.5rem 0.75rem;
  }
}
</style>