<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./layouts/Header.vue";
import Footer from "./layouts/Footer.vue";
</script>

<template>
  <div class="min-vh-100">
    <Header />
    <main>
      <div class="container">
        <div class="row">
          <div class="col p-0">
            <RouterView />
          </div>
        </div>
        <button class="floating-btn" @click="$router.push('/scanner')">
          <i class="fa-solid fa-qrcode"></i>
        </button>
      </div>
    </main>
  </div>
  <Footer />
</template>

<style>
.floating-btn {
  display: none;
}

@media screen and (max-width: 768px) {
  .floating-btn {
    position: fixed;
    bottom: 150px;
    right: 10px;
    z-index: 999;
    border-radius: 100px;
    padding: 10px 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-weight: 400;
    display: block;
    background-color: #198754;
    border: none;
    color: #fff;
  }
}
</style>