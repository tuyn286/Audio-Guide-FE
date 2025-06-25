<script scoped>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import api from '@/api'
export default {
    name: 'ScannerView',
    data() {
        return {
            error: '',
            decode: '',
            facingMode: 'environment'
        }
    },
    components: {
        QrcodeStream
    },
    methods: {
    async onDetect (detectedCodes) {
        this.decode = detectedCodes[0].rawValue
        console.log('Decoded string:', detectedCodes)
        window.location.replace(this.decode)
    },
    onError(error) {
    if (error.name === 'NotAllowedError') {
      // user denied camera access permission
    } else if (error.name === 'NotFoundError') {
      // no suitable camera device installed
    } else if (error.name === 'NotSupportedError') {
      // page is not served over HTTPS (or localhost)
    } else if (error.name === 'NotReadableError') {
      // maybe camera is already in use
    } else if (error.name === 'OverconstrainedError') {
      // did you request the front camera although there is none?
    } else if (error.name === 'StreamApiNotSupportedError') {
      // browser seems to be lacking features
    }
    this.error = error.name
    const cameraMissingError = error.name === 'OverconstrainedError'
    const triedFrontCamera = this.facingMode === 'user'

    if (triedFrontCamera && cameraMissingError) {
      console.log('back camera is missing')
    }
  },
  startFrontCamera () {
    this.facingMode = this.facingMode==='user'? 'environment' : 'user'
  },
}
}   
</script>
<template>
    <main>
        <section class="bg-dark p-0 pb-2">
          <h4 class="h5 fw-bold pt-4 text-white ps-2 text-uppercase">{{$t('qr')}}</h4>
          <p class="ps-2 text-white fs-6 mb-0">{{$t('qr-des')}}</p>
            <div class="row g-0">
              <div class="col-sm-4 col-lg-4 mt-2 p-3">
                <QrcodeStream  @error="onError" @detect="onDetect" :constraints="{ facingMode }" class="p-4 qrcode-stream"></QrcodeStream>
              </div>
                <button @click="startFrontCamera" type="button" class="btn btn-outline-success mt-3 fw-bold text-white"><i class="fa-solid fa-rotate"></i></button>
            </div>
        </section>
    </main>
</template>

<style scoped>
.qrcode-stream {
  width: 100%;
  aspect-ratio: 1/1; /* giữ hình vuông */
  position: relative;
  background: #000; /* nền tối như máy quét */
  box-shadow: 0 8px 16px rgba(0, 128, 0, 0.2);
  transition: all 0.3s ease-in-out;
}
.qrcode-stream::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px dashed #28a745;
  pointer-events: none;
  animation: pulse-border 2s infinite;
}
@keyframes pulse-border {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>