<template>
  <div class="w-full max-w-md font-sans mx-auto">
    <div class="flex flex-row flex-wrap items-start">
      <h1
        class="flex-grow font-bold text-gray-700 text-center text-xl antialiased mb-4 mt-4"
      >{{ t("Wifi QRCode Generator") }}</h1>
      <div class="w-full" v-show="showForm">
        <WifiQRCodeForm :language="language"></WifiQRCodeForm>
      </div>
      <div v-if="passString" class="mx-auto mb-4 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <QrcodeVue :value="passString" :size="300"></QrcodeVue>
      </div>
      <div class="w-full" v-if="!passString">
        <LanguageSwitcher :language="language"></LanguageSwitcher>
      </div>
      <p class="text-center text-sm text-gray-700 w-screen">
        <span>made with</span>
        <span class="px-1">❤️</span>by
        <a href="https://twitter.com/bearzk" target="_blank" class="text-blue-700">@bearzk</a>
      </p>
      <p
        class="text-center text-sm text-gray-500 p-4"
      >{{ t("ssid and password are not sent anywhere, the QR code is generated in browser using javascript.") }}</p>
      <p class="m-auto">
        <a href="https://github.com/bearzk/vue-wifi-qrcode" target="_blank">
          <img src="https://img.shields.io/badge/source-%40github-blue" alt="github link" />
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "./components/LanguageSwitcher.vue";
import WifiQRCodeForm from "./components/WifiQRCodeForm.vue";
import QrcodeVue from "qrcode.vue";

const mappings = {
  "Wifi QRCode Generator": {
    "zh-CN": "无线网络二维码生成器"
  },
  "ssid and password are not sent anywhere, the QR code is generated in browser using javascript.": {
    "zh-CN":
      "我们不会保存你的网络名称和密码，也不会把它们发到任何第三方，二维码完全是在你使用的浏览器里用代码生成，请放心使用。",
    "de-DE":
      "ssid und passwort werden nirgendwo hin gesendet, der QR code wird im browser mit javascript generiert."
  }
};

export default {
  name: "app",

  components: {
    WifiQRCodeForm,
    QrcodeVue,
    LanguageSwitcher
  },

  data: function() {
    return {
      passString: null,
      showForm: true,
      language: "en-US"
    };
  },

  created() {
    Event.$on("pass-string-generated", passString => {
      this.passString = passString;
      this.showForm = false;
    });

    Event.$on("language-changed", lang => {
      this.language = lang;
    });
  },

  methods: {
    t(key) {
      if (!mappings[key] || !mappings[key][this.language]) {
        return key;
      }

      return mappings[key][this.language];
    }
  }
};
</script>
