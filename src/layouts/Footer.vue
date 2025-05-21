<template>
  <footer class="bg-dark mt-5" id="tempaltemo_footer">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-6 pt-5">
          <h2 class="h2 text-success border-bottom pb-3 border-light logo">
            {{$t('name')}}
          </h2>
          <ul class="list-unstyled text-light footer-link-list">
            <li>
              <i class="fas fa-map-marker-alt fa-fw"></i>
              48 Cao Thắng, Hải Châu, Đà Nẵng
            </li>
            <li>
              <i class="fa fa-phone fa-fw"></i>
              <a class="text-decoration-none text-light" href="tel:010-020-0340"
                > 0912 430 948</a
              >
            </li>
            <li>
              <i class="fa fa-envelope fa-fw"></i>
              <a class="text-decoration-none text-light" href="mailto:info@company.com"
                > nguyenhoangtuyen286@gmail.com</a
              >
            </li>
          </ul>
        </div>

        <div class="col-md-6 pt-5">
          <h2 class="h2 text-secondary border-bottom pb-3 border-light">{{$t('other')}}</h2>
          <ul class="list-unstyled text-light footer-link-list">
            <li><a class="text-decoration-none text-light" href="#">{{$t('nav-1')}}</a></li>
            <li><a class="text-decoration-none text-light" href="#">{{$t('nav-2')}}</a></li>
            <li><a class="text-decoration-none text-light" href="#">{{$t('nav-3')}}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>