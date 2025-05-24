<script>
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      maKhuDuLich: this.$route.params.maKhuDuLich,
      rating: 0,
      comment: "",
      name: "",
      warning: "",
      loading: false,
    };
  },
  methods: {
    setRating(value) {
      this.rating = value;
    },
    async submitFeedback() {
      if (this.containsBadWords(this.comment)) {
        this.warning = "Bình luận chứa từ ngữ không phù hợp!";
      } else {
        this.loading = true;
        try {
          const response = await api.post("/danh-gia/", {
            maKhuDuLich: this.maKhuDuLich,
            diemSo: this.rating,
            binhLuan: this.comment,
            ten: this.name,
          });
          if (response.status === 200) {
            alert("Cảm ơn bạn đã gửi đánh giá!");
            this.$router.push({ name: "trang-chu" });
          } else {
            alert("Đã có lỗi xảy ra, vui lòng thử lại sau.");
          }
        } catch (error) {
          console.error("Error submitting feedback:", error);
        } finally {
          this.loading = false;
        }
      }
    },
    containsBadWords(text) {
      const badWords = ["địt", "đéo", "lồn", "ngu", "chó", "fuck", "shit"];
      const normalized = text.toLowerCase().replace(/[^\w\sÀ-ỹ]/gi, "");
      return badWords.some((word) => normalized.includes(word));
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <h2 class="mb-4 fw-bold text-center mt-3">{{$t('feedback-head')}}</h2>
        <div class="card p-3">
          <form @submit.prevent="submitFeedback">
            <p class="text-center fs-6 fw-medium">{{$t('think')}}</p>
            <div class="mb-3 rating">
              <i
                v-for="n in 5"
                :key="n"
                :class="[
                  'fa-star',
                  rating >= n ? 'fa-solid' : 'fa-regular',
                  'fa',
                  'star',
                ]"
                @click="setRating(n)"
              ></i>
            </div>

            <div class="mb-3">
              <textarea
                class="form-control"
                id="comment"
                rows="4"
                v-model="comment"
                :placeholder="$t('think-place')"
                required
              ></textarea>
              <p v-if="warning" style="color:red">{{ warning }}</p>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label"
                >{{$t('username')}}
                <span class="text-secondary">({{$t('optional')}})</span></label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="name"
              />
            </div>
            <Spinner v-if="loading" class="mx-auto"/>
            <button type="submit" class="btn btn-success w-100" v-else>
              {{$t('send-fb')}}
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #fbc02d;
}
.rating .star {
  cursor: pointer;
}
</style>