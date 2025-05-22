<template>
    <div class="card mt-4 mb-4 p-3">
        <div class="card-body"> 
            <h1 class="card-title text-center text-uppercase fs-2">Chỉnh sửa thông tin</h1>
            <form @submit.prevent="handleSubmit">
                <div class="row">
                    <div class="form-group col pt-3">
                        <label for="siteName">Tên khu du lịch <span class="text-danger">*</span></label>
                        <input
                            class="form-control"
                            type="text"
                            id="siteName"
                            v-model="site.tenKhuDuLich"
                            required
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col pt-3">
                        <label for="description">Mô tả <span class="text-danger">*</span></label>
                        <textarea
                            class="form-control"
                            type="text"
                            id="description"
                            v-model="site.moTa"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col pt-3">
                        <label for="address">Địa chỉ <span class="text-danger">*</span></label>
                        <textarea
                            class="form-control"
                            id="address"
                            v-model="site.diaChi"
                        ></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col pt-3">
                        <label for="price">Giá vé <span class="text-danger">*</span></label>
                        <input
                            class="form-control"
                            id="price"
                            v-model="site.giaVe"
                            type="number"
                            min="0"
                        >
                    </div>
                </div>
                <Spinner v-if="loading" />
                <button v-else type="submit" class="btn btn-success float-end mt-3">Lưu thông tin</button>
            </form>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import Spinner from '@/components/Spinner.vue';
export default {
    name: "EditSiteView",
    components: {
        Spinner,
    },
    data() {
        return {
            site: {},
            loading: false,
        };
    },
    methods: {
        handleSubmit() {
            this.loading = true;
            try {
                api.put('/khu-du-lich/sua-thong-tin', this.site)
                    .then(response => {
                        if (response.status === 200) {
                            alert('Cập nhật thông tin thành công!');
                            this.$router.push({ name: 'khu-du-lich' });
                        } else {
                            alert('Cập nhật thông tin thất bại!');
                        }
                    })
                    .catch(error => {
                        console.error('Error updating site data:', error);
                    });
            } catch (error) {
                console.error('Error updating site data:', error);
            } 
            finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        try {
            api.get('/khu-du-lich/xem-thong-tin')
                .then(response => {
                    this.site = response.data;
                })
                .catch(error => {
                    console.error('Error fetching site data:', error);
                });
        } catch (error) {
            console.error('Error fetching site data:', error);
        }
    },
};
</script>