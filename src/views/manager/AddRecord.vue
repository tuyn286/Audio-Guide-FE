<script>
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
import axios from "axios";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      banGhi: {
        tenBanGhi: "",
        moTa: "",
      },
      fileVn: null,
      fileEn: null,
      loading: false,
      loadingLang: '',
      inputVn: "", // input for AI
      inputEn: "",
      instrucVn: "", // huớng dẫn cho AI
      instrucEn: "",
      voiceVn: "coral", // kiểu giọng AI
      voiceEn: "coral",
      fileVnUrl: null, // play audio
      fileEnUrl: null,
    };
  },
  methods: {
    async addBanGhi() {
      this.loading = true;
      try {
        // Ensure both files are present before submitting
        if (!this.fileVn || !this.fileEn) {
          alert("Cần có file thuyết minh tiếng Việt và tiếng Anh (từ upload hoặc AI).");
          this.loading = false;
          return;
        }
        const formData = new FormData();
        formData.append(
          "banGhi",
          new Blob([JSON.stringify(this.banGhi)], { type: "application/json" })
        );
        formData.append("fileVn", this.fileVn);
        formData.append("fileEn", this.fileEn);
        const response = await api.post("/ban-ghi/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          alert("Thêm bản ghi thành công!");
          this.$router.push({ name: "manager-record" });
        } else {
          alert("Thêm bản ghi thất bại!");
        }
      } catch (error) {
        console.error("Error adding record:", error);
      } finally {
        this.loading = false;
      }
    },
    handleFileEn(event) {
      this.fileEn = event.target.files[0];
      console.log('fileEn prototype:', Object.getPrototypeOf(this.fileEn));
    },
    handleFileVn(event) {
      this.fileVn = event.target.files[0];
      console.log('fileVn prototype:', Object.getPrototypeOf(this.fileVn));
    },
    async fetchMp3(lang) {
      this.loadingLang = lang;
      if (!this.apiKey) {
        console.error("API key is not set.");
        return;
      }
      let input, instructions, voice, model;
      if (lang === 'vn') {
        input = this.inputVn;
        instructions = this.instrucVn;
        voice = this.voiceVn;
        model = "gpt-4o-mini-tts";
      } else {
        input = this.inputEn;
        instructions = this.instrucEn;
        voice = this.voiceEn;
        model = "gpt-4o-mini-tts";
      }
      if (!input) {
        alert("Please enter text.");
        return;
      }
      const headers = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${this.apiKey}`,
      };
      const data = {
        model,
        voice,
        input,
        instructions,
      };
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/audio/speech',
          data,
          { headers, responseType: 'blob' }
        );
        const audioBlob = response.data;
        if (lang === 'vn') {
          // trả về blob là raw data, cần phải gán file và đặt tên để match với multipart file trong backend
          this.fileVn = new File([audioBlob], "speech-vi.mp3", { type: "audio/mpeg" });
          this.fileVnUrl = URL.createObjectURL(audioBlob);
          console.log('fileVn prototype:', Object.getPrototypeOf(this.fileVn));
        } else {
          this.fileEn = new File([audioBlob], "speech-en.mp3", { type: "audio/mpeg" });
          this.fileEnUrl = URL.createObjectURL(audioBlob);
          console.log('fileEn prototype:', Object.getPrototypeOf(this.fileEn));
        }
      } catch (error) {
        console.error("Error fetching MP3:", error);
      } finally {
        this.loadingLang = '';
      }
    },
  },
};
</script>
<template>
  <main>
    <section>
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
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'manager-record' }"
                >Bản ghi thuyết minh</router-link
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">Thêm mới</li>
          </ol>
        </nav>
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-6">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Thêm mới bản ghi</h4>
                <form @submit.prevent="addBanGhi">
                  <div class="row g-3 mb-2">
                    <div class="col-12">
                      <label for=""
                        >Tên bản ghi <span class="text-danger">*</span></label
                      >
                      <input
                        class="form-control"
                        type="text"
                        v-model="banGhi.tenBanGhi"
                        placeholder="Tên bản ghi"
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label for=""
                        >Mô tả <span class="text-danger">*</span></label
                      >
                      <textarea
                        class="form-control"
                        type="text"
                        v-model="banGhi.moTa"
                        placeholder="Mô tả"
                        rows="8"
                        required
                      ></textarea>
                    </div>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="upload-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#upload"
                          type="button"
                          role="tab"
                          aria-controls="upload"
                          aria-selected="true"
                        >
                          Upload file
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="AI-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#AI"
                          type="button"
                          role="tab"
                          aria-controls="AI"
                          aria-selected="false"
                        >
                          AI thuyết minh
                        </button>
                      </li>
                    </ul>

                    <!-- Tab content -->
                    <div class="tab-content mt-3" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="upload"
                        role="tabpanel"
                        aria-labelledby="upload-tab"
                      >
                        <div class="row">
                          <div class="col-12 p-3">
                            <label for=""
                              >Tiếng Việt
                              <span v-if="!fileVn" class="text-danger">*</span>
                              <span v-else class="badge bg-success ms-2">OK</span></label
                            >
                            <input
                              class="form-control"
                              type="file"
                              @change="handleFileVn"
                              required
                            />
                          </div>
                          <div class="col-12 p-3">
                            <label for=""
                              >Tiếng Anh
                              <span v-if="!fileEn" class="text-danger">*</span>
                              <span v-else class="badge bg-success ms-2">OK</span></label
                            >
                            <input
                              class="form-control"
                              type="file"
                              @change="handleFileEn"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="AI"
                        role="tabpanel"
                        aria-labelledby="AI-tab"
                      >
                        <div class="row">
                          <div class="col-12 p-3">
                            <label for=""
                              >Tiếng Việt
                              <span v-if="!fileVn" class="text-danger">*</span>
                              <span v-else class="badge bg-success ms-2">OK</span></label
                            >
                            <textarea
                              class="form-control"
                              rows="6"
                              v-model="inputVn"
                              placeholder="Nhập nội dung thuyết minh tiếng Việt"
                            ></textarea>
                            <label for="" class="mt-3"
                              >Hướng dẫn <span class="text-muted">(tùy chọn)</span>
                            </label>
                            <input
                              class="form-control"
                              v-model="instrucVn"
                              placeholder="Nhập hướng dẫn cho AI thuyết minh"
                            />
                            <div class="row">
                              <div class="col-8">
                                <select
                                  v-model="voiceVn"
                                  class="form-select mt-3"
                                >
                                  <option value="coral">
                                    Giọng nữ trung niên dứt khoát
                                  </option>
                                  <option value="nova">
                                    Giọng nữ trẻ trung nhẹ nhàng
                                  </option>
                                  <option value="shimmer">
                                    Giọng nữ trung lập
                                  </option>
                                  <option value="alloy">
                                    Giọng nữ trung niên nhanh nhẹn
                                  </option>
                                  <option value="ash">
                                    Giọng nam trung niên ấm áp
                                  </option>
                                  <option value="ballad">
                                    Giọng nam trẻ trung nhanh nhẹn
                                  </option>
                                  <option value="fable">
                                    Giọng nam đứng tuổi chậm rãi
                                  </option>
                                </select>
                              </div>
                              <div class="col-4">
                                <Spinner v-if="loadingLang === 'vn'" class="mt-3 float-end" />
                                <button
                                  v-else
                                  class="btn btn-dark mt-3 float-end"
                                  @click.prevent="fetchMp3('vn')"
                                >
                                  Nghe thử
                                </button>
                              </div>
                              <div class="col-12 mt-3">
                                <audio
                                  v-if="fileVnUrl"
                                  :src="fileVnUrl"
                                  controls
                                  autoplay
                                ></audio>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 p-3 border-top">
                            <label for=""
                              >Tiếng Anh
                              <span v-if="!fileEn" class="text-danger">*</span>
                              <span v-else class="badge bg-success ms-2">OK</span></label
                            >
                            <textarea
                              class="form-control"
                              rows="6"
                              v-model="inputEn"
                              placeholder="Nhập nội dung thuyết minh tiếng Anh"
                            ></textarea>
                            <label for="" class="mt-3"
                              >Hướng dẫn <span class="text-muted">(tùy chọn)</span>
                            </label>
                            <input
                              class="form-control"
                              v-model="instrucEn"
                              placeholder="Nhập hướng dẫn cho AI thuyết minh"
                            />
                            <div class="row">
                              <div class="col-8">
                                <select
                                  v-model="voiceEn"
                                  class="form-select mt-3"
                                >
                                  <option value="coral">
                                    Giọng nữ trung niên dứt khoát
                                  </option>
                                  <option value="nova">
                                    Giọng nữ trẻ trung nhẹ nhàng
                                  </option>
                                  <option value="shimmer">
                                    Giọng nữ trung lập
                                  </option>
                                  <option value="alloy">
                                    Giọng nữ trung niên nhanh nhẹn
                                  </option>
                                  <option value="ash">
                                    Giọng nam trung niên ấm áp
                                  </option>
                                  <option value="ballad">
                                    Giọng nam trẻ trung nhanh nhẹn
                                  </option>
                                  <option value="fable">
                                    Giọng nam đứng tuổi chậm rãi
                                  </option>
                                </select>
                              </div>
                              <div class="col-4">
                                <Spinner v-if="loadingLang === 'en'" class="mt-3 float-end" />
                                <button
                                  v-else
                                  class="btn btn-dark mt-3 float-end"
                                  @click.prevent="fetchMp3('en')"
                                >
                                  Nghe thử
                                </button>
                              </div>
                              <div class="col-12 mt-3">
                                <audio
                                  v-if="fileEnUrl"
                                  :src="fileEnUrl"
                                  controls
                                  autoplay
                                ></audio>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Spinner v-if="loading" class="float-end" />
                  <button
                    v-else
                    class="btn btn-success float-end mt-3"
                    type="submit"
                  >
                    Thêm bản ghi
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
