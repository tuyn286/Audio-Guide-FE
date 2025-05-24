<script scoped>
import api from '@/api';
import {jwtDecode} from 'jwt-decode';
export default {
    name: 'Header',
    data() {
        return {
            isAuthenticated: false,
            role: '',
            language: '',
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token'); 
            localStorage.removeItem('language');
            this.isAuthenticated = false; 
            window.location.href = '/'; 
        },
        changeLanguage(lang){
            api.post('/tai-khoan/sua-ngon-ngu', null, {
                    params: { language: lang }
                })
                .then(response => {
                    this.language = lang;
                    localStorage.setItem('language', lang);
                    console.log('Language changed successfully:', response.data);
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error changing language:', error);
                });
        }
    },
    mounted() {
        const token = localStorage.getItem('access_token'); 
        if (token) {
            // sua bien auth
            this.isAuthenticated = true;
            // lay ngon ngu user
            api.get('/tai-khoan/ngon-ngu')
            .then(response => {
                this.language = response.data; 
                localStorage.setItem('language', this.language);
            })
            .catch(error => {
                console.error('Error fetching language:', error);
            });
            // lay role user
             try {
                const decodedToken = jwtDecode(token);
                this.role = decodedToken.role || 'ROLE_GUEST'; 
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }
}
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-light shadow p-2 pb-3 pt-3">
        <div class="container d-flex justify-content-between align-items-center">
            <a class="navbar-brand d-flex align-items-center gap-2 text-success fw-bold fs-5 m-0" href="#">
                <i class="fa-solid fa-headphones fs-4"></i>
                <span class="logo-text">{{$t('name')}}</span>
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-end col-12" id="templatemo_main_nav">
                <div class="">
                    <ul class="nav navbar-nav d-flex mx-lg-auto text-center">
                        <li class="nav-item p-2">
                            <a class="nav-link fw-bold" href="/">{{$t('nav-1')}}</a>
                        </li>
                        <li class="nav-item p-2 fw-bold">
                            <router-link class="nav-link" :to="{name: 'khu-du-lich'}">{{$t('nav-2')}}</router-link>
                        </li>
                        <li class="nav-item p-2 fw-bold">
                            <router-link class="nav-link" :to="{name: 'bai-viet'}">{{$t('nav-3')}}</router-link>
                        </li>
                        <li class="nav-item p-2">
                            <a href="/scanner" class="btn btn-success" id="qr-code"><i class="fas fa-qrcode"></i></a>
                        </li>
                        <li v-if="isAuthenticated" class="nav-item p-2">
                            <a v-if="language === 'VN'" @click="changeLanguage('EN')" class="btn btn-danger text-warning fw-bold">VN</a>
                            <a v-else @click="changeLanguage('VN')" class="btn btn-primary fw-bold">EN</a>
                        </li>
                        <li v-if="isAuthenticated" class="nav-item p-2">
                            <!-- STAFF -->
                            <div v-if="this.role === 'ROLE_STAFF'" class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-regular fa-user"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><router-link class="dropdown-item" :to="{name: 'edit-staff'}">Quản lý thông tin</router-link></li>
                                    <li><router-link class="dropdown-item" :to="{name: 'add-ticket'}">Tạo vé khách hàng</router-link></li>
                                    <li><router-link class="dropdown-item" :to="{name: 'change-password'}">Đổi mật khẩu</router-link></li>
                                    <li><a class="dropdown-item text-danger" @click.prevent="logout">Đăng xuất</a></li>
                                </ul>
                            </div>
                            <!-- MANAGER -->
                            <div v-if="this.role === 'ROLE_MANAGER'" class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-regular fa-user"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><router-link class="dropdown-item" :to="{name: 'edit-site'}">Chỉnh sửa thông tin</router-link></li>
                                    <li><router-link class="dropdown-item" :to="{name: 'manager'}">Quản lý</router-link></li>
                                    <li><router-link class="dropdown-item" :to="{name: 'change-password'}">Đổi mật khẩu</router-link></li>
                                    <li><a class="dropdown-item text-danger" @click.prevent="logout">Đăng xuất</a></li>
                                </ul>
                            </div>
                            <!-- ADMIN -->
                            <div v-if="this.role === 'ROLE_ADMIN'" class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-regular fa-user"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><router-link class="dropdown-item" :to="{name: 'admin'}">Quản lý</router-link></li>
                                    <li><router-link class="dropdown-item" :to="{name: 'change-password'}">Đổi mật khẩu</router-link></li>
                                    <li><a class="dropdown-item text-danger" @click.prevent="logout">Đăng xuất</a></li>
                                </ul>
                            </div>
                            <!-- USER -->
                            <div v-if="this.role === 'ROLE_USER'" class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-regular fa-user"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <!-- <li><a class="dropdown-item" href="#">Quản lý thông tin</a></li> -->
                                    <li><a class="dropdown-item text-danger" @click.prevent="logout">Đăng xuất</a></li>
                                </ul>
                            </div>
                        </li>
                        <!-- GUEST -->
                        <li v-else class="nav-item p-2">
                            <a href="/login" class="btn btn-success">Đăng nhập</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </nav>
</template>


<style scoped>
</style>