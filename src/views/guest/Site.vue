<script>
import api from '@/api'
export default {
    name: 'SitesView',
    data() {
        return {
            sites: [],
            page: 0,
            totalPages: 0,
            searchText: '',
        };
    },
    methods: {
        async getSites() {
            try {
                const response = await api.get('/khu-du-lich/', { params: { page: this.page } });
                this.sites = response.data.content;
                this.totalPages = response.data.page.totalPages;
            } catch (error) {
                console.error('Error fetching sites:', error);
            }
        },
        search() {
            try {
                api.get('/khu-du-lich/', { params: { page: this.page, text: this.searchText } })
                .then((response) => {
                    this.sites = response.data.content;
                    this.totalPages = response.data.page.totalPages;
                    console.log(response.data);
                });
            } catch (error) {
                console.error('Error searching sites:', error);
            }
        },
        prePage(){
            this.page--;
            if(this.searchText !== ''){
                this.search();
            }
            this.getSites();
        },
        nextPage(){
            this.page++;
            if(this.searchText !== ''){
                this.search();
            }
            this.getSites();
        },
        bgHinhAnh(site) {
            return site.hinhAnhList?.filter(hinhAnh => hinhAnh.loaiAnh === 'BG')[0] || '';
        },
    },
    created() {
        this.getSites();
    },
}
</script>
<template>
<main>
    <div class="container mb-5">
        <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb" class="ps-1 pt-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{name: 'trang-chu'}">{{$t('nav-1')}}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{$t('nav-2')}}</li>
      </ol>
    </nav>
            <div class="row text-center py-3">
                <div class="col-12">
                    <h2>{{$t('site-header')}}</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-sm-12"></div>
                <div class="d-flex col-lg-4 col-sm-12 justify-content-end align-items-center mb-3">
                    <form @submit.prevent="search" class="modal-content modal-body border-0 p-0">
                    <div class="input-group mb-2">
                        <input
                        type="text"
                        class="form-control"
                        id="inputModalSearch"
                        v-model="searchText"
                        @keyup.enter="search"
                        :placeholder="$t('search-placeholder')"
                        />
                        <button type="submit" class="input-group-text bg-success text-light">
                        <i class="fa fa-fw fa-search text-white"></i>
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        <div class="row">
      <div
        class="col-12 col-md-4 p-5 mt-2"
        v-for="site in sites"
        :key="site.maKhuDuLich"
      >
        <div class="card">
          <router-link :to="/khu-du-lich/ + site.maKhuDuLich"
            ><img
              :src="bgHinhAnh(site).duongDan"
              class="img-fluid border site-img rounded"
          /></router-link>
          <div class="card-body text-center">
            <h5 class="text-center mt-3 mb-3">{{ site.tenKhuDuLich }}</h5>
            <div class="mt-3 info">
              <span class="text1 d-block" style="min-height: 40px">
                <i class="fa-solid fa-location-dot"></i>
                {{ site.diaChi }}
              </span>
              <span class="text1">
                <i class="fa-solid fa-user"></i>
                {{site.soLuongKhach}}</span>
            </div>
            <div class="cost mt-3 text-dark">
              <span>{{site.giaVe.toLocaleString('vi-VN')}}VND</span>
              <div class="star mt-3 align-items-center">
                <i
                  v-for="n in 5"
                  :key="n"
                  :class="
                    n <= site.diemDanhGia
                      ? 'fa-solid fa-star'
                      : 'fa-regular fa-star'
                  "
                ></i>
              </div>
            </div>
          </div> 
            <div class="p-3 text-center site-button text-white mt-3 cursor bg-success">
              <router-link
                :to="/khu-du-lich/ + site.maKhuDuLich"
                class="text-uppercase btn fs-6 fw-bold" 
                >{{ $t("detail-btn") }}</router-link
              >
            </div>
        </div>
      </div>
    </div>
            <!-- Page pagination -->
            <div class="row">
                <div class="row d-flex justify-content-end align-items-end mt-5">
                    <div class="col-4">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination float-end">
                                <li class="page-item" :class="{ disabled: page == 0 }">
                                    <button @click="prePage" class="page-link">{{$t('prepage')}}</button>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">{{ page +1 }}</a></li>
                                <li class="page-item" :class="{ disabled: page >= (totalPages -1 ) }">
                                    <button @click="nextPage" class="page-link">{{$t('nextpage')}}</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
    </div>
</main>
</template>
<style scoped>
.site-img {
  width: 100%;
  height: 200px;
}
.card {
  border: none;
  outline: none;
  background-color: #fff;
  border-radius: 20px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.card:hover {
    transform: translateY(-15px);
    transition: transform 0.3s ease-in-out;
}

.text1 {
    font-size: 16px;
    color: #717171;

}
.info {
    line-height: 17px;
}
.star {
    color: #fbc02d
}
.cost span{
    color: #fb3531;
    font-weight: bold;
    font-size: 20px;
}
</style>