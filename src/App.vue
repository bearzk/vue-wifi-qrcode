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

        <div class="pt-6 text-center">
          <!-- <div class="flex justify-between"> -->
          <p class="text-gray-500">{{t('ssid')}}:</p>
          <p>{{ssid}}</p>
          <!-- </div> -->
          <!-- <div class="flex justify-between"> -->
          <p class="text-gray-500">{{t('password')}}:</p>
          <p>{{password}}</p>
          <!-- </div> -->
        </div>
      </div>
      <div class="w-full" v-if="!passString">
        <LanguageSwitcher :language="language"></LanguageSwitcher>
      </div>
      <p class="text-center text-sm text-gray-700 w-screen">
        <span>made with</span>
        <span class="pl-1">❤️</span>by
        <a href="https://twitter.com/bearzk" target="_blank" class="text-blue-700">@bearzk</a>
      </p>
      <p
        class="text-center text-sm text-gray-500 p-4"
      >{{ t("ssid and password are not sent anywhere, the QR code is generated in browser using javascript.") }}</p>
      <p class="m-auto">
        <a :href="githref" target="_blank">
          <img :src="shieldBadge" alt="github link" />
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
  },
  ssid: {
    "zh-CN": "网络名称"
  },
  password: {
    "zh-CN": "密码",
    "de-DE": "Passwort"
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
      ssid: null,
      password: null,
      passString: null,
      showForm: true,
      language: "en-US",
      githash: null,
      githref: "https://github.com/bearzk/vue-wifi-qrcode/",
      shieldBadge: "https://img.shields.io/badge/source-%40github-blue"
    };
  },

  async created() {
    Event.$on("pass-string-generated", payload => {
      this.passString = payload.passString;
      this.ssid = payload.ssid;
      this.password = payload.password;
      this.showForm = false;
    });

    Event.$on("language-changed", lang => {
      this.language = lang;
    });

    fetch("/hash")
      .then(response => {
        return response.text();
      })
      .then(hash => {
        this.githash = hash.replace(/\n/, "");
        this.githref = `https://github.com/bearzk/vue-wifi-qrcode/tree/${this.githash}`;
        this.shieldBadge = `https://img.shields.io/badge/${this.githash}-%40github-blue`;
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
