<script scoped>

</script>
<template>
  <div class="container introduce-section">
    <div class="row g-0">
      <div class="col-lg-6 mb-0 p-0">
        <div class="text-align-left px-3 py-5">
          <h1 class="h1 text-light"><b>{{$t('intro-header')}}</b></h1>
          <p>
            {{$t('intro-content-1')}}
          </p>
          <p>{{$t('intro-content-2')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.introduce-section {
  position: relative;
  background-image: url('https://audioguidebucket.s3.ap-southeast-1.amazonaws.com/intro-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 50px 0;
  z-index: 1;
  color: white; /* Để chữ sáng lên */
}

.introduce-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* màu đen, độ mờ 50% */
  z-index: 0;
}

.introduce-section > * {
  position: relative;
  z-index: 1;
}
p {
  font-size: 15px;
}
</style>

