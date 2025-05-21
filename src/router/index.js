import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/guest/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // guest view
    { path: '/', name: 'trang-chu', component: HomeView },
    { path: '/login', name: 'login', component: () => import('../views/guest/Login.vue'), props: true },
    { path: '/bai-viet', name: 'bai-viet', component: () => import('../views/guest/Blog.vue'), props: true },
    { path: '/khu-du-lich', name: 'khu-du-lich', component: () => import('../views/guest/Site.vue') },
    { path: '/bai-viet/:maBaiViet', name: 'bai-viet-detail', component: () => import('../views/guest/DetailBlog.vue'), props: true },
    { path: '/khu-du-lich/:maKhuDuLich', name: 'khu-du-lich-detail', component: () => import('../views/guest/DetailSite.vue'), props: true },
    { path: '/quen-mat-khau/:token?', name: 'forgot-password', component: () => import('../views/guest/ForgotPassword.vue'), props: true },

    // user view
    { path: '/scanner', name: 'scanner', component: () => import('../views/user/Scanner.vue') },
    { path: '/player/:maBanGhi', name: 'player', component: () => import('../views/user/Player.vue'), props: true },
    { path: '/feedback/:maKhuDuLich', name: 'feedback', component: () => import('../views/user/Feedback.vue') },

    // admin view
    { path: '/admin/edit-user', name: 'edit-user', component: () => import('../views/admin/EditUser.vue') },
    { path: '/register', name: 'register', component: () => import('../views/guest/Register.vue') },
    { path: '/admin', name: 'admin', component: () => import('../views/admin/Home.vue') },
    { path: '/admin/add-user', name: 'add-user', component: () => import('../views/admin/AddUser.vue') },
    { path: '/admin/ve', name: 'admin-ticket', component: () => import('../views/admin/Ticket.vue') },
    { path: '/admin/ve/chinh-sua/:maVe', name: 'admin-edit-ticket', component: () => import('../views/admin/EditTicket.vue') },
    { path: '/admin/bai-viet', name: 'admin-blog', component: () => import('../views/admin/Blog.vue') },
    { path: '/admin/bai-viet/:maBaiViet', name: 'admin-detail-blog', component: () => import('../views/admin/DetailBlog.vue') },
    { path: '/admin/bai-viet/chinh-sua/:maBaiViet', name: 'admin-edit-blog', component: () => import('../views/admin/EditBlog.vue') },
    { path: '/admin/tai-khoan', name: 'admin-user', component: () => import('../views/admin/User.vue') },
    { path: '/admin/tai-khoan/them', name: 'admin-add-user', component: () => import('../views/admin/AddUser.vue') },
    { path: '/admin/tai-khoan/chinh-sua/:maTaiKhoan', name: 'admin-edit-user', component: () => import('../views/admin/EditUser.vue') },
    { path: '/admin/ban-ghi', name: 'admin-record', component: () => import('../views/admin/Record.vue') },
    { path: '/admin/ban-ghi/chinh-sua/:maBanGhi', name: 'admin-edit-record', component: () => import('../views/admin/EditRecord.vue') },
    { path: '/admin/hinh-anh', name: 'admin-image', component: () => import('../views/admin/Image.vue') },
    { path: '/admin/hinh-anh/:maHinhAnh', name: 'admin-detail-image', component: () => import('../views/admin/DetailImage.vue') },
    { path: '/admin/hinh-anh/chinh-sua/:maHinhAnh', name: 'admin-edit-image', component: () => import('../views/admin/EditImage.vue') },
    { path: '/admin/danh-gia', name: 'admin-comment', component: () => import('../views/admin/Comment.vue') },

    // manager view
    { path: '/khu-du-lich/chinh-sua', name: 'edit-site', component: () => import('../views/manager/EditSite.vue') },
    { path: '/quan-ly', name: 'manager', component: () => import('../views/manager/Home.vue'), props: true },
    { path: '/quan-ly/ve', name: 'manager-ticket', component: () => import('../views/manager/Ticket.vue') },
    { path: '/quan-ly/ve/chinh-sua/:maVe', name: 'manager-edit-ticket', component: () => import('../views/manager/EditTicket.vue'), props: true },
    { path: '/quan-ly/ban-ghi', name: 'manager-record', component: () => import('../views/manager/Record.vue') },
    { path: '/quan-ly/ban-ghi/them', name: 'manager-add-record', component: () => import('../views/manager/AddRecord.vue') },
    { path: '/quan-ly/ban-ghi/chinh-sua/:maBanGhi', name: 'manager-edit-record', component: () => import('../views/manager/EditRecord.vue'), props: true },
    { path: '/quan-ly/hinh-anh', name: 'manager-image', component: () => import('../views/manager/Image.vue') },
    { path: '/quan-ly/hinh-anh/them', name: 'manager-add-image', component: () => import('../views/manager/AddImage.vue') },
    { path: '/quan-ly/hinh-anh/:maHinhAnh', name: 'manager-detail-image', component: () => import('../views/manager/DetailImage.vue'), props: true },
    { path: '/quan-ly/hinh-anh/chinh-sua/:maHinhAnh', name: 'manager-edit-image', component: () => import('../views/manager/EditImage.vue'), props: true },
    { path: '/quan-ly/bai-viet', name: 'manager-blog', component: () => import('../views/manager/Blog.vue') },
    { path: '/quan-ly/bai-viet/:maBaiViet', name: 'manager-detail-blog', component: () => import('../views/manager/DetailBlog.vue'), props: true },
    { path: '/quan-ly/bai-viet/them', name: 'manager-add-blog', component: () => import('../views/manager/AddBlog.vue') },
    { path: '/quan-ly/bai-viet/chinh-sua/:maBaiViet', name: 'manager-edit-blog', component: () => import('../views/manager/EditBlog.vue'), props: true },
    { path: '/quan-ly/nhan-vien', name: 'manager-staff', component: () => import('../views/manager/Staff.vue') },
    { path: '/quan-ly/nhan-vien/them', name: 'manager-add-staff', component: () => import('../views/manager/AddStaff.vue') },
    { path: '/quan-ly/danh-gia', name: 'manager-comment', component: () => import('../views/manager/Comment.vue') },


    // staff view
    { path: '/ve/them', name: 'add-ticket', component: () => import('../views/staff/AddTicket.vue') },
    { path: '/nhan-vien/chinh-sua', name: 'edit-staff', component: () => import('../views/staff/EditInfo.vue') },
    { path: '/doi-mat-khau', name: 'change-password', component: () => import('../views/staff/ChangePassword.vue') },
  ],
})

export default router
