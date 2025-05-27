<template>
  <div class="container">
    <Spinner v-if="loading" />
    <div
      v-else
      class="row bg-success border-radius-3 p-3 align-items-center justify-content-center"
    >
      <div class="col-lg-6 col-sm-12 border-end border-light" id="weather-info">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-3 col-6">
            <div class="fw-bold fs-3 text-white">{{$t('w_city')}}</div>
            <p class="text-white m-0">{{$t('w_country')}}</p>
            <p class="text-white m-0">{{ weather.daily.time[0] }}</p>
          </div>
          <div class="col-lg-3 col-6">
            <div class="fw-bold fs-2 text-white">
              {{ weather.hourly.temperature_2m[this.currentHour] }}°C
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-sm-12 align-items-center justify-content-center">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-3 col-6">
            <p class="text-white fs-4 m-0 mb-1">
              {{ $t(weather.hourly.weather_code[this.currentHour].toString()) }}
            </p>
            <p class="text-white fs-6 m-0">
              {{ $t("w_humidity") }}:
              {{ weather.hourly.relative_humidity_2m[this.currentHour] }}%
            </p>
            <p class="text-white fs-6">
              {{ $t("w_rain") }}: {{ weather.hourly.rain[this.currentHour] }}mm
            </p>
          </div>
          <div class="col-lg-3 col-6">
            <p class="text-white m-0">
              {{ $t("w_max") }}: {{ weather.daily.temperature_2m_max[0] }}°C
            </p>
            <p class="text-white m-0">
              {{ $t("w_min") }}: {{ weather.daily.temperature_2m_min[0] }}°C
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Spinner from "@/components/Spinner.vue";
export default {
  name: "Weather",
  components: {
    Spinner,
  },
  data() {
    return {
      weather: {},
      currentHour: 0,
      loading: false,
    };
  },
  methods: {
    async fetchWeather() {
      this.loading = true;
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: 16.0678,
              longitude: 108.2208,
              hourly: "temperature_2m,relative_humidity_2m,weather_code,rain",
              daily: "temperature_2m_max,temperature_2m_min",
              timezone: "Asia/Bangkok",
              forecast_days: 1,
            },
          }
        );
        this.weather = response.data;
        console.log("Weather data fetched successfully:", this.weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    const now = new Date();
    this.currentHour = now.getHours();
    this.fetchWeather();
  },
};
</script>
<style>
@media screen and (max-width: 768px) {
  #weather-info {
    border: none !important;
    border-bottom: 1px dashed #fff !important;
    padding-bottom: 5px !important;
  }
}
</style>