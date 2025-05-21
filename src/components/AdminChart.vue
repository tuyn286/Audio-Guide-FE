<template>
  <div class="row">
    <div class="col-12"><Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="barData"
  /></div>
    <div class="col-12">
  <Line
    id="line"
    :options="chartOptions"
    :data="lineData"
  /></div>
  </div>
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js'
import api from '@/api'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, PointElement, LineElement)

export default {
  name: 'BarChart',
  components: { Bar, Line },
  data() {
    return {
      barData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true
      },
        lineData: {
            labels: [],
            datasets: []
        }
    }
  },
  methods: {
    async fetchData() {
      try {
        await api.get('/ve/bieu-do/admin')
            .then((response) => {
                this.barData = {
                    labels: response.data.map(item => item[0]),
                    datasets: [
                        {
                            label: 'Doanh thu',
                            data: response.data.map(item => item[2]),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                };
                this.lineData = {
                    labels: response.data.map(item => item[0]),
                    datasets: [
                        {
                            label: 'Số lượng khách',
                            data: response.data.map(item => item[1]),
                            backgroundColor: 'rgba(50, 100, 150, 0.6)',
                        },
                    ],
                }
            })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  },
    mounted() {
        this.fetchData()
    },
    
}
</script>