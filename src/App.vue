<template>
  <div class="w-full max-w-md font-sans mx-auto">
    <div class="flex flex-row flex-wrap items-start">
      <h1
        class="flex-grow font-bold text-gray-700 text-center text-xl antialiased mb-4"
      >Wifi QRCode Generator</h1>
      <div class="w-full" v-show="showForm">
        <WifiQRCodeForm></WifiQRCodeForm>
      </div>
      <div class="mx-auto mb-4 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <QrcodeVue v-if="passString" :value="passString" :size="300"></QrcodeVue>
      </div>
      <p class="text-center text-sm text-gray-700 w-screen">built by <a href="https://twitter.com/bearzk">@bearzk</a></p>
      <p
        class="text-center text-sm text-gray-500 p-4"
      >ssid and password are not sent anywhere, the QR code is generated in browser using javascript.</p>
    </div>
  </div>
</template>

<script>
import WifiQRCodeForm from "./components/WifiQRCodeForm.vue";
import QrcodeVue from "qrcode.vue";

export default {
  name: "app",

  components: {
    WifiQRCodeForm,
    QrcodeVue
  },

  data: function() {
    return {
      passString: null,
      showForm: true
    };
  },

  created() {
    Event.$on("pass_string_generated", passString => {
      this.passString = passString;
      this.showForm = false;
    });
  }
};
</script>
