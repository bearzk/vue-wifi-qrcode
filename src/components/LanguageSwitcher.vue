<template>
  <div class="w-full">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4">
      <div class="md:flex md:items-center">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="language"
          >{{ t('language', this.language) }}:</label>
        </div>
        <div class="md:w-2/3 text-gray-700">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="selected"
            @change="changeLanguage"
          >
            <option value="en-US">English</option>
            <option value="zh-CN">中文</option>
            <option value="de-DE">Deutsch</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
const mappings = {
  language: {
    "en-US": "Language",
    "zh-CN": "语言",
    "de-DE": "Sprache"
  }
};
export default {
  name: "LanguageSwitcher",

  props: {
    language: {
      type: String,
      required: true,
      default: "en-US"
    }
  },

  data() {
    return {
      selected: "en-US"
    };
  },

  methods: {
    changeLanguage() {
      // Event is a vue instance on window, window.Event
      Event.$emit("language-changed", this.selected);
    },

    t(key) {
      if (!mappings[key] || !mappings[key][this.language]) {
        return key;
      }

      return mappings[key][this.language];
    }
  }
};
</script>
