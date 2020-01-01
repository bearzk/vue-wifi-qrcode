<template>
  <div class="w-full">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="ssid"
          >ssid:</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            name="ssid"
            v-model="ssid"
            placeholder="ssid"
          />
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="password"
          >password:</label>
        </div>

        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            name="password"
            v-model="password"
            placeholder="password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-screen"
          type="submit"
          @click.prevent="generate"
          :disabled="noSsid || noPassword"
        >generate</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "WifiQRCodeForm",

  data() {
    return {
      ssid: null,
      password: null,
      generated: null
    };
  },

  computed: {
    noSsid: function() {
      return this.ssid === null || this.ssid === "";
    },

    noPassword: function() {
      return this.password === null || this.password === "";
    }
  },

  methods: {
    generate() {
      if (!this.noSsid || !this.noPassword) {
        this.generated = `WIFI:T:WPA;S:${this.ssid};P:${this.password};;`;
        // Event is a vue instance on window, window.Event
        Event.$emit("pass_string_generated", this.generated);
      }
    }
  }
};
</script>
